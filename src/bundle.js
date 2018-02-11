import tmpRouter from './router/Router'
import tmpCacheProvider from './router/CacheProvider'
import tmpGraphicLoader from './utils/GraphicLoader'
import tmpAbstractPage from './abstracts/AbstractPage'
import tmpAbstractBlock from './abstracts/AbstractBlock'
import tmpAbstractTransition from './abstracts/AbstractTransition'
import tmpUtils from './utils/Utils'
import tmpScroll from './utils/Scroll'
import tmppolyfills from './utils/polyfills'
import tmpgaTrackErrors from './utils/gaTrackErrors'
import tmpdebounce from './utils/debounce'
import tmpBootstrapMedia from './utils/BootstrapMedia'
import tmpEventTypes from './types/EventTypes'

/** @private */
export const Router = tmpRouter
/** @private */
export const CacheProvider = tmpCacheProvider
/** @private */
export const GraphicLoader = tmpGraphicLoader
/** @private */
export const AbstractPage = tmpAbstractPage
/** @private */
export const AbstractBlock = tmpAbstractBlock
/** @private */
export const AbstractTransition = tmpAbstractTransition
/** @private */
export const Utils = tmpUtils
/** @private */
export const Scroll = tmpScroll
/** @private */
export const polyfills = tmppolyfills
/** @private */
export const gaTrackErrors = tmpgaTrackErrors
/** @private */
export const debounce = tmpdebounce
/** @private */
export const BootstrapMedia = tmpBootstrapMedia
/** @private */
export const EventTypes = tmpEventTypes
