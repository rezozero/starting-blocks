define(["exports", "loglevel", "waitForImages", "jquery", "utils/debounce"], function (exports, _loglevel, _waitForImages, _jquery, _debounce) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AbstractBlock = undefined;

    var _loglevel2 = _interopRequireDefault(_loglevel);

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

    var AbstractBlock = exports.AbstractBlock = function () {
        /**
         * Abstract block constructor.
         *
         * It‘s better to extend this class by using `init` method instead
         * of extending `constructor`.
         *
         * @param  {AbstractPage} page
         * @param  {String} id
         * @param  {String} type
         */

        function AbstractBlock(page, $cont, type) {
            _classCallCheck(this, AbstractBlock);

            type = type || 'block';

            this.page = page;
            this.$cont = $cont;
            this.id = $cont[0].id;
            this.type = type;
            this.name = this.$cont.length ? this.$cont[0].getAttribute('data-node-name') : '';
            this.onResizeDebounce = (0, _debounce.debounce)(this.onResize.bind(this), 50, false);

            _loglevel2.default.debug('\t✳️ #' + this.id + '\t' + type);

            this.init();
            this.initEvents();
        }

        /**
         * Basic members initialization for children classes.
         */


        AbstractBlock.prototype.init = function init() {};

        AbstractBlock.prototype.initEvents = function initEvents() {
            if (this.$cont.find('img').length) {
                this.$cont.waitForImages({
                    finished: this.onLoad.bind(this),
                    waitForAll: true
                });
            } else {
                this.onLoad();
            }

            this.page.router.$window.on('resize', this.onResizeDebounce);
        };

        AbstractBlock.prototype.destroy = function destroy() {
            _loglevel2.default.debug('\t🗑 #' + this.id);
            this.destroyEvents();
        };

        AbstractBlock.prototype.destroyEvents = function destroyEvents() {
            this.page.router.$window.off('resize', this.onResizeDebounce);
        };

        AbstractBlock.prototype.onResize = function onResize() {};

        AbstractBlock.prototype.onLoad = function onLoad() {};

        return AbstractBlock;
    }();
});
//# sourceMappingURL=abstract-block.js.map
