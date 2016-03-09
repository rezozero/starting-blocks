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

    var Scroll = function () {
        function Scroll() {
            _classCallCheck(this, Scroll);
        }

        _createClass(Scroll, null, [{
            key: '_preventDefault',
            value: function _preventDefault(e) {
                e = e || window.event;
                if (e.preventDefault) e.preventDefault();
                e.returnValue = false;
            }
        }, {
            key: '_keydown',
            value: function _keydown(e) {
                // left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
                var keys = [37, 38, 39, 40, 33, 34, 35];
                for (var i = keys.length; i--;) {
                    if (e.keyCode === keys[i]) {
                        Scroll._preventDefault(e);
                        return;
                    }
                }
            }
        }, {
            key: '_wheel',
            value: function _wheel(e) {
                Scroll._preventDefault(e);
            }
        }, {
            key: 'disable',
            value: function disable() {
                if (window.addEventListener) {
                    window.addEventListener('DOMMouseScroll', Scroll._wheel, false);
                }
                window.onmousewheel = document.onmousewheel = Scroll._wheel;
                document.onkeydown = Scroll._keydown;
            }
        }, {
            key: 'enable',
            value: function enable() {
                if (window.removeEventListener) {
                    window.removeEventListener('DOMMouseScroll', Scroll._wheel, false);
                }
                window.onmousewheel = document.onmousewheel = document.onkeydown = null;
            }
        }]);

        return Scroll;
    }();

    exports.default = Scroll;
});
//# sourceMappingURL=scroll.js.map
