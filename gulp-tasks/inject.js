var gulp = require('gulp')
var inject = require('gulp-inject')

var transformFunc = function (filepath) {
    if (filepath.slice(-3) === '.js') {
        return '<script src="' + filepath + '"></script>'
    }

    // Use the default transform as fallback:
    return inject.transform.apply(inject.transform, arguments)
}

gulp.task('inject-js', ['webpack'], function () {
    var builtFiles = gulp.src(paths.toInject, {
        read: false
    })

    return gulp.src(paths.html)
        .pipe(inject(builtFiles, {
            transform: transformFunc,
            relative: true
        }))
        .pipe(gulp.dest('./examples'))
})
