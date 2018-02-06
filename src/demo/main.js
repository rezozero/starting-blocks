import $ from 'jquery'
import log from 'loglevel'
import polyfills from '../utils/polyfills'
import Router from '../router/Router'
import GraphicLoader from '../GraphicLoader'
import ClassFactory from '../factories/ClassFactory'
import ExampleNav from './ExampleNav'
import TransitionFactory from '../factories/TransitionFactory'

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
},
new ClassFactory(),
// temp namespace is defined in your index.html
window.location.origin,
new GraphicLoader(),
new ExampleNav(),
new TransitionFactory()
)

router.init()
