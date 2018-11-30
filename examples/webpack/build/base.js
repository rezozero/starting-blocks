import webpack from 'webpack'
import debug from 'debug'
import WebpackNotifierPlugin from 'webpack-notifier'
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackMultiBuildPlugin from '../modules/HtmlWebpackMultiBuildPlugin'

const dbg = debug('StartingBlocks:webpack-config:base  ')
dbg.color = debug.colors[3]

const getWebpackConfigBase = (config) => {
    dbg('⚙  Exporting default webpack configuration.')

    const paths = config.utils_paths

    let webpackConfig = {
        cache: true,
        stats: config.stats,
        devtool: config.devtool,
        target: 'web',
        resolve: config.resolve,
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
                    cacheDirectory: true
                }
            }]
        },
        plugins: [
            new CleanTerminalPlugin(),
            new webpack.DefinePlugin(config.globals),
            new webpack.NoEmitOnErrorsPlugin(),
            new WebpackNotifierPlugin({ alwaysNotify: true }),
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
            new HtmlWebpackPlugin({
                filename: paths.distDemo('index.html'),
                template: paths.clientDemo('views/index.html'),
                cache: false,
                inject: false,
                refreshOnChange: config.refreshOnChange
            }),
            new HtmlWebpackMultiBuildPlugin()
        ],
        externals: config.externals
    }

    if (config.bundleAnalyzerReportDemo) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
        webpackConfig.plugins.push(new BundleAnalyzerPlugin())
    }

    if (config.refreshOnChange) {
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    return webpackConfig
}

export default getWebpackConfigBase
