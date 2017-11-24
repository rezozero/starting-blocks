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
 */
import $ from 'jquery'
import isMobile from 'ismobilejs'
// import log from 'loglevel'
import Utils from '../utils/Utils'
import State from '../State'
import CacheProvider from './CacheProvider'
// import Events from './Events'
import StatesStack from '../StatesStack'
import TransitionFactory from '../factories/TransitionFactory'
// import {
//     BEFORE_PAGE_LOAD,
// AFTER_PAGE_LOAD,
//     AFTER_DOM_APPENDED,
//     AFTER_PAGE_BOOT
// } from './EventTypes'
import Prefetch from './Prefetch'
import History from './History'
import Pjax from './Pjax'
import Dom from './Dom'

const DEFAULT_OPTIONS = {
    homeHasClass: false,
    ajaxEnabled: true,
    pageClass: 'page-content',
    objectTypeAttr: 'data-node-type',
    ajaxLinkTypeAttr: 'data-node-type',
    noAjaxLinkClass: 'no-ajax-link',
    navLinkClass: 'nav-link',
    activeClass: 'active',
    pageBlockClass: '.page-block',
    lazyloadEnabled: false,
    prefetchEnabled: true,
    lazyloadSrcAttr: 'data-src',
    lazyloadClass: 'lazyload',
    lazyloadSrcSetAttr: 'data-srcset',
    lazyloadThreshold: 300,
    lazyloadThrottle: 150,
    $ajaxContainer: $('#ajax-container'),
    minLoadDuration: 0,
    preLoadPageDelay: 0,
    useCache: true
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
     * | `homeHasClass` | `false` |
     * | `ajaxEnabled` | `true` |
     * | `pageClass` | "page-content" **without point!** |
     * | `objectTypeAttr` | "data-node-type" |
     * | `ajaxLinkTypeAttr`  | "data-node-type" |
     * | `noAjaxLinkClass` | "no-ajax-link" |
     * | `navLinkClass` | "nav-link" |
     * | `activeClass` | "active" |
     * | `useCache` | `true` |
     * | `pageBlockClass` | `".page-block"` **with point!** |
     * | `$ajaxContainer` | `$("#ajax-container")` |
     * | `lazyloadEnabled` | `false` |
     * | `lazyloadSrcAttr` | "data-src" |
     * | `lazyloadClass` | "lazyload" |
     * | `lazyloadSrcSetAttr` | "data-src-set" |
     * | `lazyloadThreshold` | `300` |
     * | `lazyloadThrottle` | `150` |
     * | `minLoadDuration` | `0` |
     * | `preLoadPageDelay` |  |
     *
     *
     * @param {Object} options
     * @param {ClassFactory} classFactory
     * @param {String} baseUrl
     * @param {GraphicLoader} loader
     * @param {AbstractNav} nav
     * @param {TransitionFactory} transitionFactory
     */
    constructor (options = {}, classFactory, baseUrl, loader, nav, transitionFactory = null) {
        /**
         * @type {Object}
         */
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options
        }

        /**
         * @type {TransitionFactory}
         */
        this.transitionFactory = null

        if (!baseUrl) {
            throw new Error('Router needs baseUrl to be defined.')
        }
        if (!loader) {
            throw new Error('Router needs a GraphicLoader instance to be defined.')
        }
        if (!classFactory) {
            throw new Error('Router needs a ClassFactory instance to be defined.')
        }
        if (!nav) {
            throw new Error('Router needs a Nav instance to be defined.')
        }
        if (this.options.ajaxEnabled) {
            this.transitionFactory = transitionFactory || new TransitionFactory()
        }

        /**
         * @type {ClassFactory}
         */
        this.classFactory = classFactory
        /**
         * @type {String}
         */
        this.baseUrl = baseUrl
        /**
         * @type {GraphicLoader}
         */
        this.loader = loader
        /**
         * @type {AbstractNav}
         */
        this.nav = nav
        this.nav.router = this
        /**
         * @type {State|null}
         */
        this.state = null
        /**
         * @type {Array}
         */
        this.formerPages = []
        /**
         * @type {null}
         */
        this.page = null
        this.transition = false
        this.loading = false
        this.statesStack = new StatesStack()
        this.$window = $(window)
        this.$body = $('body')

        this.deviceType = (isMobile.any === false) ? 'desktop' : 'mobile'
        Utils.addClass(this.$body[0], 'is-' + this.deviceType)

        this.currentRequest = null
        this.cacheProvider = new CacheProvider()
        this.history = new History()
        this.dom = new Dom()
        this.pjax = new Pjax(this.history, this.dom, this.cacheProvider, this.transitionFactory)
        this.prefetch = null
    }

    init () {
        this.pjax.init()

        if (this.options.prefetchEnabled) {
            this.prefetch = new Prefetch(this.pjax, this.cacheProvider)
            this.prefetch.init()
        }
    }

    // destroy () {
    //     if (this.options.ajaxEnabled) {
    //         window.removeEventListener('popstate', this.onPopState.bind(this), false)
    //     }
    // }
    //
    // /**
    //  * Initialize Router events.
    //  */
    // initEvents () {
    //     if (this.options.ajaxEnabled) {
    //         document.addEventListener('click', this.onLinkClick)
    //         window.addEventListener('popstate', this.onPopState.bind(this), false)
    //         window.addEventListener(AFTER_PAGE_BOOT, this.trackGoogleAnalytics.bind(this), false)
    //     }
    //
    //     if (this.options.prefetchEnabled) {
    //         this.prefetch = new Prefetch(this)
    //         this.prefetch.init()
    //     }
    //
    //     /*
    //      * Init nav events
    //      */
    //     this.nav.initEvents(this)
    // }
    // /**
    //  * @private
    //  * @param  {Object} event
    //  * @return
    //  */
    // onPopState () {
    //     const newUrl = this.getCurrentUrl()
    //
    //     if (this.transitionProgress) { this.forceGoTo(newUrl) }
    //
    //     if (this.history.currentStatus().url === newUrl) { return false }
    //
    //     this.history.add(newUrl)
    //
    //     this.loadPage(newUrl)
    // }
    //
    // getCurrentUrl () {
    //     return Utils.cleanLink(Utils.getCurrentUrl())
    // }
    //
    // /**
    //  * Force the browser to go to a certain url
    //  *
    //  * @param {String} url
    //  * @private
    //  */
    // forceGoTo (url) {
    //     window.location = url
    // }
    //
    // /**
    //  * Booting need a jQuery handler for the jQuery container.
    //  *
    //  * Call this method in your `main.js` or app entry point **after** creating
    //  * the router and calling `initEvents` method.
    //  *
    //  * @param  {jQuery}  $cont The jQuery DOM element to boot in.
    //  * @param  {String}  context ["static" or custom string]
    //  * @param  {Boolean} isHome
    //  */
    // boot ($cont, context, isHome) {
    //     if (context === 'static') {
    //         this.loadBeginDate = new Date()
    //     }
    //
    //     const nodeType = $cont.attr(this.options.objectTypeAttr)
    //     this.page = this.classFactory.getPageInstance(nodeType, this, $cont, context, nodeType, isHome)
    //
    //     /*
    //      * Replace current state
    //      * for first request
    //      */
    //     if (this.state === null) {
    //         this.state = new State(this)
    //         this.statesStack.push(this.state)
    //         window.history.replaceState(this.state, '', '')
    //
    //         // Init first page
    //         this.pageLoaded()
    //     }
    //
    //     if (context === 'ajax') {
    //         this.state.update(this.page)
    //     }
    //
    //     Events.commit(AFTER_PAGE_BOOT, this.page)
    // }
    //
    // pageLoaded () {
    //     const onShowEnded = this.page.onShowEnded.bind(this.page)
    //     this.loader.hide()
    //
    //     Events.commit(AFTER_PAGE_LOAD, this.page.$cont)
    //
    //     if (this.page.context === 'static') {
    //         this.page.show(onShowEnded)
    //     } else if (this.page.context === 'ajax') {
    //         // Update body id
    //         if (this.page.name !== null && this.page.name !== '') {
    //             document.body.id = this.page.name
    //             this.$body.addClass(this.page.name)
    //         }
    //
    //         this.$body.addClass(this.page.type)
    //         this.page.show(onShowEnded)
    //     }
    // }
    //
    // destroyPreviousPage () {
    //     // Hide formerPages - show
    //     if (this.page.context === 'ajax' && this.formerPages.length > 0) {
    //         const formerPage = this.formerPages[(this.formerPages.length - 1)]
    //         const formerPageDestroy = formerPage.destroy.bind(formerPage)
    //         /*
    //          * Very important,
    //          * DO NOT animate if there are more than 1 page
    //          * in destroy queue!
    //          */
    //         if (this.formerPages.length > 1) {
    //             formerPageDestroy()
    //         } else {
    //             formerPage.hide(formerPageDestroy)
    //         }
    //         this.formerPages.pop()
    //     }
    //
    //     this.page.updateLazyload()
    // }
    //
    // /**
    //  * Get the .href parameter out of an element
    //  * and handle special cases (like xlink:href)
    //  *
    //  * @private
    //  * @param  {HTMLElement} el
    //  * @return {String} href
    //  */
    // getHref (el) {
    //     if (!el) {
    //         return undefined
    //     }
    //
    //     if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
    //         return el.getAttribute('xlink:href')
    //     }
    //
    //     if (typeof el.href === 'string') {
    //         return el.href
    //     }
    //
    //     return undefined
    // }
    //
    // /**
    //  * Determine if the link should be followed
    //  *
    //  * @param  {MouseEvent} evt
    //  * @param  {HTMLElement} element
    //  * @return {Boolean}
    //  */
    // preventCheck (evt, element) {
    //     if (!window.history.pushState) { return false }
    //
    //     const href = this.getHref(element)
    //
    //     // User
    //     if (!element || !href) { return false }
    //
    //     // Middle click, cmd click, and ctrl click
    //     if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) { return false }
    //
    //     // Ignore target with _blank target
    //     if (element.target && element.target === '_blank') { return false }
    //
    //     // Check if it's the same domain
    //     if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) { return false }
    //
    //     // Check if the port is the same
    //     if (Utils.getPort() !== Utils.getPort(element.port)) { return false }
    //
    //     // Ignore case when a hash is being tacked on the current URL
    //     // if (href.indexOf('#') > -1)
    //     //   return false;
    //
    //     // Ignore case where there is download attribute
    //     if (element.getAttribute && typeof element.getAttribute('download') === 'string') { return false }
    //
    //     // In case you're trying to load the same page
    //     if (Utils.cleanLink(href) === Utils.cleanLink(window.location.href)) { return false }
    //
    //     return !element.classList.contains(this.options.noAjaxLinkClass)
    // }
    //
    // /**
    //  * @param e Event
    //  */
    // onLinkClick (e) {
    //     let el = e.target
    //
    //     // Go up in the nodelist until we
    //     // find something with an href
    //     while (el && !this.getHref(el)) {
    //         el = el.parentNode
    //     }
    //
    //     if (this.preventCheck(e, el)) {
    //         e.stopPropagation()
    //         e.preventDefault()
    //
    //         this.lastElementClicked = el
    //         this.linkHash = el.hash.split('#')[1]
    //
    //         const href = this.getHref(el)
    //         this.goTo(href)
    //     }
    //
    //     // const linkClassName = e.currentTarget.className
    //     // const linkHref = e.currentTarget.href
    //     //
    //     // if (linkHref.indexOf('mailto:') === -1 &&
    //     //     linkClassName.indexOf(this.options.noAjaxLinkClass) === -1) {
    //     //     e.preventDefault()
    //     //     // Check if link is not active
    //     //     if (this.isNotCurrentPageLink(e.currentTarget)) {
    //     //         this.transition = true
    //     //
    //     //         this.previousState = Object.assign({}, this.state)
    //     //         this.state = new State(this, e.currentTarget, {
    //     //             previousType: this.page.type,
    //     //             previousName: this.page.name,
    //     //             navLinkClass: this.options.navLinkClass,
    //     //             previousHref: window.location.href,
    //     //             transitionName: $(e.currentTarget).data('transition')
    //     //         })
    //     //         this.statesStack.push(this.state)
    //     //
    //     //         if (window.history.pushState) {
    //     //             window.history.pushState(this.state, this.state.title, this.state.href)
    //     //         }
    //     //         this.loadPage(this.state)
    //     //     } else {
    //     //         log.debug('⛔️ Same page requested… do nothing.')
    //     //     }
    //     // }
    // }
    //
    // goTo (url) {
    //     window.history.pushState(null, null, url)
    //     this.onPopState()
    // }
    //
    // /**
    //  * Check if current target link is pointing to the same page resource.
    //  *
    //  * @param currentTarget
    //  * @return {boolean}
    //  */
    // isNotCurrentPageLink (currentTarget) {
    //     const linkClassName = currentTarget.className
    //     return linkClassName.indexOf(this.options.activeClass) === -1 && !this.transition
    // }
    //
    // /**
    //  * Perform a AJAX load for an History event.
    //  *
    //  * @param state
    //  * @private
    //  */
    // loadPage (state) {
    //     if (this.currentRequest && this.currentRequest.readyState !== 4) {
    //         this.currentRequest.abort()
    //     }
    //     this.loader.show()
    //     this.loadBeginDate = new Date()
    //
    //     Events.commit(BEFORE_PAGE_LOAD, state)
    //
    //     this.transitionFactory.getTransition(this.previousState, state, this.direction)
    //         .init(this.page, this.doPageLoad(state))
    //         .then(() => {
    //             this.pageLoaded()
    //             this.destroyPreviousPage()
    //         })
    // }
    //
    // /**
    //  * Actually load the state url resource.
    //  *
    //  * @param  {State} state
    //  * @private
    //  */
    // doPageLoad (state) {
    //     return new Promise((resolve) => {
    //         if (this.options.useCache && this.cacheProvider.exists(state.href)) {
    //             log.debug('📎 Use cache-provider for: ' + state.href)
    //             resolve(this._onDataLoaded(this.cacheProvider.fetch(state.href), state))
    //         } else {
    //             this.currentRequest = $.ajax({
    //                 url: state.href,
    //                 dataType: 'html',
    //                 headers: {
    //                     // Send header to allow backends to
    //                     // send partial response for saving
    //                     // bandwidth and process time
    //                     'X-Allow-Partial': 1
    //                 },
    //                 // Need to disable cache to prevent
    //                 // browser to serve partial when no
    //                 // ajax context is defined.
    //                 cache: false,
    //                 type: 'get',
    //                 success: (data) => {
    //                     if (this.options.useCache) {
    //                         this.cacheProvider.save(state.href, data)
    //                     }
    //                     resolve(this._onDataLoaded(data, state))
    //                 }
    //             })
    //         }
    //     })
    // }
    //
    // /**
    //  * Extract new page content from a complete HTML
    //  * page or a partial HTML response.
    //  *
    //  * @param data
    //  * @return {*}
    //  */
    // extractPageContainer (data) {
    //     const $response = $($.parseHTML(data.trim()))
    //     if ($response.hasClass(this.options.pageClass)) {
    //         return $response
    //     } else {
    //         return $response.find('.' + this.options.pageClass)
    //     }
    // }
    //
    // /**
    //  * @private
    //  * @param {Object} data jQuery AJAX response
    //  * @param {State} state
    //  */
    // _onDataLoaded (data, state) {
    //     // Extract only to new page content
    //     // if the whole HTML is queried
    //     let $data = this.extractPageContainer(data)
    //
    //     /*
    //      * Display data to DOM
    //      */
    //     $data.css('visibility', 'hidden')
    //     this.options.$ajaxContainer.append($data)
    //
    //     Events.commit(AFTER_DOM_APPENDED, $data)
    //
    //     /*
    //      * Push a copy object not to set it as null.
    //      */
    //     this.formerPages.push(this.page)
    //
    //     // Init new page
    //     this.updatePageTitle($data)
    //     this.boot($data, 'ajax', state.isHome)
    //
    //     return this.page
    // }
    //
    // /**
    //  * Update page title against data-title attribute
    //  * from ajax loaded partial DOM.
    //  *
    //  * @param {jQuery} $data
    //  */
    // updatePageTitle ($data) {
    //     if ($data.length && $data.attr('data-meta-title') !== '') {
    //         let metaTitle = $data.attr('data-meta-title')
    //         if (metaTitle !== null && metaTitle !== '') document.title = metaTitle
    //     }
    // }
    //
    // /**
    //  * Send a GA page view event when context is AJAX.
    //  */
    // trackGoogleAnalytics (event) {
    //     if (event && event.detail.context === 'ajax') {
    //         if (typeof ga !== 'undefined') {
    //             log.debug('🚩 Push Analytics for: ' + window.location.pathname)
    //             window.ga('send', 'pageview', {'page': window.location.pathname, 'title': document.title})
    //         }
    //     }
    // }
}
