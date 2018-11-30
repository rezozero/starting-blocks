import webpack from 'webpack'
import debug from 'debug'

const dbg = debug('StartingBlocks:webpack-config:environments  ')
dbg.color = debug.colors[5]

const optimization = {
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'all',
                minChunks: 2,
                minSize: 0,
                enforce: true
            }
        }
    }
}

export default {
    modern: (base, config) => {
        const paths = config.utils_paths

        return {
            entry: {
                app: paths.clientDemo('js/app.js')
            },
            output: {
                path: paths.distDemo(),
                filename: 'js/modern.[name].js'
            },
            module: {
                rules: [{
                    test: /\.js$/,
                    enforce: 'pre',
                    loader: 'eslint-loader',
                    exclude: [/node_modules/, /starting-blocks/]
                }, {
                    test: /\.js?$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: [
                            [
                                '@babel/preset-env', {
                                    targets: {
                                        esmodules: true
                                    }
                                }
                            ]
                        ]
                    }
                }]
            }
        }
    },

    legacy: (base, config) => {
        const paths = config.utils_paths

        return {
            entry: {
                app: ['whatwg-fetch', 'es6-promise', 'url-polyfill', paths.clientDemo('js/app.js')]
            },
            output: {
                path: paths.distDemo(),
                filename: 'js/legacy.[name].js'
            }
        }
    },

    development: (base, config) => {
        return {
            mode: 'development',
            watch: true,
            optimization: {
                ...optimization
            }
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
                ...optimization
            }
        }
    }
}
