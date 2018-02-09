import getConfig from './build/config'
import getWebpackConfig from './build/build'

module.exports = getWebpackConfig(getConfig())
