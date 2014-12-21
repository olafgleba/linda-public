var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    jshint = require('gulp-jshint'),
    opn = require('opn');


/**
 * Define some variables to facilitate the config
 *
 * Edit path to fit installation
 */
var server = {
  host: '127.0.0.1',
  path: '/devel/devel-environments/linda/app/'
}


/**
 * Development
 */

gulp.task('lint', function() {
  return gulp.src('source/libs/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});


// currently libsass only supports `nested` and `compressed`
gulp.task('sass-devel', function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({ outputStyle: 'nested' }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/site/templates/assets/css'))
    .pipe(livereload());
});

gulp.task('js-base-devel', function() {
  return gulp.src('source/libs/base.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/site/templates/assets/libs'))
    .pipe(livereload());
});

gulp.task('js-plugins-devel', function() {
  return gulp.src('source/libs/vendor/**/*.js')
    .pipe(concat('plugins.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/site/templates/assets/libs/vendor'))
    .pipe(livereload());
});



/**
 * Production
 */

gulp.task('sass-deploy', function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/site/templates/assets/css'))
});



gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.path, 'Google Chrome' );
});



// Watch any changes in sass files, reload browser.
// livereload browser extension must be installed/enabled
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('source/sass/**/*.scss', ['sass-devel']).on('change', livereload.changed);
  gulp.watch('source/libs/**/*.js', ['lint', 'js-base-devel', 'js-plugins-devel']).on('change', livereload.changed);
  gulp.watch('app/site/templates/**/*.php').on('change', livereload.changed);
});



// Development
gulp.task('default', ['sass-devel', 'lint', 'js-base-devel', 'js-plugins-devel', 'watch', 'openbrowser']);

// Procuction
gulp.task('deploy', ['sass-deploy']);


