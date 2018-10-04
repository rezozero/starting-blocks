import webpack from 'webpack'
import debug from 'debug'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin'

const dbg = debug('StartingBlocks:webpack-config:environments  ')
dbg.color = debug.colors[5]

export default {
    build: (base, config) => {
        const paths = config.utils_paths

        let override = {
            mode: 'production',
            entry: {
                bundle: paths.client('bundle.js')
            },
            output: {
                path: paths.dist(),
                filename: 'main.js',
                library: 'starting-blocks',
                libraryTarget: 'commonjs2'
            },
            plugins: []
        }

        if (config.bundleAnalyzerReportBundle) {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
            override.plugins.push(new BundleAnalyzerPlugin())
        }

        return override
    },

    examples: (base, config) => {
        const paths = config.utils_paths

        let override = {
            resolve: config.resolve,
            entry: {
                app: paths.clientDemo('js/app.js')
            },
            output: {
                path: paths.distDemo(),
                filename: 'js/[name].js'
            },
            plugins: [
                new CopyWebpackPlugin([{
                    from: paths.clientDemo('img'),
                    to: paths.distDemo('img')
                }, {
                    from: paths.clientDemo('views'),
                    to: paths.distDemo('')
                }, {
                    from: paths.clientDemo('css'),
                    to: paths.distDemo('css')
                }]),
                new ExtractTextPlugin({
                    filename: paths.clientDemo('css/[name].css'),
                    ignoreOrder: true,
                    allChunks: false
                }),
                new HtmlWebpackPlugin({
                    filename: paths.distDemo('index.html'),
                    template: paths.clientDemo('views/index.html'),
                    cache: true,
                    inject: true,
                    alwaysWriteToDisk: true,
                    refreshOnChange: config.refreshOnChange
                }),
                new HtmlWebpackPlugin({
                    filename: paths.distDemo('page1.html'),
                    template: paths.clientDemo('views/page1.html'),
                    cache: true,
                    inject: true,
                    alwaysWriteToDisk: true,
                    refreshOnChange: config.refreshOnChange
                })
            ]
        }

        if (config.bundleAnalyzerReportDemo) {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
            override.plugins.push(new BundleAnalyzerPlugin())
        }

        return override
    },

    development: (base, config) => {
        return {
            mode: 'development',
            watch: true
        }
    },

    production: (base, config) => {
        dbg('🗑  Cleaning assets folder')
        dbg('👽  Using UglifyJs')
        dbg('🎨  Using PostCss')

        return {
            mode: 'production',
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: '"production"'
                    }
                })
            ],
            optimization: {
                minimize: true,
                occurrenceOrder: true,
                sideEffects: false,
                minimizer: [
                    new UglifyJsWebpackPlugin({
                        parallel: true,
                        uglifyOptions: {
                            output: {
                                comments: false,
                                beautify: false
                            }
                        }
                    })
                ]
            }
        }
    }
}
