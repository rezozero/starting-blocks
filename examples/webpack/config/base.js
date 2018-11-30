import debug from 'debug'
import path from 'path'

const dbg = debug('StartingBlocks:config:base  ')
dbg.color = debug.colors[2]

const getConfig = () => {
    let config = {
        env: process.env.NODE_ENV || 'development'
    }

    config = {
        ...config,
        devtool: false,

        // ----------------------------------
        // Project Structure
        // ----------------------------------
        path_base: path.resolve(__dirname, '..'),
        dir_entry_demo: '../src',
        dir_dist_demo: '../dist',

        bundleAnalyzerReportDemo: false,

        // ----------------------------------
        // Stats
        // ----------------------------------
        // stats: {
        //     chunks: false,
        //     chunkModules: false,
        //     colors: true,
        //     children: false,
        //     version: false,
        //     reasons: false
        // },
        stats: 'minimal',

        // ----------------------------------
        // Inputs
        // ----------------------------------
        js_vendors: [],

        // ----------------------------------
        // Externals
        // ----------------------------------
        externals: {

        },

        resolve: {
            alias: {
                'starting-blocks': path.resolve(__dirname, '../../../')
            },
            extensions: ['.js']
        },

        // ----------------------------------
        // Globals
        // ----------------------------------
        // ⚠️ : You have to add all these constants to .eslintrc file
        globals: {
            'DEVELOPMENT': JSON.stringify(config.env === 'development'),
            'PRODUCTION': JSON.stringify(config.env === 'production'),
            'ENVIRONMENT': JSON.stringify(config.env)
        }
    }

    config.public_path = ''

    dbg('⚙  Exporting default configuration.')
    return config
}

export default getConfig
