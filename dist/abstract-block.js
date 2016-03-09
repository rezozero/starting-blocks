define(["exports", "waitForImages", "jquery", "utils/debounce"], function (exports, _waitForImages, _jquery, _debounce) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _waitForImages2 = _interopRequireDefault(_waitForImages);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _debounce2 = _interopRequireDefault(_debounce);

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

    var AbstractBlock = function () {
        /**
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
            this.onResizeDebounce = (0, _debounce2.default)(_jquery2.default.proxy(this.onResize, this), 50, false);

            console.log('new block : ' + type);

            this.init();
            this.initEvents();
        }

        _createClass(AbstractBlock, [{
            key: "init",
            value: function init() {}
        }, {
            key: "initEvents",
            value: function initEvents() {
                this.$cont.waitForImages({
                    finished: _jquery2.default.proxy(this.onLoad, this),
                    waitForAll: true
                });

                window.addEventListener('resize', this.onResizeDebounce);
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.destroyEvents();
            }
        }, {
            key: "destroyEvents",
            value: function destroyEvents() {
                window.removeEventListener('resize', this.onResizeDebounce);
            }
        }, {
            key: "onResize",
            value: function onResize() {
                console.log('resize :' + this.id);
            }
        }, {
            key: "onMapsReady",
            value: function onMapsReady() {}
        }]);

        return AbstractBlock;
    }();

    exports.default = AbstractBlock;
});
//# sourceMappingURL=abstract-block.js.map
