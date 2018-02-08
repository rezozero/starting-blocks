import log from 'loglevel'
import polyfills from '../utils/polyfills'
import Router from '../router/Router'

/*
 * Declare polyfills
 */
polyfills()

log.setLevel(0)

/**
 * Begin main app
 */
if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.host
}

const router = new Router({
    homeHasClass: false,
    ajaxEnabled: true,
    useCache: true,
    lazyloadEnabled: true
})

router.init()
