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
import {State} from "state.js";
import {Home} from "pages/home.js";
import {AbstractPage} from "abstract-page.js";

class Router {
    constructor(options, routes, baseUrl) {
        this.baseUrl = baseUrl;
        this.routes = routes;
        this.state = null;
        this.formerPages = [];
        this.page = null;
        this.stateBlock = true;
        this.ajaxEnabled = true;
        this.transition = false;
        this.currentRequest = null;
        this.options = {
            homeHasClass: false,
            ajaxEnabled: true,
            noAjaxLinkClass: "no-ajax-link",
            navLinkClass: "nav-link",
            activeClass: "active",
            $ajaxContainer: $("#ajax-container"),
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
            window.removeEventListener("popstate", $.proxy(_this.onPopState, this), false);
        }

        this.options.onDestroy();
    }

    initEvents() {
        if (this.options.ajaxEnabled) {
            window.addEventListener("popstate", $.proxy(_this.onPopState, this), false);
        }
    }

    onPopState(event) {
        if (typeof event.state !== "undefined" && evente.state !== null) {
            _this.transition = true;
            _this.loadPage(event, event.state);
        }
    }

    boot(nodeType, id, context, isHome) {
        if(context == 'static') {
            this.loadBeginDate = new Date();
        }

        if(isHome && _this.options.homeHasClass){
            this.page = new Home(this, id, context, nodeType, isHome);
        } else if(nodeType && typeof this.routes[nodeType] !== 'undefined') {
            this.page = new window[this.routes[nodeType]](this, id, context, nodeType, isHome);
        } else {
            this.page = new AbstractPage(this, id, context, nodeType, isHome);
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
                /*
                 * Hook prePushState method
                 * to be able to modify state
                 */
                this.options.prePushState(state);

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
        this.options.preLoad(state);

        this.currentRequest = $.ajax({
            url: state.href,
            type: 'get',
            success: function(data){
                if(this.url == history.state.href) {
                    /*
                     * Display data to DOM
                     */
                    this.options.$ajaxContainer.append(data);

                    /*
                     * Push a copy object not to set it as null.
                     */
                    this.formerPages.push(this.page);

                    // Init new page
                    this.boot(state.nodeType, state.nodeName, 'ajax', state.isHome);

                    this.options.postLoad(state, data);

                    // Analytics
                    if(typeof ga !== "undefined") {
                        ga('send', 'pageview', {'page':state.href, 'title':document.title});
                    }
                }
            }
        });
    }
}

export {Router};