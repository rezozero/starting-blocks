define(["exports", "loglevel", "TweenLite", "waitForImages", "jquery", "utils/debounce"], function (exports, _loglevel, _TweenLite, _waitForImages, _jquery, _debounce) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AbstractPage = undefined;

    var _loglevel2 = _interopRequireDefault(_loglevel);

    var _TweenLite2 = _interopRequireDefault(_TweenLite);

    var _waitForImages2 = _interopRequireDefault(_waitForImages);

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

    var AbstractPage = exports.AbstractPage = function () {
        /**
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

            this.name = this.$cont.length ? this.$cont[0].getAttribute('data-node-name') : '';

            this.onResizeDebounce = (0, _debounce.debounce)(this.onResize.bind(this), 50, false);

            _loglevel2.default.debug('+ New page : ' + type + ' - #' + this.id);

            this.init();
            this.initEvents();
        }

        /**
         * Initialize page.
         *
         * You should always extends this method in your child implemetations.
         */


        AbstractPage.prototype.init = function init() {
            this.$link = this.$cont.find('a').not('[target="_blank"]');
            this.bindedLinkClick = this.router.onLinkClick.bind(this.router);

            // Add target blank on external link
            if (this.$link.length) {
                this.externalLinkTarget(this.$link, this.router.baseUrl);
                this.$link = this.$cont.find('a').not('[target="_blank"]');
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
         *
         */


        AbstractPage.prototype.destroy = function destroy() {
            _loglevel2.default.debug('destroy:' + this.id);
            this.$cont.remove();
            this.destroyEvents();
            // --- Blocks --- //
            if (this.blocks !== null) {
                for (var blockIndex in this.blocks) {
                    this.blocks[blockIndex].destroy();
                }
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

            window.addEventListener('resize', this.onResizeDebounce);
        };

        /**
         *
         */


        AbstractPage.prototype.destroyEvents = function destroyEvents() {
            this.$link.off('click', this.bindedLinkClick);
            window.removeEventListener('resize', this.onResizeDebounce);
        };

        /**
         * @param e
         * @private
         */


        AbstractPage.prototype.onLoad = function onLoad(e) {
            var _this = this;

            this.loadDate = new Date();
            this.loadDuration = this.loadDate - this.router.loadBeginDate;

            this.router.nav.update(this);

            var delay = this.loadDuration > this.router.options.minLoadDuration ? 0 : this.router.options.minLoadDuration - this.loadDuration;

            // Hide loading
            setTimeout(function () {
                var onShowEnded = _this.showEnded.bind(_this);

                _this.router.loader.hide();

                if (_this.context == 'static') {
                    _this.show(onShowEnded);
                } else if (_this.context == 'ajax') {
                    // Update body id
                    (0, _jquery2.default)('body').get(0).id = history.state.nodeName;
                    // Hide formerPages - show
                    if (_this.router.formerPages.length > 0) {
                        var formerPage = _this.router.formerPages[_this.router.formerPages.length - 1];
                        var formerPageDestroy = formerPage.destroy.bind(formerPage);

                        /*
                         * Very important,
                         * DO NOT animate if there are more than 1 page
                         * in destroy queue!
                         */
                        if (_this.router.formerPages.length > 1) {
                            formerPageDestroy();
                        } else {
                            formerPage.hide(formerPageDestroy);
                        }
                        _this.router.formerPages.pop();
                    }

                    _this.show(onShowEnded);
                }
            }, delay);
        };

        /**
         * @param {Function} onShow
         */


        AbstractPage.prototype.show = function show(onShow) {
            var _this2 = this;

            _loglevel2.default.debug('>>>> Show ----');
            // Animate
            var tween = _TweenLite2.default.to(this.$cont, 0.6, { 'opacity': 1, onComplete: function onComplete() {
                    _this2.router.transition = false;
                    if (typeof onShow !== 'undefined') {
                        onShow();
                    }
                } });
        };

        /**
         *
         */


        AbstractPage.prototype.showEnded = function showEnded() {
            _loglevel2.default.debug('---- Show >>>>');
            this.$cont.removeClass(this.router.options.pageClass + '-ajax');
            this.$cont.removeClass(this.router.options.pageClass + '-transitioning');
        };

        /**
         * @param {Function} onHidden
         */


        AbstractPage.prototype.hide = function hide(onHidden) {
            _loglevel2.default.debug('hiding:' + this.id);
            _TweenLite2.default.to(this.$cont, 0.6, { opacity: 0, onComplete: onHidden });
        };

        AbstractPage.prototype.initAjax = function initAjax() {
            this.$cont.addClass(this.router.options.pageClass + '-transitioning');
        };

        /**
         * @private
         */


        AbstractPage.prototype.initBlocks = function initBlocks() {
            for (var blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {

                var type = this.$blocks[blockIndex].getAttribute('data-node-type'),
                    id = this.$blocks[blockIndex].id;

                this.blocks[blockIndex] = this.router.classFactory.getBlockInstance(type, this, this.$blocks.eq(blockIndex));
            }
        };

        /**
         * @param  {String} id
         * @return {AbstractBlock|null}
         */


        AbstractPage.prototype.getBlockById = function getBlockById(id) {
            for (var i in this.blocks) {
                if (this.blocks[i].id == id) {
                    return this.blocks[i];
                }
            }
            return null;
        };

        /**
         *
         */


        AbstractPage.prototype.onResize = function onResize() {};

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
                if (link.href.indexOf(abstractBaseUrl) == -1 && link.href.indexOf('javascript') == -1 && link.href.indexOf('mailto:') == -1 && link.href.charAt(0) != '/' && link.href.charAt(0) != '#') {
                    $links[linkIndex].target = '_blank';
                }
            }
        };

        return AbstractPage;
    }();
});
//# sourceMappingURL=abstract-page.js.map
