/**
 * Require plugins and assign them to variables
 */

var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();

/**
 * Load non `gulp-*` prefixed plugins
 */

// Uncomment for debugging
//require('time-require');

var bs             = require('browser-sync').create();
var opn            = require('opn');
var mainBowerFiles = require('main-bower-files');
var merge          = require('merge-stream');
var runSequence    = require('run-sequence');
var del            = require('del');
var pngquant       = require('imagemin-pngquant');

// We need to require this explicitely, because we must
// init a new class instance with this variable
var cacheBuster    = require('gulp-cachebust');

//  Init cachebust
var cachebust = new cacheBuster();




/**
 * Prepare gulp-plumber option
 * s. http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/
 */
var onError = function(err) {
  console.log(err);
  this.emit('end');
}




/**
 * Some state variables
 *
 * Used in task conditions to avoid the
 * redundancy to write (nearly) identical tasks
 * for dev build and production build. Because
 * of this condition we only have one build task
 * (s. comments for task `build` also).
 */

var isProduction = false;

if(plugins.util.env.production === true) {
  isProduction = true;
}




/**
 * Base vars and paths
 *
 * 1. Adapt path to fit the environment
 */

var app     = 'app/site/templates/';
var source  = 'source/';
var portPHP = '8010';
var portBS  = '9000';

var paths = {
  app: {
    local:  'localhost/devel-environments/linda/app/', /* 1 */
    root:   app,
    assets: app + 'assets/',
    css:    app + 'assets/css/',
    libs:   app + 'assets/libs/',
    img:    app + 'assets/img/'
  },
  src: {
    root: source,
    sass: source + 'sass/',
    libs: source + 'libs/',
    img:  source + 'img/',
    tpls: source + 'templates/'
  }
}




/**
 * Connect to localhost to serve php files
 * and start syncing
 */

 gulp.task('connect-php', function() {
   plugins.connectPhp.server({
     base: paths.app.root,
     keepalive: true
   });
 });


 gulp.task('browser-sync', ['connect-php'], function() {
   bs.init({
     proxy: paths.app.local,
     port: portBS,
     open: true,
     notify: false,
     ui: {
       port: portBS
     }
   });
 });



/**
 * Clean assets folder
 */

gulp.task('clean:app', function(ca) {
    return del([paths.app.assets + '/{css,libs,img,fonts,docs}/**/*', paths.app.root + 'markup/*.php'], ca)
});




/**
 * Lint base javascript file
 *
 * Uses `./.eslintrc` file for configuration rules and such.
 */

gulp.task('lint:js', function() {
  return gulp.src(paths.src.libs + 'base.js')
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});




/**
 * Lint source sass files
 */

gulp.task('lint:scss', function() {
  return gulp.src([paths.src.sass + '**/*.scss', '!' + paths.src.sass + 'vendor/*'])
    .pipe(plugins.scssLint({
        config: './scss-lint.yml'
    }))
    .pipe(plugins.scssLint.failReporter('E'));
});




/**
 * Compile sass files, process prefixing, generate sourcemaps,
 * bust cache and minify it (depending on task state (dev/production))
 * and shove it to destination folder at least.
 *
 * 1. Condition wether to execute a plugin or passthru
 */

gulp.task('compile:sass', ['process:modernizr'], function() {
  return gulp.src(paths.src.sass + '**/*.scss')
    .pipe(plugins.plumber({errorHandler: onError}))
    .pipe(isProduction ? plugins.util.noop() : plugins.sourcemaps.init()) /* 1 */
    .pipe(plugins.sass({outputStyle: 'expanded' }))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(isProduction ? cachebust.resources() : plugins.util.noop())
    .pipe(isProduction ? plugins.util.noop() : plugins.sourcemaps.write('./')) /* 1 */
    .pipe(isProduction ? plugins.csso() : plugins.util.noop()) /* 1 */
    .pipe(gulp.dest(paths.app.css))
    .pipe(isProduction ? plugins.util.noop() : bs.stream({match: '**/*.css'}));
});





/**
 * Compile sass files, process prefixing, minify it and shove it to
 * destination folder at least.
 *
 * This extra styles file is meant ONLY to be used for the CKEditor in PW.
 * This avoids the neseccity to change the path for the editor file every
 * time the css has got a new cache busted name.
 */

