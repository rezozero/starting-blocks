var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(eslint({
            extends: 'eslint:recommended',
            parserOptions: {
                "ecmaVersion": 6,
                "sourceType": "module",
            },
            env: {
                browser: true,
                node: false
            },
            "rules": {
                "no-console":0,
                'no-undef':0,
                'no-unused-vars':0
            }
        }))
        .pipe(eslint.formatEach('compact', process.stderr));
});
