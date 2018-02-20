/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
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
 * @file Router.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

import $ from 'jquery'
import CacheProvider from './CacheProvider'
import Dispatcher from '../dispatcher/Dispatcher'
import TransitionFactory from '../factories/TransitionFactory'
import {
    AFTER_PAGE_BOOT
} from '../types/EventTypes'
import Prefetch from './Prefetch'
import History from './History'
import Pjax from './Pjax'
import Dom from './Dom'

import ClassFactory from '../factories/ClassFactory'
import GraphicLoader from '../utils/GraphicLoader'

const DEFAULT_OPTIONS = {
    ajaxEnabled: true,
    pageClass: 'page-content',
    ajaxWrapperId: 'sb-wrapper',
    objectTypeAttr: 'data-node-type',
    noAjaxLinkClass: 'no-ajax-link',
    noPrefetchLinkClass: 'no-prefetch',
    pageBlockClass: '.page-block',
    lazyloadEnabled: false,
    prefetchEnabled: true,
    lazyloadSrcAttr: 'data-src',
    lazyloadClass: 'lazyload',
    lazyloadSrcSetAttr: 'data-srcset',
    lazyloadThreshold: 300,
    lazyloadThrottle: 150,
    useCache: true,
    classFactory: null,
    graphicLoader: null,
    transitionFactory: null
}

/**
 * Application main page router.
 */
export default class Router {
    /**
     * Create a new Router.
     *
     * ### Default options list:
     *
     * | Options | Default value |
     * | ----- | ----- |
     * | `ajaxEnabled` | `true` |
     * | `pageClass` | "page-content" **without point!** |
     * | `objectTypeAttr` | "data-node-type" |
     * | `noAjaxLinkClass` | "no-ajax-link" |
     * | `noPrefetchLinkClass` | "no-prefetch" |
     * | `useCache` | `true` |
     * | `pageBlockClass` | `".page-block"` **with point!** |
     * | `lazyloadEnabled` | `false` |
     * | `lazyloadSrcAttr` | "data-src" |
     * | `lazyloadClass` | "lazyload" |
     * | `lazyloadSrcSetAttr` | "data-src-set" |
     * | `lazyloadThreshold` | `300` |
     * | `lazyloadThrottle` | `150` |
     * | `classFactory` | ClassFactory instance |
     * | `graphicLoader` | GraphicLoader instance |
     * | `transitionFactory` | TransitionFactory instance |
     *
     *
     * @param {Object} options
     */
    constructor (options = {}) {
        /**
         * @type {Object}
         */
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options
        }

        if (!window.location.origin) {
            window.location.origin = window.location.protocol + '//' + window.location.host
        }

        /**
         * Transition factory instance to manage page transition
         * @type {TransitionFactory}
         */
        this.transitionFactory = null

        if (!this.options.graphicLoader) {
            /**
             * @type {GraphicLoader}
             */
            this.loader = new GraphicLoader()
        } else {
            this.loader = this.options.graphicLoader
        }

        if (!this.options.classFactory) {
            /**
             * Class factory instance to manage page type and blocks.
             *
             * @type {ClassFactory}
             */
            this.classFactory = new ClassFactory()
        } else {
            this.classFactory = this.options.classFactory
        }

        /* Check if ajax is enable */
        if (this.options.ajaxEnabled && window.fetch) {
            /* If enabled, we use a transition factory to manage page transition */
            this.transitionFactory = this.options.transitionFactory || new TransitionFactory()
        }

        /**
         * Base url
         * @type {String}
         */
        this.baseUrl = window.location.origin

        /**
         * Page instance
         * @type {AbstractPage|null}
         */
        this.page = null

        /**
         * Prefetch instance
         * @type {null}
         */
        this.prefetch = null

        /**
         * Cache provider instance
         * @type {CacheProvider|null}
         */
        this.cacheProvider = null

        /**
         * History instance
         * @type {History|null}
         */
        this.history = null

        /**
         * Dom instance
         * @type {Dom|null}
         */
        this.dom = null

        /**
         * Pjax instance
         * @type {Pjax|null}
         */
        this.pjax = null

        this.$body = $(document.body)

        // Binded methods
        this.buildPage = this.buildPage.bind(this)
    }

    init () {
        this.dom = new Dom(this.$body, {
            wrapperId: this.options.ajaxWrapperId,
            objectTypeAttr: this.options.objectTypeAttr,
            containerClass: this.options.pageClass
        })

        // Init pjax when ajax is enabled and window.fetch is supported
        if (this.options.ajaxEnabled && window.fetch) {
            this.cacheProvider = new CacheProvider()
            this.history = new History()

            const pjaxOptions = {
                ignoreClassLink: this.options.noAjaxLinkClass,
                cacheEnabled: this.options.useCache
            }

            this.pjax = new Pjax(
                this,
                this.history,
                this.dom,
                this.cacheProvider,
                this.transitionFactory,
                this.loader,
                pjaxOptions)
            this.pjax.init()
        }

        // Init prefetch if ajax and prefetch option are enabled
        if (this.options.ajaxEnabled && window.fetch && this.options.prefetchEnabled) {
            this.prefetch = new Prefetch(this.pjax, this.cacheProvider, {
                cacheEnabled: this.options.useCache,
                noPrefetchLinkClass: this.options.noPrefetchLinkClass
            })
            this.prefetch.init()
        }

        // Build first page with static context
        this.buildPage(this.dom.getContainer(), 'static')
        this.initEvents()
    }

    initEvents () {}

    /**
     * Build a new page instance.
     *
     * @param {HTMLElement} container
     * @param {String} context
     * @returns {AbstractPage|null}
     */
    buildPage (container, context = 'ajax') {
        if (!container) throw new Error('Router: container not found!')

        // Get page
        this.page = this.classFactory.getPageInstance(
            this,
            container,
            context,
            this.dom.getNodeType(container)
        )

        // Init page
        this.page.init()

        // Dispatch an event to inform that the new page is ready
        Dispatcher.commit(AFTER_PAGE_BOOT, this.page)

        return this.page
    }
}
