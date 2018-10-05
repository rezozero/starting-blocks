/*
 * Copyright © 2017, Rezo Zero
 *
 * @file app.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */

import {
    Kernel,
    Pjax,
    Prefetch,
    CacheProvider,
    GraphicLoader,
    polyfills
} from 'starting-blocks'
import ClassFactory from './factories/ClassFactory'
import TransitionFactory from './factories/TransitionFactory'
import ExampleNav from './ExampleNav'
import 'gsap/CSSPlugin'

// BEING IMPORTANT (Bug Safari 10.1)
// DO NOT REMOVE
if (window.MAIN_EXECUTED) {
    throw new Error('Safari 10')
}

window.MAIN_EXECUTED = true
// END IMPORTANT

/**
 * Declare polyfills
 */
polyfills()

/**
 * Build nav
 * @type {ExampleNav}
 */
const nav = new ExampleNav()

/**
 * Build Router
 */
const kernel = new Kernel({
    services: {
        pjax: new Pjax(),
        cacheProvider: new CacheProvider(),
        prefetch: new Prefetch(),
        lazyload: null,
        worker: null,
        graphicLoader: new GraphicLoader(),
        classFactory: new ClassFactory(),
        transitionFactory: new TransitionFactory()
    },
    options: {

    }
})

nav.init()
kernel.init()
