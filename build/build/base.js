import webpack from 'webpack'
import debug from 'debug'
import WebpackNotifierPlugin from 'webpack-notifier'

const dbg = debug('StartingBlocks:webpack-config:base  ')
dbg.color = debug.colors[3]

const getWebpackConfigBase = (config) => {
    const paths = config.utils_paths

    dbg('⚙  Exporting default webpack configuration.')

    let webpackConfig = {
        cache: true,
        stats: config.stats,
        devtool: config.devtool,
        target: 'web',
        context: paths.dist(),
        module: {
            rules: [{
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: [/node_modules/, /main.js/]
            }, {
                test: /\.js?$/,
                exclude: [/node_modules/, /main.js/],
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            }]
        },
        plugins: [
            new webpack.DefinePlugin(config.globals),
            new webpack.NoEmitOnErrorsPlugin(),
            new WebpackNotifierPlugin({alwaysNotify: true})
        ],
        externals: config.externals
    }

    if (config.refreshOnChange) {
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    return webpackConfig
}

export default getWebpackConfigBase
