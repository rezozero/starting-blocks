var gulp = require('gulp')
var webpackStream = require('webpack-stream')
var webpack = require('webpack')
var rev = require('gulp-rev')
var plumber = require('gulp-plumber')
var del = require('del')
var named = require('vinyl-named')

gulp.task('clean-build', function () {
    return del(paths.distScripts)
})

gulp.task('webpack', ['clean-build'], function (cb) {
    var config = {
        output: {
            filename: 'app.js'
        },
        module: {
            loaders: [{
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bundle\.js)/,
                loader: 'babel-loader'
            }]
        },
        plugins: []
    }

    if (process.env.NODE_ENV === 'production') {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false,
            sourceMap: false
        }))
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }))
        console.log('Uglified scripts.')
    } else {
        config.devtool = 'eval-source-map'
        console.log('With eval source maps.')
    }

    return gulp.src(paths.entry)
        .pipe(plumber({
            handleError: function (err) {
                cb(err)
            }
        }))
        .pipe(named())
        .pipe(webpackStream(config))
        .pipe(rev())
        .pipe(gulp.dest(paths.distScripts))
})

gulp.task('webpack-bundle', function (cb) {
    var config = {
        output: {
            filename: 'bundle.js',
            library: 'starting-blocks',
            libraryTarget: 'commonjs2'
        },
        module: {
            loaders: [{
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }]
        },
        plugins: [],
        externals: {
            'jQuery': 'jQuery',
            'jquery': 'jquery',
            '$': '$',
            'loglevel': 'loglevel',
            'jquery.waitforimages': 'jquery.waitforimages',
            'ismobilejs': 'ismobilejs'
        }
    }

    if (process.env.NODE_ENV === 'production') {
        var d = new Date(Date.now())
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: true,
            comments: false,
            sourceMap: false
        }))
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }))
        config.plugins.push(new webpack.BannerPlugin('starting-blocks | Rezo Zero | Built on ' + d.toISOString()))
        console.log('Uglified scripts.')
    } else {
        config.devtool = 'eval-source-map'
        console.log('With eval source maps.')
    }

    /**
     * DO NOT use plumber!
     * to fail the build if any error occur
     * for Travis-CI
     */
    return gulp.src(paths.bundleEntry)
        .pipe(webpackStream(config))
        .pipe(gulp.dest(paths.bundleOut))
})
