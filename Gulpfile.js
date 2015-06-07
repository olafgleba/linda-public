/**
 * Require plugins and assign them to variables
 */

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var order = require('gulp-order');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var scsslint = require('gulp-scss-lint');
var svgstore = require('gulp-svgstore');
var connect = require('gulp-connect-php');
var csso = require('gulp-csso');
var postcss = require('gulp-postcss');
var modernizr = require('gulp-modernizr');
var autoprefixer = require('autoprefixer-core');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var order = require('gulp-order');
var bs = require('browser-sync').create();
var opn = require('opn');
var mainBowerFiles = require('main-bower-files');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var del = require('del');




/**
 * Some state variables
 *
 * Used in task conditions to avoid the
 * redundancy to write (nearly) identical tasks
 * for dev build and production build. Because
 * of this condition we only have one build task
 * (s. comments for task `build` also).
 */

var isDeployment = false;

if(gutil.env.production === true) {
  isDeployment = true;
}




/**
 * Paths
 */

var app = 'app/site/templates/';
var src = 'source/';

var paths = {
  app: {
    root: 'app/',
    local: 'localhost/devel-environments/linda/app/',
    assets: app + 'assets/',
    css: app + 'assets/css/',
    libs: app + 'assets/libs/',
    img: app + 'assets/img/'
  },
  src: {
    sass: src + 'sass/',
    libs: src + 'libs/',
    img: src + 'img/'
  }
}




/**
 * Connect to localhost to serve php files
 * and start syncing
 *
 * 1. Adapt path to fit the environment
 */

gulp.task('connect-sync', function() {
  connect.server({
    base: paths.app.root,
    port: 8080
    }, function (){
    bs.init({
      proxy: paths.app.local // [1]
    });
  });
});




/**
 * Clean assets folder
 */

gulp.task('clean:assets', function(ca) {
    return del(paths.app.assets + '/{css,libs,img,fonts,docs}/**/*', ca)
});




/**
 * Lint base javascript file
 *
 * Uses `./.eslintrc` file for configuration rules and such.
 */

gulp.task('lint:js', function() {
  return gulp.src(paths.src.libs + 'base.js')
    .pipe(eslint())
    .pipe(eslint.format());
});




/**
 * Lint source sass files
 */

gulp.task('lint:scss', function() {
  return gulp.src([paths.src.sass + '**/*.scss', '!' + paths.src.sass + 'vendor/*'])
    .pipe(scsslint({
        config: './scss-lint.yml'
    }))
    .pipe(scsslint.failReporter('E'));
});




/**
 * Compile sass files, process prefixing, generate sourcemaps
 * and minify it (depending on task state (dev/production)).
 * Shove it to destination folder at least.
 *
 * 1. Condition wether to execute a plugin or passthru
 */

gulp.task('compile:sass', function() {
  return gulp.src(paths.src.sass + '**/*.scss')
    .pipe(isDeployment ? gutil.noop() : sourcemaps.init()) // [1]
    .pipe(sass({outputStyle: 'expanded' }))
    .pipe(rename({suffix: '.min'}))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(isDeployment ? gutil.noop() : sourcemaps.write('./')) // [1]
    .pipe(isDeployment ? csso() : gutil.noop()) // [1]
    .pipe(gulp.dest(paths.app.css))
    .pipe(isDeployment ? gutil.noop() : bs.stream({match: '**/*.css'}));
});




/**
 * Process images which are used within the SASS
 * source, e.g. background images, logos etc.
 */

