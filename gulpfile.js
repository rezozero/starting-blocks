var gulp = require('gulp');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var rjs = require('gulp-requirejs');

var appJsFiles = [
    'bootstrap.js',
    'src/**/*.js',
];

gulp.task('default', ['requirejs']);

gulp.task('babel', ['lint'], function() {
    return gulp.src(appJsFiles)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-es2015-modules-amd'],
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
    return gulp.src(appJsFiles)
        .pipe(jshint({
            'esversion': 6,
            '-W008': true // decimal point
        }))
        .pipe(jshint.reporter('default', { verbose: true }));
});

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
        }
    })
    .pipe(gulp.dest('./build/')); // pipe it to the output DIR
});

/*
 * Watch tasks
 */
gulp.task('watch', function (cb) {
    return gulp.watch(appJsFiles, ['babel']);
});


