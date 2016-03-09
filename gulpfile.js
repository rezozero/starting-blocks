var gulp = require('gulp');
var requireDir = require('require-dir');

/*
 * Global array for declaring
 * source JS files.
 */
paths = {
    'scripts': [
        'src/**/*.js',
    ],
    'transScripts': [
        'dist/**/*.js',
    ],
    'styles': [
        'css/**/*.sass',
        //'css/**/*.less',
    ]
};

requireDir('./gulp-tasks');
gulp.task('default', ['requirejs']);

/*
 * Watch tasks
 */
gulp.task('watch-js', function (cb) {
    return gulp.watch(paths.scripts, ['babel']);
});
gulp.task('watch', ['watch-js']);

