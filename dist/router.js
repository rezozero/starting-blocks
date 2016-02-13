"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Router = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
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


var _state = require("state.js");

var _home = require("pages/home.js");

var _abstractPage = require("abstract-page.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
    function Router(options, routes, baseUrl) {
        _classCallCheck(this, Router);

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
            postLoad: function postLoad(state, data) {},
            preLoad: function preLoad(state) {},
            prePushState: function prePushState(state) {},
            onDestroy: function onDestroy() {}
        };

        if (options !== null) {
            this.options = $.extend(this.options, options);
        }
    }

    _createClass(Router, [{
        key: "destroy",
        value: function destroy() {
            if (this.options.ajaxEnabled) {
                window.removeEventListener("popstate", $.proxy(_this.onPopState, this), false);
            }

            this.options.onDestroy();
        }
    }, {
        key: "initEvents",
        value: function initEvents() {
            if (this.options.ajaxEnabled) {
                window.addEventListener("popstate", $.proxy(_this.onPopState, this), false);
            }
        }
    }, {
        key: "onPopState",
        value: function onPopState(event) {
            if (typeof event.state !== "undefined" && evente.state !== null) {
                _this.transition = true;
                _this.loadPage(event, event.state);
            }
        }
    }, {
        key: "boot",
        value: function boot(nodeType, id, context, isHome) {
            if (context == 'static') {
                this.loadBeginDate = new Date();
            }

            if (isHome && _this.options.homeHasClass) {
                this.page = new _home.Home(this, id, context, nodeType, isHome);
            } else if (nodeType && typeof this.routes[nodeType] !== 'undefined') {
                this.page = new window[this.routes[nodeType]](this, id, context, nodeType, isHome);
            } else {
                this.page = new _abstractPage.AbstractPage(this, id, context, nodeType, isHome);
            }
        }
    }, {
        key: "onLinkClick",
        value: function onLinkClick(e) {
            var linkClassName = e.currentTarget.className,
                linkHref = e.currentTarget.href;

            if (linkHref.indexOf('mailto:') == -1) {
                e.preventDefault();

                // Check if link is not active
                if (linkClassName.indexOf(this.options.activeClass) == -1 && linkClassName.indexOf(this.options.noAjaxLinkClass) == -1 && !this.transition) {

                    this.transition = true;

                    var state = new _state.State(e.currentTarget, {
                        previousType: this.page.type,
                        navLinkClass: this.options.navLinkClass
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
    }, {
        key: "loadPage",
        value: function loadPage(e, state) {
            if (this.currentRequest && this.currentRequest.readyState != 4) {
                this.currentRequest.abort();
            }

            this.loadBeginDate = new Date();
            this.options.preLoad(state);

            this.currentRequest = $.ajax({
                url: state.href,
                type: 'get',
                success: function success(data) {
                    if (this.url == history.state.href) {
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
                        if (typeof ga !== "undefined") {
                            ga('send', 'pageview', { 'page': state.href, 'title': document.title });
                        }
                    }
                }
            });
        }
    }]);

    return Router;
}();

exports.Router = Router;
//# sourceMappingURL=router.js.map
