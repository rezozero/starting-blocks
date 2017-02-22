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

export default class Router {
    /**
     * Create a new Router.
     *
     * Default options list:
     *
     * * `homeHasClass`: false,
     * * `ajaxEnabled`: true,
     * * `pageClass`: "page-content", (Without point!)
     * * `objectTypeAttr`: "data-node-type",
     * * `ajaxLinkTypeAttr` : "data-node-type"
     * * `noAjaxLinkClass`: "no-ajax-link",
     * * `navLinkClass`: "nav-link",
     * * `activeClass`: "active",
     * * `useCache`: true,
     * * `pageBlockClass`: ".page-block", (With point!)
     * * `$ajaxContainer`: $("#ajax-container"),
     * * `lazyloadEnabled`: false,
     * * `lazyloadSrcAttr`: 'data-src',
     * * `lazyloadClass`: 'lazyload',
     * * `lazyloadSrcSetAttr`: 'data-src-set',
     * * `minLoadDuration`: 0,
     * * `postLoad`: (state, data) => {},
     * * `preLoad`: (state) => {},
     * * `preLoadPageDelay`: 0
     * * `prePushState`: (state) => {},
     * * `onDestroy`: () => {},
     * * `preBoot`: ($cont, context, isHome) => {},
     *
     *
     * @param {Object} options
     * @param {ClassFactory} classFactory
     * @param {String} baseUrl
     * @param {GraphicLoader} loader
     * @param {AbstractNav} nav
     */
    constructor(options, classFactory, baseUrl, loader, nav) {
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
            lazyloadSrcSetAttr: 'data-src-set',
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
     *
     */
    initEvents() {
        if (this.options.ajaxEnabled) {
            window.addEventListener("popstate", this.onPopState.bind(this), false);
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
        if(context == 'static') {
            this.loadBeginDate = new Date();
        }
        const preBootBinded = this.options.preBoot.bind(this);
        preBootBinded($cont, context, isHome);

        const nodeType = $cont.attr(this.options.objectTypeAttr);

        this.page = this.classFactory.getPageInstance(nodeType, this, $cont, context, nodeType, isHome);

        if(context == 'ajax') this.state.update(this.page);
    }

    /**
     * @private
     * @param e Event
     */
    onLinkClick(e) {
        const linkClassName = e.currentTarget.className,
            linkHref = e.currentTarget.href;

        if(linkHref.indexOf('mailto:') == -1) {
            e.preventDefault();

            // Check if link is not active
            if(linkClassName.indexOf(this.options.activeClass) == -1 &&
               linkClassName.indexOf(this.options.noAjaxLinkClass) == -1 &&
               !this.transition) {
                this.transition = true;

                this.state = new State(this, e.currentTarget, {
                    previousType: this.page.type,
                    previousName: this.page.name,
                    navLinkClass: this.options.navLinkClass,
                    previousHref: window.location.href
                });

                const prePushStateBinded = this.options.prePushState.bind(this);
                prePushStateBinded(this.state);

                if (history.pushState) {
                    history.pushState(this.state, this.state.title, this.state.href);
                }
                this.loadPage(e, this.state);
            }
        }
    }

    /**
     * Perform a AJAX load for an History event.
     *
     * @param e
     * @param state
     * @private
     */
    loadPage(e, state) {
        if(this.currentRequest && this.currentRequest.readyState != 4) {
            this.currentRequest.abort();
        }
        this.loader.show();
        this.loadBeginDate = new Date();

        const preLoadBinded = this.options.preLoad.bind(this);
        preLoadBinded(state);

        setTimeout(this.doPageLoad.bind(this, state), this.options.preLoadPageDelay);
    }
    /**
     * Actually load the state url resource.
     *
     * @param  {State} state
     */
    doPageLoad(state) {
        if (this.options.useCache && this.cacheProvider.exists(state.href)) {
            log.debug('📎 Use cache-provider for: ' + state.href);
            this._onDataLoaded(this.cacheProvider.fetch(state.href), state);
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
                    this._onDataLoaded(data, state);
                }
            });
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
        let $data = null;
        const $response = $($.parseHTML(data.trim()));
        if ($response.hasClass(this.options.pageClass)) {
            $data = $response;
        } else {
            $data = $response.find('.' + this.options.pageClass);
        }

        /*
         * Display data to DOM
         */
        this.options.$ajaxContainer.append($data);

        /*
         * Push a copy object not to set it as null.
         */
        this.formerPages.push(this.page);

        // Init new page
        this.updatePageTitle($data);
        this.boot($data, 'ajax', state.isHome);

        const postLoadBinded = this.options.postLoad.bind(this);
        postLoadBinded(state, $data);

        // Analytics
        if(typeof ga !== "undefined") {
            log.debug('🚩 Push Analytics for: ' + window.location.pathname);
            ga('send', 'pageview', {'page': window.location.pathname, 'title':document.title});
        }
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
     * @param {boolean} isHome
     * @param {string} type
     * @param {string} name
     */
    pushFirstState(isHome, type, name){
        if (history.pushState) {
            history.pushState({
                'firstPage': true,
                'href':  window.location.href,
                'isHome':isHome,
                'nodeType':type,
                'nodeName':name
            }, document.title, window.location.href);
        }
    }
}
