define(["exports", "utils/utils"], function (exports, _utils) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _utils2 = _interopRequireDefault(_utils);

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

    var BootstrapMedia = function () {
        function BootstrapMedia() {
            _classCallCheck(this, BootstrapMedia);
        }

        _createClass(BootstrapMedia, null, [{
            key: "isMediaMinSM",
            value: function isMediaMinSM() {
                var size = _utils2.default.getViewportSize();

                if (size.width >= 768) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            key: "isMediaMinMD",
            value: function isMediaMinMD() {
                var size = _utils2.default.getViewportSize();

                if (size.width >= 992) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            key: "isMediaMinLG",
            value: function isMediaMinLG() {
                var size = _utils2.default.getViewportSize();

                if (size.width >= 1200) {
                    return true;
                } else {
                    return false;
                }
            }
        }]);

        return BootstrapMedia;
    }();

    exports.default = BootstrapMedia;
});
//# sourceMappingURL=bootstrapMedia.js.map
