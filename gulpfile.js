var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var minifyHTML = require('gulp-minify-html');
var sass = require('gulp-sass');

var paths = {
  js: 'assets/js/**/*',
  images: 'assets/img/**/*',
  styles: 'assets/scss/main.scss',
  files: 'assets/files/**/*',
  html: 'assets/html/**/*',
  build: 'public'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del([paths.build]);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build+'/assets/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('public/assets/img'));
});

// Copy all root site files
gulp.task('files', ['clean'], function() {
  return gulp.src(paths.files)
    .pipe(gulp.dest(paths.build));
});

// Copy all root site files
gulp.task('html', ['clean'], function() {
  return gulp.src(paths.html)
    .pipe(minifyHTML({
      empty: true,
      quotes: true
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest(paths.build + "/assets/css/"));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images', 'styles', 'files', 'html']);
