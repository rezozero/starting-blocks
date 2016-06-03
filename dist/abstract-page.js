define(["exports", "TweenLite", "waitForImages", "jquery", "utils/debounce", "abstract-block", "router"], function (exports, _TweenLite, _waitForImages, _jquery, _debounce, _abstractBlock, _router) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AbstractPage = undefined;

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

    var AbstractPage = exports.AbstractPage = function () {
        /**
         * @param  {Router}  router
         * @param  {String}  $cont
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
            if (!(router instanceof _router.Router)) {
                throw "'router' must be an instance of Router.";
            }

            this.router = router;
            this.$cont = $cont;
            this.id = $cont[0].id;
            this.context = context;
            this.type = type;
            this.isHome = isHome;
            this.onResizeDebounce = (0, _debounce.debounce)(this.onResize.bind(this), 50, false);

            console.log('>> New page : ' + type + ' - ' + this.id);

            this.init();
            this.initEvents();
        }

        _createClass(AbstractPage, [{
            key: "init",
            value: function init() {
                this.$link = this.$cont.find('a').not('[target="_blank"]');

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
            }
        }, {
            key: "destroy",
            value: function destroy() {
                console.log('destroy:' + this.id);
                this.$cont.remove();
                this.destroyEvents();
                // --- Blocks --- //
                if (this.blocks !== null) {
                    for (var blockIndex in this.blocks) {
                        this.blocks[blockIndex].destroy();
                    }
                }
            }
        }, {
            key: "initEvents",
            value: function initEvents() {
                if (this.$cont.find('img').length) {
                    this.$cont.waitForImages({
                        finished: this.onLoad.bind(this),
                        waitForAll: true
                    });
                } else {
                    this.onLoad();
                }

                if (this.$link.length && this.router.options.ajaxEnabled) {
                    this.$link.on('click', this.router.onLinkClick.bind(this.router));
                }

                window.addEventListener('resize', this.onResizeDebounce);
            }
        }, {
            key: "destroyEvents",
            value: function destroyEvents() {
                this.$link.off('click', this.router.onLinkClick.bind(this.router));

                window.removeEventListener('resize', this.onResizeDebounce);
            }
        }, {
            key: "onLoad",
            value: function onLoad(e) {
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
            }
        }, {
            key: "show",
            value: function show(onShow) {
                var _this2 = this;

                console.log('>>>> Show ----');
                // Animate
                var tween = _TweenLite2.default.to(this.$cont, 0.6, { 'opacity': 1, onComplete: function onComplete() {
                        _this2.router.transition = false;
                        if (typeof onShow !== 'undefined') {
                            onShow();
                        }
                    } });
            }
        }, {
            key: "showEnded",
            value: function showEnded() {
                console.log('---- Show >>>>');
                this.$cont.removeClass(this.router.options.pageClass + '-ajax');
                this.$cont.removeClass(this.router.options.pageClass + '-transitioning');
            }
        }, {
            key: "hide",
            value: function hide(onHidden) {
                console.log('hiding:' + this.id);
                _TweenLite2.default.to(this.$cont, 0.6, { opacity: 0, onComplete: onHidden });
            }
        }, {
            key: "initAjax",
            value: function initAjax() {
                this.$cont.addClass(this.router.options.pageClass + '-transitioning');
            }
        }, {
            key: "initBlocks",
            value: function initBlocks() {

                for (var blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {

                    var type = this.$blocks[blockIndex].getAttribute('data-node-type'),
                        id = this.$blocks[blockIndex].id;

                    if (typeof this.router.routes[type] !== "undefined") {
                        this.blocks[blockIndex] = new this.router.routes[type](this, this.$blocks.eq(blockIndex), type);
                    } else {
                        this.blocks[blockIndex] = new _abstractBlock.AbstractBlock(this, this.$blocks.eq(blockIndex), type);
                    }
                }
            }
        }, {
            key: "onResize",
            value: function onResize() {}
            // console.log('resize :' + this.id);


            /**
             * Add target blank to external links.
             *
             * @param  {JQuery} $links
             * @param  {String} baseUrl
             */

        }, {
            key: "externalLinkTarget",
            value: function externalLinkTarget($links, baseUrl) {
                var linksLength = $links.length;
                var abstractBaseUrl = baseUrl.split('://');

                abstractBaseUrl = abstractBaseUrl[1];

                for (var linkIndex = 0; linkIndex < linksLength; linkIndex++) {
                    var link = $links[linkIndex];
                    // console.log(link.href);
                    if (link.href.indexOf(abstractBaseUrl) == -1 && link.href.indexOf('javascript') == -1 && link.href.indexOf('mailto:') == -1 && link.href.charAt(0) != '/' && link.href.charAt(0) != '#') {
                        $links[linkIndex].target = '_blank';
                    }
                }
            }
        }]);

        return AbstractPage;
    }();
});
//# sourceMappingURL=abstract-page.js.map
