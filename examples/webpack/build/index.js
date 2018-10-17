import debug from 'debug'
import getWebpackConfigBase from './base'
import webpackConfigOverrides from './environments'
import WebpackMerge from 'webpack-merge'

const dbg = debug('StartingBlocks:webpack-config  ')
dbg.color = debug.colors[4]

const getWebpackConfig = (config) => {
    dbg('👷‍♂️  Creating webpack configuration')

    const base = getWebpackConfigBase(config)
    const baseModern = WebpackMerge.smart(base, webpackConfigOverrides['modern'](base, config))
    const baseLegacy = WebpackMerge.smart(base, webpackConfigOverrides['legacy'](base, config))

    dbg(`🕵️‍♂️  Looking for environment overrides for NODE_ENV "${config.env}".`)

    const overrides = webpackConfigOverrides[config.env]

    if (webpackConfigOverrides[config.env]) {
        dbg('🙋‍♂️  Found overrides, applying to default configuration.')

        return [
            WebpackMerge.smart(baseModern, overrides(baseModern, config)),
            WebpackMerge.smart(baseLegacy, overrides(baseLegacy, config))
        ]
    } else {
        dbg('🤷‍♂️  No environment overrides found.')
    }
}

export default getWebpackConfig
