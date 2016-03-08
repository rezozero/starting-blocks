var gulp = require('gulp');
var rjs = require('gulp-requirejs');

gulp.task('requirejs', ['babel'], function() {
    rjs({
        out: 'app.min.js',
        optimize: "uglify",
        baseUrl: "./dist",
        name: "../bootstrap",
        paths: {
            jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
            waitForImages: '../bower_components/waitForImages/dist/jquery.waitforimages.min',
            TweenLite: "../bower_components/gsap/src/minified/TweenMax.min",
            // Add here additionnal lib
            // this array must be the same as your bootstrap.js one.
        }
    })
    .pipe(gulp.dest('./build/')); // pipe it to the output DIR
});
