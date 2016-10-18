define(["exports", "loglevel", "TweenMax", "waitForImages", "jquery", "Lazyload", "utils/debounce"], function (exports, _loglevel, _TweenMax, _waitForImages, _jquery, _Lazyload, _debounce) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AbstractPage = undefined;

    var _loglevel2 = _interopRequireDefault(_loglevel);

    var _TweenMax2 = _interopRequireDefault(_TweenMax);

    var _waitForImages2 = _interopRequireDefault(_waitForImages);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _Lazyload2 = _interopRequireDefault(_Lazyload);

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

    var AbstractPage = exports.AbstractPage = function () {
        /**
         * Base constructor for Pages.
         *
         * Do not override this method, override `init` method instead.
         *
         * @param  {Router}  router
         * @param  {jQuery}  $cont
         * @param  {String}  context
         * @param  {String}  type
         * @param  {Boolean} isHome
         */

        function AbstractPage(router, $cont, context, type, isHome) {
            _classCallCheck(this, AbstractPage);

            type = type || 'page';

            if (!$cont) {
                throw "AbstractPage need a $cont (JQuery) to be defined.";
            }
            if (!router) {
                throw "AbstractPage need a Router instance to be defined.";
            }
            /**
             *
             * @type {Router}
             */
            this.router = router;
            /**
             *
             * @type {jQuery}
             */
            this.$cont = $cont;
            /**
             * @type {String}
             */
            this.id = $cont[0].id;
            /**
             * @type {String}
             */
            this.context = context;
            /**
             * @type {String}
             */
            this.type = type;
            /**
             * @type {Boolean}
             */
            this.isHome = isHome;
            /**
             * @type {Lazyload}
             */
            this.lazyload = null;

            if (this.$cont[0].getAttribute('data-is-home') == '1') {
                this.isHome = true;
            }

            this.ready = false;

            this.name = this.$cont.length ? this.$cont[0].getAttribute('data-node-name') : '';

            this.onResizeDebounce = (0, _debounce.debounce)(this.onResize.bind(this), 50, false);

            _loglevel2.default.debug('✳️ #' + this.id + '\t' + type);

            this.init();
            this.initEvents();
        }

        /**
         * Initialize page.
         *
         * You should always extends this method in your child implementations instead
         * of extending page constructor.
         */


        AbstractPage.prototype.init = function init() {
            var _this = this;

            this.$link = this.$cont.find('a').not('[target="_blank"]');
            this.bindedLinkClick = this.router.onLinkClick.bind(this.router);

            // Add target blank on external link
            if (this.$link.length) {
                this.externalLinkTarget(this.$link, this.router.baseUrl);
                this.$link = this.$cont.find('a').not('[target="_blank"]');
            }

            // --- Lazyload --- //
            if (this.router.options.lazyloadEnabled) {
                setTimeout(function () {
                    _this.beforeLazyload();
                    _this.lazyload = new _Lazyload2.default({
                        elements_selector: '.' + _this.router.options.lazyloadClass,
                        data_src: _this.router.options.lazyloadSrcAttr.replace('data-', ''),
                        data_srcset: _this.router.options.lazyloadSrcSetAttr.replace('data-', ''),
                        callback_set: _this.onLazyImageSet.bind(_this),
                        callback_load: _this.onLazyImageLoad.bind(_this),
                        callback_processed: _this.onLazyImageProcessed.bind(_this)
                    });
                }, 0);
            }

            // --- Blocks --- //
            this.blocks = [];
            this.$blocks = this.$cont.find(this.router.options.pageBlockClass);
            this.blockLength = this.$blocks.length;
            if (this.blockLength) {
                this.initBlocks();
            }

            // --- Context --- //
            if (this.context == 'static' && this.router.ajaxEnabled) {
                this.router.pushFirstState(this.isHome);
            } else if (this.context == 'ajax') {
                this.initAjax();
            }
        };

        /**
         * Destroy current page and all its blocks.
         */


        AbstractPage.prototype.destroy = function destroy() {
            _loglevel2.default.debug('🗑 #' + this.id);
            this.$cont.remove();
            this.destroyEvents();
            // --- Blocks --- //
            if (this.blocks !== null) {
                for (var blockIndex in this.blocks) {
                    this.blocks[blockIndex].destroy();
                }
            }
            /*
             * Remove Lazyload instance and listeners
             */
            if (null !== this.lazyload) {
                this.lazyload.destroy();
            }
        };

        /**
         * Initialize basic events.
         *
         * Such as waitForImages and link click if you enabled Ajax navigation.
         */


        AbstractPage.prototype.initEvents = function initEvents() {
            if (this.$cont.find('img').length) {
                this.$cont.waitForImages({
                    finished: this.onLoad.bind(this),
                    waitForAll: true
                });
            } else {
                this.onLoad();
            }

            if (this.$link.length && this.router.options.ajaxEnabled) {
                this.$link.on('click', this.bindedLinkClick);
            }

            this.router.$window.on('resize', this.onResizeDebounce);
        };

        /**
         *
         */


        AbstractPage.prototype.destroyEvents = function destroyEvents() {
            this.$link.off('click', this.bindedLinkClick);
            this.router.$window.off('resize', this.onResizeDebounce);
        };

        /**
         * @param e
         * @private
         */


        AbstractPage.prototype.onLoad = function onLoad(e) {
            var _this2 = this;

            this.loadDate = new Date();
            this.loadDuration = this.loadDate - this.router.loadBeginDate;
            this.router.nav.update(this);

            var delay = this.loadDuration > this.router.options.minLoadDuration ? 0 : this.router.options.minLoadDuration - this.loadDuration;

            // Hide loading
            setTimeout(function () {
                var onShowEnded = _this2.showEnded.bind(_this2);

                _this2.ready = true;
                _this2.router.loader.hide();

                if (_this2.context == 'static') {
                    _this2.show(onShowEnded);
                } else if (_this2.context == 'ajax') {
                    // Update body id
                    if (_this2.name !== '') document.body.id = _this2.name;
                    // Hide formerPages - show
                    if (_this2.router.formerPages.length > 0) {
                        var formerPage = _this2.router.formerPages[_this2.router.formerPages.length - 1];
                        var formerPageDestroy = formerPage.destroy.bind(formerPage);

                        /*
                         * Very important,
                         * DO NOT animate if there are more than 1 page
                         * in destroy queue!
                         */
                        if (_this2.router.formerPages.length > 1) {
                            formerPageDestroy();
                        } else {
                            formerPage.hide(formerPageDestroy);
                        }
                        _this2.router.formerPages.pop();
                    }

                    _this2.show(onShowEnded);
                }
            }, delay);
        };

        /**
         * @param {Function} onShow
         */


        AbstractPage.prototype.show = function show(onShow) {
            var _this3 = this;

            _loglevel2.default.debug('▶️ #' + this.id);

            // Animate
            TweenLite.to(this.$cont, 0.6, { 'opacity': 1, onComplete: function onComplete() {
                    _this3.router.transition = false;
                    if (typeof onShow !== 'undefined') {
                        onShow();
                    }
                } });
        };

        /**
         *
         */


        AbstractPage.prototype.showEnded = function showEnded() {
            this.$cont.removeClass(this.router.options.pageClass + '-ajax');
            this.$cont.removeClass(this.router.options.pageClass + '-transitioning');
        };

        /**
         * @param {Function} onHidden
         */


        AbstractPage.prototype.hide = function hide(onHidden) {
            _loglevel2.default.debug('◀️ #' + this.id);

            TweenLite.to(this.$cont, 0.6, { opacity: 0, onComplete: onHidden });
        };

        AbstractPage.prototype.initAjax = function initAjax() {
            this.$cont.addClass(this.router.options.pageClass + '-transitioning');
        };

        /**
         * @private
         */


        AbstractPage.prototype.initBlocks = function initBlocks() {
            for (var blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {
                var type = this.$blocks[blockIndex].getAttribute(this.router.options.objectTypeAttr),
                    id = this.$blocks[blockIndex].id;

                var block = this.router.classFactory.getBlockInstance(type, this, this.$blocks.eq(blockIndex));
                /*
                 * Prevent undefined blocks to be appended to block collection.
                 */
                if (block) {
                    this.blocks.push(block);
                }
            }
            /*
             * Notify all blocks that page init is over.
             */
            for (var i = this.blocks.length - 1; i >= 0; i--) {
                if (typeof this.blocks[i].onPageReady == 'function') this.blocks[i].onPageReady();
            }
        };

        /**
         * Get a page’ block instance from its `id`.
         *
         * @param  {String} id
         * @return {AbstractBlock|null}
         */


        AbstractPage.prototype.getBlockById = function getBlockById(id) {
            for (var i in this.blocks) {
                if (this.blocks[i] && this.blocks[i].id && this.blocks[i].id == id) {
                    return this.blocks[i];
                }
            }
            return null;
        };

        /**
         * @abstract
         */


        AbstractPage.prototype.onResize = function onResize() {};

        /**
         * Called before init lazyload images.
         *
         * @abstract
         */


        AbstractPage.prototype.beforeLazyload = function beforeLazyload() {};

        /**
         * After image src switched.
         *
         * @abstract
         * @param {HTMLImage} element
         */


        AbstractPage.prototype.onLazyImageSet = function onLazyImageSet(element) {
            _loglevel2.default.debug('\t🖼 «' + element.id + '» set');
        };

        /**
         * After lazyload image loaded.
         *
         * @abstract
         * @param {HTMLImage} element
         */


        AbstractPage.prototype.onLazyImageLoad = function onLazyImageLoad(element) {
            _loglevel2.default.debug('\t🖼 «' + element.id + '» load');
        };

        /**
         * Before lazyload.
         *
         * @abstract
         */


        AbstractPage.prototype.onLazyImageProcessed = function onLazyImageProcessed(index) {
            _loglevel2.default.debug('\t🖼 Lazy load processed');
        };

        /**
         * Add target blank to external links.
         *
         * @param  {JQuery} $links
         * @param  {String} baseUrl
         */


        AbstractPage.prototype.externalLinkTarget = function externalLinkTarget($links, baseUrl) {
            var linksLength = $links.length;
            var abstractBaseUrl = baseUrl.split('://');

            abstractBaseUrl = abstractBaseUrl[1];

            for (var linkIndex = 0; linkIndex < linksLength; linkIndex++) {
                var link = $links[linkIndex];
                /*
                 * Use RAW href data not to automatically
                 * get protocol and domain in string
                 */
                var linkString = link.getAttribute('href');
                if (linkString.indexOf(abstractBaseUrl) == -1 && linkString.indexOf('javascript') == -1 && linkString.indexOf('mailto:') == -1 && linkString.charAt(0) != '/' && linkString.charAt(0) != '#') {
                    $links[linkIndex].target = '_blank';
                }
            }
        };

        return AbstractPage;
    }();
});
//# sourceMappingURL=abstract-page.js.map
