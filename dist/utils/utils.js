define(['exports', 'jquery'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var Utils = function () {
        function Utils() {
            _classCallCheck(this, Utils);
        }

        _createClass(Utils, null, [{
            key: 'stripTrailingSlash',
            value: function stripTrailingSlash(str) {
                if (str.substr(-1) == '/') {
                    return str.substr(0, str.length - 1);
                }
                return str;
            }
        }, {
            key: 'logCredits',
            value: function logCredits(siteName, bgColor, creditsList, thanksList, textColor) {

                var color = '#fff';
                if (typeof textColor !== 'undefined') color = textColor;

                console.log('%c   ', 'font-size:3px;');
                console.log('%c' + siteName, 'background:' + bgColor + '; color: ' + color + '; font-size:14px; padding:5px 10px;');
                console.log('%c   ', 'font-size:3px;');

                var creditsLength = creditsList.length;
                if (creditsLength) {
                    for (var indexCredit = 0; indexCredit < creditsLength; indexCredit++) {
                        console.log(creditsList[indexCredit].name + ' - ' + creditsList[indexCredit].website);
                    }
                }

                var thanksLength = thanksList.length;
                if (thanksLength) {
                    console.log("-");
                    console.log("Thanks to");
                    for (var indexThanks = 0; indexThanks < thanksLength; indexThanks++) {
                        console.log(thanksList[indexThanks].name + ' : ' + thanksList[indexThanks].website);
                    }
                }

                console.log("-");
                console.log(" ");
            }
        }, {
            key: 'getStyleVal',
            value: function getStyleVal($el, style) {
                var elStyle = $el.css(style);
                return Math.round(Number(elStyle.substr(0, elStyle.length - 2)));
            }
        }, {
            key: 'addClass',
            value: function addClass(el, classToAdd) {
                if (el.classList) el.classList.add(classToAdd);else el.className += ' ' + classToAdd;
            }
        }, {
            key: 'removeClass',
            value: function removeClass(el, classToRemove) {
                if (el.classList) {
                    el.classList.remove(classToRemove);
                } else {
                    el.className = el.className.replace(new RegExp('(^|\\b)' + classToRemove.split(' ').join('|') + '(\\b|$)', 'gi'), '');
                    var posLastCar = el.className.length - 1;
                    if (el.className[posLastCar] == ' ') {
                        el.className = el.className.substring(0, posLastCar);
                    }
                }
            }
        }, {
            key: 'getRandomNumber',
            value: function getRandomNumber(min, max) {
                return Math.random() * (max - min) + min;
            }
        }, {
            key: 'getRandomInt',
            value: function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }, {
            key: 'replacePlaceholder',
            value: function replacePlaceholder() {
                if (typeof Modernizr !== "undefined") {
                    if (!Modernizr.input.placeholder) {
                        (0, _jquery2.default)('[placeholder]').focus(function () {
                            var input = (0, _jquery2.default)(this);
                            if (input.val() == input.attr('placeholder')) {
                                input.val('');
                                input.removeClass('placeholder');
                            }
                        }).blur(function () {
                            var input = (0, _jquery2.default)(this);
                            if (input.val() === '' || input.val() == input.attr('placeholder')) {
                                input.addClass('placeholder');
                                input.val(input.attr('placeholder'));
                            }
                        }).blur();
                        (0, _jquery2.default)('[placeholder]').parents('form').submit(function () {
                            (0, _jquery2.default)(this).find('[placeholder]').each(function () {
                                var input = (0, _jquery2.default)(this);
                                if (input.val() == input.attr('placeholder')) {
                                    input.val('');
                                }
                            });
                        });
                    }
                }
            }
        }, {
            key: 'getViewportSize',
            value: function getViewportSize() {
                var e = window,
                    a = 'inner';
                if (!('innerWidth' in window)) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }
                return { width: e[a + 'Width'], height: e[a + 'Height'] };
            }
        }]);

        return Utils;
    }();

    exports.default = Utils;
});
//# sourceMappingURL=utils.js.map