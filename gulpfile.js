const gulp = require('gulp');
const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const sass = require('gulp-sass');
const miniCss = require('gulp-csso');
const syncBrowser = require('browser-sync').create();

gulp.task('copyhtml', function() {
    return gulp.src('./*.html')
    .pipe(gulp.dest('dist'))
});

function imgMinify() {
    return gulp.src('./media/*')
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('./minified'));
}

function compileSass() {
    return src('styles/**/*.scss')
        .pipe(sass())
        .pipe(miniCss())
        .pipe(dest('styles'))
        .pipe(syncBrowser.stream())
}

function watch() {

    syncBrowser.init({
        server: {
            basedir: './',
        }
    });

    gulp.watch('./media/**', imgMinify);
    gulp.watch('./styles/**/*.scss', compileSass);
    gulp.watch('./*.*').on('change', syncBrowser.reload);
}

exports.copyhtml;

exports.watch = watch;