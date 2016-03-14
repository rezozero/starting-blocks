define(["exports", "utils/utils"], function (exports, _utils) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BootstrapMedia = undefined;

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

    var BootstrapMedia = exports.BootstrapMedia = function () {
        function BootstrapMedia() {
            _classCallCheck(this, BootstrapMedia);
        }

        _createClass(BootstrapMedia, null, [{
            key: "isMinSM",
            value: function isMinSM() {
                var size = _utils.Utils.getViewportSize();

                if (size.width >= 768) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            key: "isMinMD",
            value: function isMinMD() {
                var size = _utils.Utils.getViewportSize();

                if (size.width >= 992) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            key: "isMinLG",
            value: function isMinLG() {
                var size = _utils.Utils.getViewportSize();

                if (size.width >= 1200) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            key: "isMinXL",
            value: function isMinXL() {
                var size = _utils.Utils.getViewportSize();

                if (size.width >= 1920) {
                    return true;
                } else {
                    return false;
                }
            }
        }]);

        return BootstrapMedia;
    }();
});
//# sourceMappingURL=bootstrapMedia.js.map
