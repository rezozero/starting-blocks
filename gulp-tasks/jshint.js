var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint({
            'esversion': 6,
            '-W008': true // decimal point
        }))
        .pipe(jshint.reporter('default', { verbose: true }));
});
