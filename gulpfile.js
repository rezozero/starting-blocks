var gulp = require('gulp');
var requireDir = require('require-dir');

/*
 * Global array for declaring
 * source JS files.
 */
appJsFiles = [
    'bootstrap.js',
    'src/**/*.js',
];

requireDir('./gulp-tasks');

gulp.task('default', ['requirejs']);

/*
 * Watch tasks
 */
gulp.task('watch', function (cb) {
    return gulp.watch(appJsFiles, ['babel']);
});

