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
import State from "state";
import Home from "pages/home";
import AbstractPage from "abstract-page";
import $ from "jquery";

export default class Router {
    constructor(options, routes, baseUrl) {
        this.baseUrl = baseUrl;
        this.routes = routes;
        this.state = null;
        this.formerPages = [];
        this.page = null;
        this.stateBlock = true;
        this.ajaxEnabled = true;
        this.transition = false;
        this.loading = false;
        this.window = $(window);
        this.currentRequest = null;
        this.options = {
            homeHasClass: false,
            ajaxEnabled: true,
            pageClass: "page-content",
            noAjaxLinkClass: "no-ajax-link",
            navLinkClass: "nav-link",
            activeClass: "active",
            pageBlockClass: ".page-block",
            $ajaxContainer: $("#ajax-container"),
            $loading: $("#loading"),
            minLoadDuration: 0,
            postLoad: function (state, data) {},
            preLoad: function (state) {},
            prePushState: function (state) {},
            onDestroy: function () {},
        };

        if (options !== null) {
            this.options = $.extend(this.options, options);
        }
    }

    destroy() {
        if (this.options.ajaxEnabled) {
            window.removeEventListener("popstate", $.proxy(this.onPopState, this), false);
        }

        this.options.onDestroy();
    }

    initEvents() {
        if (this.options.ajaxEnabled) {
            window.addEventListener("popstate", $.proxy(this.onPopState, this), false);
        }
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
     * @param  {jQuery}  $data
     * @param  {String}  context
     * @param  {Boolean} isHome
     */
    boot($cont, context, isHome) {
        if(context == 'static') {
            this.loadBeginDate = new Date();
        }
        var nodeType = $cont.attr('data-node-type');

        if(isHome && this.options.homeHasClass){
            this.page = new Home(this, $cont, context, nodeType, isHome);
        } else if(nodeType && typeof this.routes[nodeType] !== 'undefined') {
            this.page = new this.routes[nodeType](this, $cont, context, nodeType, isHome);
        } else {
            this.page = new AbstractPage(this, $cont, context, nodeType, isHome);
        }
    }

    onLinkClick(e) {
        var linkClassName = e.currentTarget.className,
            linkHref = e.currentTarget.href;

        if(linkHref.indexOf('mailto:') == -1) {
            e.preventDefault();

            // Check if link is not active
            if(linkClassName.indexOf(this.options.activeClass) == -1 &&
               linkClassName.indexOf(this.options.noAjaxLinkClass) == -1 &&
               !this.transition) {
                this.transition = true;

                var state = new State(e.currentTarget, {
                    previousType: this.page.type,
                    navLinkClass: this.options.navLinkClass,
                });

                history.pushState(state, state.title, state.href);
                this.loadPage(e, state);
            }
        }
    }

    loadPage(e, state) {
        if(this.currentRequest && this.currentRequest.readyState != 4) {
            this.currentRequest.abort();
        }

        this.loadBeginDate = new Date();

        var proxiedPreLoad = $.proxy(this.options.preLoad, this);
        proxiedPreLoad(state);

        var _this = this;
        this.currentRequest = $.ajax({
            url: state.href,
            dataType: "html",
            // Need to disable cache to prevent
            // browser to serve partial when no
            // ajax context is defined.
            cache: false,
            type: 'get',
            success: function(data){
                // Extract only to new page content
                // if the whole HTML is queried
                var $data = null;
                var $response = $($.parseHTML(data));
                if ($response.hasClass(_this.options.pageClass)) {
                    $data = $response;
                } else {
                    $data = $response.find('.' + _this.options.pageClass);
                }
                /*
                 * Display data to DOM
                 */
                _this.options.$ajaxContainer.append($data);

                /*
                 * Push a copy object not to set it as null.
                 */
                _this.formerPages.push(_this.page);

                // Init new page
                _this.updatePageTitle($data);
                _this.boot($data, 'ajax', state.isHome);

                var proxiedPostLoad = $.proxy(_this.options.postLoad, _this);
                proxiedPostLoad(state, $data);

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
     * @param  jQuery $data
     */
    updatePageTitle($data){
        if($data.length && $data[0].getAttribute('data-meta-title') !== ''){
            var metaTitle = $data[0].getAttribute('data-meta-title');
            if(metaTitle !== null && metaTitle !== '') document.title = metaTitle;
        }
    }

    pushFirstState(isHome){
        history.pushState({
            'firstPage': true,
            'href':  window.location.href,
            'isHome':isHome
        }, null, window.location.href);
    }
}
