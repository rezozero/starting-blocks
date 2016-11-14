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

        /**
         * Test if viewport width in greater or equal than bootstrap XS breakpoint (480px).
         *
         * @return {Boolean}
         */

        BootstrapMedia.isMinXS = function isMinXS() {
            var size = _utils.Utils.getViewportSize();
            if (size.width >= 480) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * Test if viewport width in greater or equal than bootstrap SM breakpoint (768px).
         *
         * @return {Boolean}
         */


        BootstrapMedia.isMinSM = function isMinSM() {
            var size = _utils.Utils.getViewportSize();
            if (size.width >= 768) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * Test if viewport width in greater or equal than bootstrap MD breakpoint (992px).
         *
         * @return {Boolean}
         */


        BootstrapMedia.isMinMD = function isMinMD() {
            var size = _utils.Utils.getViewportSize();

            if (size.width >= 992) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * Test if viewport width in greater or equal than bootstrap LG breakpoint (1200px).
         *
         * @return {Boolean}
         */


        BootstrapMedia.isMinLG = function isMinLG() {
            var size = _utils.Utils.getViewportSize();

            if (size.width >= 1200) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * Test if viewport width in greater or equal than bootstrap XL breakpoint (1920px).
         *
         * @return {Boolean}
         */


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
