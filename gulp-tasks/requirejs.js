var gulp = require('gulp');
var uglify = require('gulp-uglify');
var requirejsOptimize = require('gulp-requirejs-optimize');

gulp.task('requirejs', ['babel'], function() {
    return gulp.src('./bootstrap.js')
    .pipe(requirejsOptimize({
        out: 'app.min.js',
        baseUrl: "./dist",
        name: "./../bootstrap",
        paths: {
            jquery: 'empty:',
            TweenMax: "empty:",
            Lazyload: './../bower_components/vanilla-lazyload/dist/lazyload',
            waitForImages: './../bower_components/waitForImages/dist/jquery.waitforimages.min',
            loglevel: "./../bower_components/loglevel/dist/loglevel.min",
            // Add here additionnal lib
            // this array must be the same as your bootstrap.js one.
        }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});
