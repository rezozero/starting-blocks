var gulp = require('gulp')
var requireDir = require('require-dir')

/*
 * Global array for declaring
 * source JS files.
 */
paths = {
    'entry': 'src/demo/main.js',
    'bundleEntry': 'src/bundle.js',
    'bundleOut': './',
    'distScripts': 'build',
    'scripts': [
        'src/**/*.js',
        'src/**/*.jsx'
    ],
    'toInject': [
        'build/*.js'
    ],
    'html': [
        'examples/index.html',
        'examples/page1.html'
    ]
}

requireDir('./gulp-tasks')
gulp.task('default', ['inject-js', 'webpack-bundle'])

/*
 * Watch tasks
 */
gulp.task('watch-js', function (cb) {
    return gulp.watch(paths.scripts, ['inject-js'])
})

gulp.task('watch', ['watch-js'])
