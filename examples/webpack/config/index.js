import debug from 'debug'
import path from 'path'
import getConfigBase from './base'
import configOverrides from './environments'

const dbg = debug('StartingBlocks:config  ')
dbg.color = debug.colors[1]

const getConfig = () => {
    dbg('👷‍♂️  Creating configuration.')

    let configBase = getConfigBase()

    dbg(`🕵️‍♂️  Looking for environment overrides for NODE_ENV "${configBase.env}".`)

    const overrides = configOverrides[configBase.env]

    if (configOverrides[configBase.env]) {
        dbg('🙋‍♂️  Found overrides, applying to default configuration.')
        Object.assign(configBase, overrides(configBase))
    } else {
        dbg('🤷‍♂️  No environment overrides found.')
    }

    // ------------------------------------
    // Utilities
    // ------------------------------------
    const resolve = path.resolve
    const base = (...args) =>
        Reflect.apply(resolve, null, [configBase.path_base, ...args])

    configBase.utils_paths = {
        base: base,
        clientDemo: base.bind(null, configBase.dir_entry_demo),
        distDemo: base.bind(null, configBase.dir_dist_demo)
    }

    return configBase
}

export default getConfig
