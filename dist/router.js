define(["exports", "jquery", "isMobile", "utils/utils", "state", "pages/home"], function (exports, _jquery, _isMobile, _utils, _state, _home) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Router = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _isMobile2 = _interopRequireDefault(_isMobile);

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

    var Router = exports.Router = function () {
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

        function Router(options, classFactory, baseUrl, loader, nav) {
            _classCallCheck(this, Router);

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
            this.$window = (0, _jquery2.default)(window);
            this.$body = (0, _jquery2.default)('body');

            this.deviceType = _isMobile2.default.any === false ? 'desktop' : 'mobile';
            _utils.Utils.addClass(this.$body[0], 'is-' + this.deviceType);

            /**
             * @deprecated use this.$window instead
             */
            this.window = this.$window;
            this.currentRequest = null;
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
                $ajaxContainer: (0, _jquery2.default)("#ajax-container"),
                minLoadDuration: 0,
                preLoadPageDelay: 0,
                postLoad: function postLoad(state, data) {},
                preLoad: function preLoad(state) {},
                prePushState: function prePushState(state) {},
                onDestroy: function onDestroy() {},
                preBoot: function preBoot($cont, context, isHome) {}
            };

            if (options !== null) {
                this.options = _jquery2.default.extend(this.options, options);
            }
        }

        Router.prototype.destroy = function destroy() {
            if (this.options.ajaxEnabled) {
                window.removeEventListener("popstate", this.onPopState.bind(this), false);
            }
            var onDestroyBinded = this.options.onDestroy.bind(this);
            onDestroyBinded();
        };

        /**
         * Initialize Router events.
         *
         */


        Router.prototype.initEvents = function initEvents() {
            if (this.options.ajaxEnabled) {
                window.addEventListener("popstate", this.onPopState.bind(this), false);
            }
            /*
             * Init nav events
             */
            this.nav.initEvents(this);
        };
        /**
         * @private
         * @param  {Event} event
         * @return
         */


        Router.prototype.onPopState = function onPopState(event) {
            if (typeof event.state !== "undefined" && event.state !== null) {
                this.transition = true;
                this.loadPage(event, event.state);
            }
        };

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


        Router.prototype.boot = function boot($cont, context, isHome) {
            if (context == 'static') {
                this.loadBeginDate = new Date();
            }
            var preBootBinded = this.options.preBoot.bind(this);
            preBootBinded($cont, context, isHome);

            var nodeType = $cont.attr(this.options.objectTypeAttr);

            if (isHome && this.options.homeHasClass) {
                this.page = new _home.Home(this, $cont, context, nodeType, isHome);
            } else {
                this.page = this.classFactory.getPageInstance(nodeType, this, $cont, context, nodeType, isHome);
            }

            if (context == 'ajax') this.state.update(this.page);
        };

        /**
         * @private
         * @param e Event
         */


        Router.prototype.onLinkClick = function onLinkClick(e) {
            var linkClassName = e.currentTarget.className,
                linkHref = e.currentTarget.href;

            if (linkHref.indexOf('mailto:') == -1) {
                e.preventDefault();

                // Check if link is not active
                if (linkClassName.indexOf(this.options.activeClass) == -1 && linkClassName.indexOf(this.options.noAjaxLinkClass) == -1 && !this.transition) {
                    this.transition = true;

                    this.state = new _state.State(this, e.currentTarget, {
                        previousType: this.page.type,
                        previousName: this.page.name,
                        navLinkClass: this.options.navLinkClass
                    });

                    var prePushStateBinded = this.options.prePushState.bind(this);
                    prePushStateBinded(this.state);

                    if (history.pushState) {
                        history.pushState(this.state, this.state.title, this.state.href);
                    }
                    this.loadPage(e, this.state);
                }
            }
        };

        /**
         * Perform a AJAX load for an History event.
         *
         * @param e
         * @param state
         * @private
         */


        Router.prototype.loadPage = function loadPage(e, state) {
            var _this = this;

            if (this.currentRequest && this.currentRequest.readyState != 4) {
                this.currentRequest.abort();
            }
            this.loader.show();
            this.loadBeginDate = new Date();

            var preLoadBinded = this.options.preLoad.bind(this);
            preLoadBinded(state);

            setTimeout(function () {
                _this.currentRequest = _jquery2.default.ajax({
                    url: state.href,
                    dataType: "html",
                    // Need to disable cache to prevent
                    // browser to serve partial when no
                    // ajax context is defined.
                    cache: false,
                    type: 'get',
                    success: function success(data) {
                        _this._onDataLoaded(data, state);
                    }
                });
            }, this.options.preLoadPageDelay);
        };

        /**
         * @private
         * @param {Object} data jQuery AJAX response
         */


        Router.prototype._onDataLoaded = function _onDataLoaded(data, state) {
            // Extract only to new page content
            // if the whole HTML is queried

            var $data = null;
            var $response = (0, _jquery2.default)(_jquery2.default.parseHTML(data.trim()));
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

            var postLoadBinded = this.options.postLoad.bind(this);
            postLoadBinded(state, $data);

            // Analytics
            if (typeof ga !== "undefined") {
                ga('send', 'pageview', { 'page': state.href, 'title': document.title });
            }
        };

        /**
         * Update page title against data-title attribute
         * from ajax loaded partial DOM.
         *
         * @param {jQuery} $data
         */


        Router.prototype.updatePageTitle = function updatePageTitle($data) {
            if ($data.length && $data.attr('data-meta-title') !== '') {
                var metaTitle = $data.attr('data-meta-title');
                if (metaTitle !== null && metaTitle !== '') document.title = metaTitle;
            }
        };

        /**
         *
         * @param {boolean} isHome
         */


        Router.prototype.pushFirstState = function pushFirstState(isHome) {
            if (history.pushState) {
                history.pushState({
                    'firstPage': true,
                    'href': window.location.href,
                    'isHome': isHome
                }, null, window.location.href);
            }
        };

        return Router;
    }();
});
//# sourceMappingURL=router.js.map
