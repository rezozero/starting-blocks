var gulp = require('gulp');
var uglify = require('gulp-uglify');
var requirejsOptimize = require('gulp-requirejs-optimize');

gulp.task('requirejs', ['babel'], function() {
    return gulp.src('./bootstrap.js')
    .pipe(requirejsOptimize({
        out: 'app.min.js',
        optimize: "none",
        skipDirOptimize: "true",
        baseUrl: "./dist",
        name: "./../bootstrap",
        paths: {
            jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
            waitForImages: './../bower_components/waitForImages/dist/jquery.waitforimages.min',
            TweenLite: "./../bower_components/gsap/src/minified/TweenMax.min",
            // Add here additionnal lib
            // this array must be the same as your bootstrap.js one.
        }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});
