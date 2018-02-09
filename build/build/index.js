import debug from 'debug'
import getWebpackConfigBase from './base'
import webpackConfigOverrides from './environments'
import WebpackMerge from 'webpack-merge'

const dbg = debug('StartingBlocks:webpack-config  ')
dbg.color = debug.colors[4]

const getWebpackConfig = (config) => {
    dbg('👷‍♂️  Creating webpack configuration')

    const base = getWebpackConfigBase(config)
    const target = process.env.TARGET || 'all'
    const baseBuild = WebpackMerge.smart(base, webpackConfigOverrides['build'](base, config))
    const baseDemo = WebpackMerge.smart(base, webpackConfigOverrides['examples'](base, config))

    dbg(`🕵️‍♂️  Looking for environment overrides for NODE_ENV "${config.env}".`)

    const overrides = webpackConfigOverrides[config.env]

    if (webpackConfigOverrides[config.env]) {
        dbg('🙋‍♂️  Found overrides, applying to default configuration.')
        if (target === 'bundle') {
            return WebpackMerge.smart(baseBuild, overrides(baseBuild, config))
        } else if (target === 'demo') {
            return WebpackMerge.smart(baseDemo, overrides(baseDemo, config))
        } else {
            return [
                WebpackMerge.smart(baseBuild, overrides(baseBuild, config)),
                WebpackMerge.smart(baseDemo, overrides(baseDemo, config))
            ]
        }
    } else {
        dbg('🤷‍♂️  No environment overrides found.')
        if (target === 'bundle') {
            return baseBuild
        } else if (target === 'demo') {
            return baseDemo
        } else {
            return [
                baseBuild,
                baseDemo
            ]
        }
    }
}

export default getWebpackConfig
