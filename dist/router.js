define(["exports", "jquery", "state", "pages/home", "abstract-page", "graphicLoader", "nav"], function (exports, _jquery, _state, _home, _abstractPage, _graphicLoader, _nav) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Router = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Router = exports.Router = function () {

        /**
         * Create a new Router.
         *
         * @param {Object} options
         * @param {Object} routes
         * @param {String} baseUrl
         * @param {GraphicLoader} loader
         * @param {Nav} nav
         */

        function Router(options, routes, baseUrl, loader, nav) {
            _classCallCheck(this, Router);

            if (!baseUrl) {
                throw "Router needs baseUrl to be defined.";
            }
            if (!loader) {
                throw "Router needs a GraphicLoader instance to be defined.";
            }
            if (!(loader instanceof _graphicLoader.GraphicLoader)) {
                throw "'loader' must be an instance of GraphicLoader.";
            }

            if (!nav) {
                throw "Router needs a Nav instance to be defined.";
            }
            if (!(nav instanceof _nav.Nav)) {
                throw "'nav' must be an instance of Nav.";
            }

            this.baseUrl = baseUrl;
            this.routes = routes;
            this.loader = loader;
            this.nav = nav;
            this.state = null;
            this.formerPages = [];
            this.page = null;
            this.stateBlock = true;
            this.ajaxEnabled = true;
            this.transition = false;
            this.loading = false;
            this.window = (0, _jquery2.default)(window);
            this.currentRequest = null;
            this.options = {
                homeHasClass: false,
                ajaxEnabled: true,
                pageClass: "page-content",
                noAjaxLinkClass: "no-ajax-link",
                navLinkClass: "nav-link",
                activeClass: "active",
                pageBlockClass: ".page-block",
                $ajaxContainer: (0, _jquery2.default)("#ajax-container"),
                minLoadDuration: 0,
                postLoad: function postLoad(state, data) {},
                preLoad: function preLoad(state) {},
                prePushState: function prePushState(state) {},
                onDestroy: function onDestroy() {}
            };

            if (options !== null) {
                this.options = _jquery2.default.extend(this.options, options);
            }
        }

        _createClass(Router, [{
            key: "destroy",
            value: function destroy() {
                if (this.options.ajaxEnabled) {
                    window.removeEventListener("popstate", _jquery2.default.proxy(this.onPopState, this), false);
                }

                this.options.onDestroy();
            }
        }, {
            key: "initEvents",
            value: function initEvents() {
                if (this.options.ajaxEnabled) {
                    window.addEventListener("popstate", _jquery2.default.proxy(this.onPopState, this), false);
                }
                /*
                 * Init nav events
                 */
                this.nav.initEvents(this);
            }
        }, {
            key: "onPopState",
            value: function onPopState(event) {
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

        }, {
            key: "boot",
            value: function boot($cont, context, isHome) {
                if (context == 'static') {
                    this.loadBeginDate = new Date();
                }
                var nodeType = $cont.attr('data-node-type');

                if (isHome && this.options.homeHasClass) {
                    this.page = new _home.Home(this, $cont, context, nodeType, isHome);
                } else if (nodeType && typeof this.routes[nodeType] !== 'undefined') {
                    this.page = new this.routes[nodeType](this, $cont, context, nodeType, isHome);
                } else {
                    console.log('Page (' + nodeType + ') has no defined route, using AbstractPage.');
                    this.page = new _abstractPage.AbstractPage(this, $cont, context, nodeType, isHome);
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
                this.loader.show();
                this.loadBeginDate = new Date();

                var proxiedPreLoad = _jquery2.default.proxy(this.options.preLoad, this);
                proxiedPreLoad(state);

                var _this = this;
                this.currentRequest = _jquery2.default.ajax({
                    url: state.href,
                    dataType: "html",
                    // Need to disable cache to prevent
                    // browser to serve partial when no
                    // ajax context is defined.
                    cache: false,
                    type: 'get',
                    success: function success(data) {
                        // Extract only to new page content
                        // if the whole HTML is queried
                        var $data = null;
                        var $response = (0, _jquery2.default)(_jquery2.default.parseHTML(data));
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

                        var proxiedPostLoad = _jquery2.default.proxy(_this.options.postLoad, _this);
                        proxiedPostLoad(state, $data);

                        // Analytics
                        if (typeof ga !== "undefined") {
                            ga('send', 'pageview', { 'page': state.href, 'title': document.title });
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

        }, {
            key: "updatePageTitle",
            value: function updatePageTitle($data) {
                if ($data.length && $data[0].getAttribute('data-meta-title') !== '') {
                    var metaTitle = $data[0].getAttribute('data-meta-title');
                    if (metaTitle !== null && metaTitle !== '') document.title = metaTitle;
                }
            }
        }, {
            key: "pushFirstState",
            value: function pushFirstState(isHome) {
                history.pushState({
                    'firstPage': true,
                    'href': window.location.href,
                    'isHome': isHome
                }, null, window.location.href);
            }
        }]);

        return Router;
    }();
});
//# sourceMappingURL=router.js.map
