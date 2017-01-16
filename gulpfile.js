var gulp = require('gulp');
var requireDir = require('require-dir');

/*
 * Global array for declaring
 * source JS files.
 */
paths = {
    'entry' : 'src/main.js',
    'distScripts' : 'build',
    'scripts': [
        'src/**/*.js',
        'src/**/*.jsx'
    ],
    'toInject' : [
        'build/*.js',
    ],
    'html' : [
        'index.html',
        'page1.html'
    ]
};

requireDir('./gulp-tasks');
gulp.task('default', ['inject-js']);

/*
 * Watch tasks
 */
gulp.task('watch-js', function (cb) {
    return gulp.watch(paths.scripts, ['inject-js']);
});

gulp.task('watch', ['watch-js']);