gulp.task('compile:sass-editor', ['process:modernizr'], function() {
  return gulp.src(paths.src.sass + '**/*.scss')
    .pipe(plugins.sass({outputStyle: 'expanded' }))
    .pipe(plugins.rename({suffix: '.min.editor'}))
    .pipe(plugins.autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(plugins.csso())
    .pipe(gulp.dest(paths.app.css));
});





/**
 * Get the templates source files, bust cache (depending on task
 * state (dev/production)) and shove it to the destination folder.
 * Bust cache means, that the implied references to files we like to
 * cache (e.g. css/js) will get updated (if those target files were modified)
 * within the template files.
 *
 * NOTE: NEVER modify `*.php` files within the first layer of the `app/markup`
 * folder (e.g. `index.php`, `framework.php`). Instead solely edit the source
 * files (e.g. `source/templates/index.tpl`, `source/templates/framwork.tpl`).
 *
 * 1. Condition wether to execute a plugin or pipe passthru
 */

gulp.task('process:templates', function() {
  return gulp.src(paths.src.tpls + '**/*.tpl')
    .pipe(isProduction ? cachebust.references() : plugins.util.noop()) /* 1 */
    .pipe(plugins.rename({extname: '.php'}))
    .pipe(gulp.dest(paths.app.root + 'markup/'));
});




/**
 * Process images which are used within the SASS
 * source, e.g. background images, logos etc.
 */

gulp.task('process:images', function() {
  return gulp.src([paths.src.img + '*.{svg,png,jpg}'])
    .pipe(plugins.newer(paths.app.img))
    .pipe(plugins.imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.app.img));
});




/**
 * Collect icon svg's and build a sprite file. This allows to
 * referencing a external sprite file (good for caching) and
 * use single icons inline within the markup by referencing
 * them with fragment identifiers (e.g. path/to/sprite.svg#facebook)
 * to its ID.
 *
 * Markup example:
 *
 *  <svg class="icon"
 *    aria-labelledby="<title> <desc>"
 *    role="img">
 *    <title id="<title>">Facebook</title>
 *    <desc id="<desc>">Description</desc>
 *    <use xlink:href="path/to/icon-sprite.svg#facebook" />
 *  </svg>
 *
 * See http://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/
 * See http://www.sitepoint.com/tips-accessible-svg/
 */

