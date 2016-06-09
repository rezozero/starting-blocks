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

    var BootstrapMedia = exports.BootstrapMedia = function () {
        function BootstrapMedia() {
            _classCallCheck(this, BootstrapMedia);
        }

        BootstrapMedia.isMinSM = function isMinSM() {
            var size = _utils.Utils.getViewportSize();

            if (size.width >= 768) {
                return true;
            } else {
                return false;
            }
        };

        BootstrapMedia.isMinMD = function isMinMD() {
            var size = _utils.Utils.getViewportSize();

            if (size.width >= 992) {
                return true;
            } else {
                return false;
            }
        };

        BootstrapMedia.isMinLG = function isMinLG() {
            var size = _utils.Utils.getViewportSize();

            if (size.width >= 1200) {
                return true;
            } else {
                return false;
            }
        };

        BootstrapMedia.isMinXL = function isMinXL() {
            var size = _utils.Utils.getViewportSize();

            if (size.width >= 1920) {
                return true;
            } else {
                return false;
            }
        };

        return BootstrapMedia;
    }();
});
//# sourceMappingURL=bootstrapMedia.js.map