gulp.task('process:images', function() {
  return gulp.src([paths.src.img + '*.{svg,png,jpg}'])
    .pipe(imagemin({
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
 *    role="img"
 *    title="Facebook">
 *    <use xlink:href="path/to/icon-sprite.svg#facebook" />
 *  </svg>
 *
 * See http://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/
 */

gulp.task('process:icons', function() {
  return gulp.src(paths.src.img + 'icon-sprite/*.svg')
    .pipe(imagemin({
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore())
    .pipe(gulp.dest(paths.app.img));
});




/**
 * Spawn over all `scss` and `js` files and build a custom modernizr
 * build. Shove it to source vendor folder, so it can be concatenated
 * in `plugins.min.js` afterwards, e.g. we don't want to reference
 * it as a seperate file. So this task has to run before any compilation
 * or concatenation, e.g. outside the runSquenze.
 *
 * 1. Set classes on html tag
 */

gulp.task('process:modernizr', function() {
  return gulp.src(paths.src + '**/*.{js,scss}')
    .pipe(modernizr('modernizr-custom.js', {
        "options": [
          "setClasses"
        ]
    }))
    .pipe(gulp.dest(paths.src.libs + 'vendor'))
});





/**
 * Minify our base javascript file (depending on task state (dev/production))
 * and shove it to destination folder.
 *
 * 1. Condition wether to execute a plugin or passthru
 */

gulp.task('process:base', function() {
  return gulp.src(paths.src.libs + 'base.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(isDeployment ? uglify() : gutil.noop()) // [1]
    .pipe(gulp.dest(paths.app.libs));
});




/**
 * Get a dedicated set of vendor javascript plugins which
 * are available in `bower_components`, get all loose files
 * which might be exist in the source vendor folder and
 * merge both paths. Then define what order we like them to have
 * in our plugin file. Finally concatenate the merged files
 * to a new file, minify it (depending on task state (dev/production))
 * and shove it to destination folder.
 *
 * 1. Source code order within the plugin file
 * 2. Condition wether to execute minification or pipe passthru
 */

gulp.task('concat:plugins', function() {
  return merge(
    gulp.src(mainBowerFiles(), { base: 'bower_components'})
      .pipe(filter(['**/*.js', '!**/{jquery.min,lazysizes,respimage}.{js,map}']))
    ,
    gulp.src(paths.src.libs + 'vendor/*.js')
    )
    .pipe(order([ // [1]
      '**/modernizr-custom.js',
      '**/fastclick.js',
      '*'
    ]))
    .pipe(concat('plugins.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(isDeployment ? uglify() : gutil.noop()) // [2]
    .pipe(gulp.dest(paths.app.libs + 'vendor/'));
});




/**
 * Get a dedicated set of vendor javascript plugins (respimages) which
 * are available in `bower_components`, concatenate
 * them to a new file, minify it and shove it to destination
 * folder.
 *
 * 1. Condition wether to execute a plugin or pipe passthru
 */

gulp.task('concat:plugins-respimages', function() {
  return gulp.src(mainBowerFiles({filter: '**/{lazysizes,respimage}.js'}), { base: 'bower_components'})
    .pipe(concat('plugins.images.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
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
      'lint:scss',
      'compile:sass'
    ]
  );


  gulp.watch(paths.src.libs + 'base.js',
    [
      'lint:js',
      'process:base'
    ]
  ).on('change', bs.reload);


  // gulp.watch('source/libs/**/*.js',
  //   [
  //     'lint:js',
  //     'process:base',
  //     'concat:plugins',
  //     'concat:plugins-respimages'
  //   ]
  // ).on('change', bs.reload);


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


  gulp.watch(paths.app + '**/*.php').on('change', bs.reload);
});




/**
 * Build the environment
 *
 * Because we are able to use `env` condition
 * (more info at the top of the Gulpfile) we
 * only have one build task both for development and
 * production. The development fork starts a server,
 * sync files and watch for changes while the production
 * fork mainly minifies several files and data.
 *
 * // Start developing
 * `$ gulp build`
 *
 * // Build production package
 * `$ gulp build --production`
 */

gulp.task('build', function() {

  if (isDeployment) {

    runSequence('clean:assets', 'process:modernizr',
      [
        'compile:sass',
        'copy:jquery',
        'process:base',
        'concat:plugins',
        'concat:plugins-respimages',
        'process:images',
        'process:icons'
      ]
    );

  } else {

    runSequence('clean:assets', 'process:modernizr',
      [
        'lint:scss',
        'compile:sass',
        'copy:jquery',
        'lint:js',
        'process:base',
        'concat:plugins',
        'concat:plugins-respimages',
        'process:images',
        'process:icons',
        'watch'
      ],
      'connect-sync'
    );

  }

});
