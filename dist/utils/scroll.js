define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Scroll = exports.Scroll = function () {
        function Scroll() {
            _classCallCheck(this, Scroll);
        }

        /**
         *
         * @param e
         * @private
         */

        Scroll._preventDefault = function _preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault) e.preventDefault();
            e.returnValue = false;
        };

        /**
         *
         * @param e
         * @private
         */


        Scroll._keydown = function _keydown(e) {
            // left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
            var keys = [37, 38, 39, 40, 33, 34, 35];
            for (var i = keys.length; i--;) {
                if (e.keyCode === keys[i]) {
                    Scroll._preventDefault(e);
                    return;
                }
            }
        };

        /**
         *
         * @param e
         * @private
         */


        Scroll._wheel = function _wheel(e) {
            Scroll._preventDefault(e);
        };

        /**
         * Disable scroll.
         *
         * @return {void}
         */


        Scroll.disable = function disable() {
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', Scroll._wheel, false);
            }
            window.onmousewheel = document.onmousewheel = Scroll._wheel;
            document.onkeydown = Scroll._keydown;
        };

        /**
         * Enable scroll again.
         *
         * @return {void}
         */


        Scroll.enable = function enable() {
            if (window.removeEventListener) {
                window.removeEventListener('DOMMouseScroll', Scroll._wheel, false);
            }
            window.onmousewheel = document.onmousewheel = document.onkeydown = null;
        };

        return Scroll;
    }();
});
//# sourceMappingURL=scroll.js.map
