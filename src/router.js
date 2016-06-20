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
import {State} from "state";
import {Home} from "pages/home";

export class Router {
    /**
     * Create a new Router.
     *
     * Default options list:
     *
     * * homeHasClass: false,
     * * ajaxEnabled: true,
     * * pageClass: "page-content",
     * * noAjaxLinkClass: "no-ajax-link",
     * * navLinkClass: "nav-link",
     * * activeClass: "active",
     * * pageBlockClass: ".page-block",
     * * $ajaxContainer: $("#ajax-container"),
     * * minLoadDuration: 0,
     * * postLoad: (state, data) => {},
     * * preLoad: (state) => {},
     * * prePushState: (state) => {},
     * * onDestroy: () => {},
     * * preBoot: ($cont, context, isHome) => {},
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
        this.ajaxEnabled = true;
        this.transition = false;
        this.loading = false;
        this.$window = $(window);
        this.currentRequest = null;
        /**
         * @type {Object}
         */
        this.options = {
            homeHasClass: false,
            ajaxEnabled: true,
            pageClass: "page-content",
            noAjaxLinkClass: "no-ajax-link",
            navLinkClass: "nav-link",
            activeClass: "active",
            pageBlockClass: ".page-block",
            $ajaxContainer: $("#ajax-container"),
            minLoadDuration: 0,
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

    initEvents() {
        if (this.options.ajaxEnabled) {
            window.addEventListener("popstate", this.onPopState.bind(this), false);
        }
        /*
         * Init nav events
         */
        this.nav.initEvents(this);
    }

    onPopState(event) {
        if (typeof event.state !== "undefined" && event.state !== null) {
            this.transition = true;
            this.loadPage(event, event.state);
        }
    }

    /**
     * Booting need a jQuery handler for
     * the container.
     *
     * @param  {jQuery}  $cont
     * @param  {String}  context
     * @param  {Boolean} isHome
     */
    boot($cont, context, isHome) {
        if(context == 'static') {
            this.loadBeginDate = new Date();
        }
        const preBootBinded = this.options.preBoot.bind(this);
        preBootBinded($cont, context, isHome);

        const nodeType = $cont.attr('data-node-type');

        if(isHome && this.options.homeHasClass){
            this.page = new Home(this, $cont, context, nodeType, isHome);
        } else {
            this.page = this.classFactory.getPageInstance(nodeType, this, $cont, context, nodeType, isHome);
        }
    }

    /**
     *
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

                const state = new State(e.currentTarget, {
                    previousType: this.page.type,
                    navLinkClass: this.options.navLinkClass
                });

                const prePushStateBinded = this.options.prePushState.bind(this);
                prePushStateBinded(state);

                if (history.pushState) {
                    history.pushState(state, state.title, state.href);
                }
                this.loadPage(e, state);
            }
        }
    }

    /**
     *
     * @param e
     * @param state
     */
    loadPage(e, state) {
        if(this.currentRequest && this.currentRequest.readyState != 4) {
            this.currentRequest.abort();
        }
        this.loader.show();
        this.loadBeginDate = new Date();

        const preLoadBinded = this.options.preLoad.bind(this);
        preLoadBinded(state);

        this.currentRequest = $.ajax({
            url: state.href,
            dataType: "html",
            // Need to disable cache to prevent
            // browser to serve partial when no
            // ajax context is defined.
            cache: false,
            type: 'get',
            success: (data) => {
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
                    ga('send', 'pageview', {'page':state.href, 'title':document.title});
                }
            }
        });
    }

    /**
     * Update page title against data-title attribute
     * from ajax loaded partial DOM.
     *
     * @param {jQuery} $data
     */
    updatePageTitle($data){
        if($data.length && $data.attr('data-meta-title') !== ''){
            let metaTitle = $data.attr('data-meta-title');
            if(metaTitle !== null && metaTitle !== '') document.title = metaTitle;
        }
    }

    /**
     *
     * @param {boolean} isHome
     */
    pushFirstState(isHome){
        if (history.pushState) {
            history.pushState({
                'firstPage': true,
                'href':  window.location.href,
                'isHome':isHome
            }, null, window.location.href);
        }
    }
}
