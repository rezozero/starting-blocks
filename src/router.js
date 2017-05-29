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
 * @file router.js
 * @author Ambroise Maupate
 */
import $ from "jquery";
import isMobile from "ismobilejs";
import log from "loglevel";
import Utils from "./utils/utils";
import State from "./state";
import CacheProvider from "./cache-provider";
import Events from "./events";
import {
    BEFORE_PAGE_LOAD,
    AFTER_PAGE_LOAD,
    AFTER_DOM_APPENDED,
    AFTER_PAGE_BOOT
} from "./event-types";
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
     * | `postLoad` | `(state, data) => {}` |
     * | `preLoad` | `(state) => {}` |
     * | `preLoadPageDelay` |  |
     * | `prePushState` | `(state) => {}` |
     * | `onDestroy` | `() => {}` |
     * | `preBoot` | `($cont, context, isHome) => {}` |
     *
     *
     * @param {Object} options
     * @param {ClassFactory} classFactory
     * @param {String} baseUrl
     * @param {GraphicLoader} loader
     * @param {AbstractNav} nav
     */
    constructor(options, classFactory, baseUrl, loader, nav, transitionFactory) {
        if (!baseUrl) {
            throw "Router needs baseUrl to be defined.";
        }
        if (!loader) {
            throw "Router needs a GraphicLoader instance to be defined.";
        }
        if (!classFactory) {
            throw "Router needs a ClassFactory instance to be defined.";
        }
        if (!nav) {
            throw "Router needs a Nav instance to be defined.";
        }
        if (!transitionFactory) {
            throw "Router needs a Transition Factory instance to be defined.";
        }

        /**
         * @type {ClassFactory}
         */
        this.classFactory = classFactory;
        /**
         * @type {String}
         */
        this.baseUrl = baseUrl;
        /**
         * @type {GraphicLoader}
         */
        this.loader = loader;
        /**
         * @type {AbstractNav}
         */
        this.nav = nav;
        this.nav.router = this;
        /**
         * @type {TransitionFactory}
         */
        this.transitionFactory = transitionFactory
        /**
         * @type {State|null}
         */
        this.state = null;
        /**
         * @type {Array}
         */
        this.formerPages = [];
        /**
         * @type {null}
         */
        this.page = null;
        this.stateBlock = true;
        this.transition = false;
        this.loading = false;
        this.historyIndex = 0
        this.history = []
        this.$window = $(window);
        this.$body = $('body');

        this.deviceType = (isMobile.any === false) ? 'desktop' : 'mobile';
        Utils.addClass(this.$body[0],'is-'+this.deviceType);

        /**
         * @deprecated use this.$window instead
         */
        this.window = this.$window;
        this.currentRequest = null;
        this.cacheProvider = new CacheProvider();

        /**
         * @type {Object}
         */
        this.options = {
            homeHasClass: false,
            ajaxEnabled: true,
            pageClass: "page-content",
            objectTypeAttr: "data-node-type",
            ajaxLinkTypeAttr: "data-node-type",
            noAjaxLinkClass: "no-ajax-link",
            navLinkClass: "nav-link",
            activeClass: "active",
            pageBlockClass: ".page-block",
            lazyloadEnabled: false,
            lazyloadSrcAttr: 'data-src',
            lazyloadClass: 'lazyload',
            lazyloadSrcSetAttr: 'data-srcset',
            lazyloadThreshold: 300,
            lazyloadThrottle: 150,
            $ajaxContainer: $("#ajax-container"),
            minLoadDuration: 0,
            preLoadPageDelay: 0,
            useCache: true,
            postLoad: (state, data) => {},
            preLoad: (state) => {},
            prePushState: (state) => {},
            onDestroy: () => {},
            preBoot: ($cont, context, isHome) => {}
        };

        if (options !== null) {
            this.options = $.extend(this.options, options);
        }
    }

    destroy() {
        if (this.options.ajaxEnabled) {
            window.removeEventListener("popstate", this.onPopState.bind(this), false);
        }
        const onDestroyBinded = this.options.onDestroy.bind(this);
        onDestroyBinded();
    }

    /**
     * Initialize Router events.
     */
    initEvents() {
        if (this.options.ajaxEnabled) {
            window.addEventListener("popstate", this.onPopState.bind(this), false);
            window.addEventListener(AFTER_PAGE_BOOT, this.trackGoogleAnalytics.bind(this), false);
        }
        /*
         * Init nav events
         */
        this.nav.initEvents(this);
    }
    /**
     * @private
     * @param  {Event} event
     * @return
     */
    onPopState(event) {
        if (typeof event.state !== "undefined" && event.state !== null) {
            this.previousState = this.state

            console.log(this.history)
            console.log(event.state)

            let newHistoryIndex = this.history.findIndex(history => history.uid === event.state.uid)

            console.log(newHistoryIndex)
            console.log(newHistoryIndex - this.historyIndex)

            this.historyIndex = newHistoryIndex

            // console.log(this.history.findIndex(history => history.uid === event.state.uid))

            // console.log(this.previousState.uid, event.state.uid)

            this.transition = true;
            this.loadPage(event, event.state);
        }
    }

    /**
     * Booting need a jQuery handler for the jQuery container.
     *
     * Call this method in your `main.js` or app entry point **after** creating
     * the router and calling `initEvents` method.
     *
     * @param  {jQuery}  $cont The jQuery DOM element to boot in.
     * @param  {String}  context ["static" or custom string]
     * @param  {Boolean} isHome
     */
    boot($cont, context, isHome) {
        if (context === 'static') {
            this.loadBeginDate = new Date();
        }
        const preBootBinded = this.options.preBoot.bind(this);
        preBootBinded($cont, context, isHome);

        /*
         * Replace current state
         * for first request
         */
        if (null === this.state) {
            this.state = new State(this, null);
            this.history.push(this.state)
            this.historyIndex = this.history.length - 1
            window.history.replaceState(this.state, null, null);
        }

        const nodeType = $cont.attr(this.options.objectTypeAttr);
        this.page = this.classFactory.getPageInstance(nodeType, this, $cont, context, nodeType, isHome);

        if (context === 'ajax') {
            this.state.update(this.page);
        }

        Events.commit(AFTER_PAGE_BOOT, this.page);
    }

    /**
     * @param e Event
     */
    onLinkClick(e) {
        const linkClassName = e.currentTarget.className,
              linkHref = e.currentTarget.href;

        if (linkHref.indexOf('mailto:') === -1 &&
            linkClassName.indexOf(this.options.noAjaxLinkClass) === -1) {
            e.preventDefault();
            // Check if link is not active
            if(this.isNotCurrentPageLink(e.currentTarget)) {
                this.transition = true;

                this.previousState = Object.assign({}, this.state)
                this.state = new State(this, e.currentTarget, {
                    previousType: this.page.type,
                    previousName: this.page.name,
                    navLinkClass: this.options.navLinkClass,
                    previousHref: window.location.href,
                    transitionName: $(e.currentTarget).data('transition')
                });
                this.history.push(this.state)
                this.historyIndex = this.history.length - 1

                const prePushStateBinded = this.options.prePushState.bind(this);
                prePushStateBinded(this.state);

                if (window.history.pushState) {
                    window.history.pushState(this.state, this.state.title, this.state.href);
                }
                this.loadPage(e, this.state);
            } else {
                log.debug('⛔️ Same page requested… do nothing.');
            }
        }
    }

    /**
     * Check if current target link is pointing to the same page resource.
     *
     * @param currentTarget
     * @return {boolean}
     */
    isNotCurrentPageLink(currentTarget) {
        const linkClassName = currentTarget.className;
        return linkClassName.indexOf(this.options.activeClass) === -1 && !this.transition;
    }

    /**
     * Perform a AJAX load for an History event.
     *
     * @param event
     * @param state
     * @private
     */
    loadPage(event, state) {
        if(this.currentRequest && this.currentRequest.readyState !== 4) {
            this.currentRequest.abort();
        }
        this.loader.show();
        this.loadBeginDate = new Date();

        const preLoadBinded = this.options.preLoad.bind(this);
        preLoadBinded(state);

        Events.commit(BEFORE_PAGE_LOAD, state);

        this.transitionFactory.getTransition(this.previousState, state)
            .init(this.page.$cont, this.doPageLoad(state))
            .then(() => {
                // console.log('fin de transition')
            })

        // setTimeout(this.doPageLoad.bind(this, state), this.options.preLoadPageDelay);
    }
    /**
     * Actually load the state url resource.
     *
     * @param  {State} state
     * @private
     */
    doPageLoad(state) {
        return new Promise((resolve) => {
            if (this.options.useCache && this.cacheProvider.exists(state.href)) {
                log.debug('📎 Use cache-provider for: ' + state.href);
                resolve(this._onDataLoaded(this.cacheProvider.fetch(state.href), state));
            } else {
                this.currentRequest = $.ajax({
                    url: state.href,
                    dataType: "html",
                    headers: {
                        // Send header to allow backends to
                        // send partial response for saving
                        // bandwidth and process time
                        'X-Allow-Partial' : 1
                    },
                    // Need to disable cache to prevent
                    // browser to serve partial when no
                    // ajax context is defined.
                    cache: false,
                    type: 'get',
                    success: (data) => {
                        if (this.options.useCache) {
                            this.cacheProvider.save(state.href, data);
                        }
                        resolve(this._onDataLoaded(data, state));
                    }
                });
            }
        })
    }

    /**
     * Extract new page content from a complete HTML
     * page or a partial HTML response.
     *
     * @param data
     * @return {*}
     */
    extractPageContainer(data) {
        const $response = $($.parseHTML(data.trim()));
        if ($response.hasClass(this.options.pageClass)) {
            return $response;
        } else {
            return $response.find('.' + this.options.pageClass);
        }
    }

    /**
     * @private
     * @param {Object} data jQuery AJAX response
     * @param {State} state
     */
    _onDataLoaded(data, state) {
        // Extract only to new page content
        // if the whole HTML is queried
        let $data = this.extractPageContainer(data);

        Events.commit(AFTER_PAGE_LOAD, $data);

        /*
         * Display data to DOM
         */
        $data.css('visibility', 'hidden');
        this.options.$ajaxContainer.append($data);

        Events.commit(AFTER_DOM_APPENDED, $data);

        /*
         * Push a copy object not to set it as null.
         */
        this.formerPages.push(this.page);

        // Init new page
        this.updatePageTitle($data);
        this.boot($data, 'ajax', state.isHome);

        const postLoadBinded = this.options.postLoad.bind(this);
        postLoadBinded(state, $data);

        return $data;
    }

    /**
     * Update page title against data-title attribute
     * from ajax loaded partial DOM.
     *
     * @param {jQuery} $data
     */
    updatePageTitle($data){
        if ($data.length && $data.attr('data-meta-title') !== '') {
            let metaTitle = $data.attr('data-meta-title');
            if(metaTitle !== null && metaTitle !== '') document.title = metaTitle;
        }
    }

    /**
     * Send a GA page view event when context is AJAX.
     */
    trackGoogleAnalytics(event) {
        if (event && event.detail.context === 'ajax') {
            if(typeof ga !== "undefined") {
                log.debug('🚩 Push Analytics for: ' + window.location.pathname);
                ga('send', 'pageview', {'page': window.location.pathname, 'title':document.title});
            }
        }
    }
}
