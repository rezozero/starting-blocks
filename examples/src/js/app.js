/**
 * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file app.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */

import {
    Router,
    polyfills
} from 'starting-blocks'
import ClassFactory from './factories/ClassFactory'
import TransitionFactory from './factories/TransitionFactory'
import ExampleNav from './ExampleNav'
import 'gsap/CSSPlugin'

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
const router = new Router({
    ajaxEnabled: true,
    lazyloadEnabled: true,
    cacheEnabled: true,
    workerEnabled: true,
    transitionFactory: new TransitionFactory(),
    classFactory: new ClassFactory()
})

nav.init()
router.init()