gulp.task('process:icons', function() {
  return gulp.src(paths.src.img + 'icon-sprite/*.svg')
    .pipe(plugins.newer(paths.app.img))
    .pipe(plugins.imagemin({
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(plugins.rename({prefix: 'icon-'}))
    .pipe(plugins.svgstore())
    .pipe(gulp.dest(paths.app.img));
});




/**
 * Spawn over all `scss` and `js` files for relevant attributes, bust
 * cache (depending on task state (dev/production)) and build a custom
 * modernizr build. Shove it to app libs vendor folder as we need this
 * within the <head> of the page.
 *
 * 1. Condition wether to execute a plugin or passthru
 */

gulp.task('process:modernizr', function() {
  return gulp.src(paths.src.root + '**/*.{js,scss}')
    .pipe(plugins.modernizr('modernizr-custom.min.js', {
        "options": [
          "setClasses" /* 1 */
        ]
    }))
    .pipe(isProduction ? plugins.uglify() : plugins.util.noop()) /* 1 */
    .pipe(isProduction ? cachebust.resources() : plugins.util.noop())
    .pipe(gulp.dest(paths.app.libs + 'vendor/'))
});





/**
 * Bust cache, minify our base javascript file (depending on task
 * state (dev/production)) and shove it to the destination folder.
 *
 * 1. Condition wether to execute a plugin or passthru
 */

gulp.task('process:base', function() {
  return gulp.src(paths.src.libs + 'base.js')
    .pipe(plugins.plumber({errorHandler: onError}))
    .pipe(plugins.newer(paths.app.libs))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(isProduction ? cachebust.resources() : plugins.util.noop())
    .pipe(isProduction ? plugins.uglify() : plugins.util.noop()) /* 1 */
    .pipe(gulp.dest(paths.app.libs));
});




/**
 * Get a dedicated set of vendor javascript plugins which
 * are available in `bower_components`, get all loose files
 * which might be exist in the source vendor folder and
 * merge both paths. Then define what order we like them to have
 * in our plugin file. Finally concatenate the merged files
 * to a new file, bust cache, minify it (depending on task state
 * (dev/production)) and shove it to the destination folder.
 *
 * 1. Source code order within the plugin file
 * 2. Condition wether to execute minification or pipe passthru
 */

gulp.task('concat:plugins', function() {
  return merge(
    gulp.src(mainBowerFiles(), { base: 'bower_components'})
      .pipe(plugins.filter(['**/*.js', '!**/{jquery.min,lazysizes,respimage}.{js,map}']))
    ,
    gulp.src(paths.src.libs + 'vendor/*.js')
    )
    .pipe(plugins.order([ /* 1 */
      '**/fastclick.js',
      '**/jquery.ba-throttle-debounce.js',
      '*'
    ]))
    .pipe(plugins.newer(paths.app.libs + 'vendor/plugins.min.js'))
    .pipe(plugins.concat('plugins.min.js'))
    .pipe(isProduction ? cachebust.resources() : plugins.util.noop())
    .pipe(isProduction ? plugins.uglify() : plugins.util.noop()) /* 2 */
    .pipe(gulp.dest(paths.app.libs + 'vendor/'));
});




/**
 * Get a dedicated set of vendor javascript plugins (respimages) which
 * are available in `bower_components`, concatenate them to a new file,
 * bust cache, minify it (depending on task state (dev/production))
 * and shove it to the destination folder.
 *
 * 1. Condition wether to execute a plugin or pipe passthru
 */

gulp.task('concat:plugins-respimages', function() {
  return gulp.src(mainBowerFiles({filter: '**/{lazysizes,respimage}.js'}), { base: 'bower_components'})
    .pipe(plugins.newer(paths.app.libs + 'vendor/plugins.images.min.js'))
    .pipe(plugins.concat('plugins.images.min.js'))
    .pipe(isProduction ? cachebust.resources() : plugins.util.noop())
    .pipe(isProduction ? plugins.uglify() : plugins.util.noop()) /* 1 */
    .pipe(gulp.dest(paths.app.libs + 'vendor/'));
});




/**
 * Get minified jquery (with map) and shove it to destination folder.
 */

gulp.task('copy:jquery', function() {
    return gulp.src(mainBowerFiles({ filter: '**/jquery.min.{js,map}'}), { base: 'bower_components/jquery/dist'})
        .pipe(gulp.dest(paths.app.libs + 'vendor/'));
});




/**
 * Watch several files and folder for changes.
 *
 * While scss/css is supposed to be injected without
 * reloading, we want to reload the page(s) whenever
 * there are changes in other files (e.g. javascript,
 * images etc.).
 */

gulp.task('watch', function() {

  gulp.watch(paths.src.sass + '**/*.scss',
    [
      //'lint:scss',
      'compile:sass'
    ]
  );


  gulp.watch(paths.src.libs + 'base.js',
    [
      'lint:js',
      'process:modernizr',
      'process:base',
      'concat:plugins'
    ]
  ).on('change', bs.reload);


  gulp.watch(paths.src.img + '*',
    [
      'process:images'
    ]
  ).on('change', bs.reload);


  gulp.watch(paths.src.img + 'icon-sprite/*',
    [
      'process:icons'
    ]
  ).on('change', bs.reload);


  gulp.watch(paths.src.tpls + '**/*.tpl',
    [
      'process:templates'
    ]
  ).on('change', bs.reload);


  gulp.watch([paths.app.root + '**/*.php']).on('change', bs.reload);

});




/**
 * Build the environment
 *
 * Because we are able to use `env` condition
 * (more info at the top of the Gulpfile) we
 * only have one build task both for development and
 * production. The development fork starts a server,
 * sync files and watch for changes while the production
 * fork mainly minifies several files and compiles the templates.
 *
 * // Start developing
 * `$ gulp build`
 *
 * // Build production package
 * `$ gulp build --production`
 */

gulp.task('build', function() {

  if (isProduction) {

    runSequence('clean:app', 'process:modernizr',
      [
        'compile:sass',
        'compile:sass-editor',
        'copy:jquery',
        'process:base',
        'concat:plugins',
        'concat:plugins-respimages',
        'process:images',
        'process:icons'
      ],
      'process:templates'
    );

  } else {

    runSequence('clean:app', 'process:modernizr', 'process:templates',
      [
        //'lint:scss',
        'lint:js',
        'compile:sass',
        'copy:jquery',
        'process:base',
        'concat:plugins',
        'concat:plugins-respimages',
        'process:images',
        'process:icons',
        'watch'
      ],
      'browser-sync'
    );

  }

});
