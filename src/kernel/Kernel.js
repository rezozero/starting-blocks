/**
 * @file Kernel.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

import Dom from './Dom'
import Dispatcher from '../dispatcher/Dispatcher'
import { AFTER_PAGE_BOOT } from '../types/EventTypes'

const DEFAULT_OPTIONS = {
    pageClass: 'page-content',
    pageBlockClass: 'page-block',
    objectTypeAttr: 'data-node-type',
    ajaxWrapperId: 'sb-wrapper',
    noAjaxLinkClass: 'no-ajax-link',
    noPrefetchLinkClass: 'no-prefetch'
}

/**
 * Application kernel.
 */
export default class Kernel {
    /**
     * Create a new Kernel.
     *
     * @param {Object} services
     * @param {Pjax|null} [services.pjax]
     * @param {CacheProvider|null} [services.cacheProvider]
     * @param {Prefetch|null} [services.prefetch]
     * @param {Lazyload|null} [services.lazyload]
     * @param {Worker|null} [services.worker]
     * @param {GraphicLoader|null} [services.graphicLoader]
     * @param {ClassFactory|null} [services.classFactory]
     * @param {TransitionFactory|null} [services.transitionFactory]
     *
     * @param {Object} options
     * @param {string} [options.pageClass=page-content] - The class name of the root page node
     * @param {string} [options.pageBlockClass=page-block] - The class name to detect blocks
     * @param {string} [options.objectTypeAttr=data-node-type]
     * @param {string} [options.ajaxWrapperId=sb-wrapper]
     */
    constructor ({ services = {}, options = {} } = {}) {
        /**
         * @type {Object}
         */
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options
        }

        /**
         * @type {(Pjax|null)}
         */
        this.pjax = services.pjax || null

        /**
         * @type {(CacheProvider|null)}
         */
        this.cacheProvider = services.cacheProvider || null

        /**
         * @type {(Prefetch|null)}
         */
        this.prefetch = services.prefetch || null

        /**
         * @type {(Lazyload|null)}
         */
        this.lazyload = services.lazyload || null

        /**
         * @type {(Worker|null)}
         */
        this.worker = services.worker || null

        /**
         * @type {(GraphicLoader|null)}
         */
        this.graphicLoader = services.graphicLoader || null

        /**
         * @type {(ClassFactory|null)}
         */
        this.classFactory = services.classFactory || null

        /**
         * @type {(TransitionFactory|null)}
         */
        this.transitionFactory = services.transitionFactory || null

        if (!window.location.origin) {
            window.location.origin = window.location.protocol + '//' + window.location.host
        }

        /**
         * Base url
         * @type {String}
         */
        this.baseUrl = window.location.origin

        /**
         * Page instance
         * @type {(AbstractPage|null)}
         */
        this.page = null

        /**
         * Dom instance
         * @type {(Dom|null)}
         */
        this.dom = null

        // Bind methods
        this.buildPage = this.buildPage.bind(this)
    }

    init () {
        this.dom = new Dom({
            wrapperId: this.options.ajaxWrapperId,
            objectTypeAttr: this.options.objectTypeAttr,
            pageClass: this.options.pageClass
        })

        // Init pjax when ajax is enabled and window.fetch is supported
        if (this.pjax && window.fetch) {
            if (this.cacheProvider) {
                this.pjax.cacheProvider = this.cacheProvider
            }

            if (this.worker) {
                this.pjax.worker = this.worker
            }

            if (this.transitionFactory) {
                this.pjax.transitionFactory = this.transitionFactory
            }

            this.pjax.kernel = this
            this.pjax.dom = this.dom
            this.pjax.init()

            // Init prefetch
            if (this.prefetch) {
                this.prefetch.cacheProvider = this.cacheProvider
                this.prefetch.pjax = this.pjax
                this.prefetch.init()
            }
        }

        // Build first page with static context
        this.buildPage(this.dom.getContainer(), 'static')
    }

    /**
     * Build a new page instance.
     *
     * @param {HTMLElement} container
     * @param {String} context
     * @returns {AbstractPage|null}
     */
    buildPage (container, context = 'ajax') {
        if (!container) {
            throw new Error(`Kernel: container not found! Did you use at least 
            one dom element with ".${this.options.pageClass}" class and "data-node-type" attribute`)
        }

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
