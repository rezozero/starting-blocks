define(['exports', 'jquery'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Utils = undefined;

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

    var Utils = exports.Utils = function () {
        function Utils() {
            _classCallCheck(this, Utils);
        }

        /**
         * @param  {String} str
         * @return {String}
         */
        Utils.stripTrailingSlash = function stripTrailingSlash(str) {
            if (str.substr(-1) == '/') {
                return str.substr(0, str.length - 1);
            }
            return str;
        };

        /**
         * Log credits to console for code lovers.
         *
         * @param  {String} siteName
         * @param  {String} bgColor
         * @param  {Array}  creditsList
         * @param  {Array}  thanksList
         * @param  {String} textColor (optional)
         */


        Utils.logCredits = function logCredits(siteName, bgColor, creditsList, thanksList, textColor) {

            var color = '#fff';
            if (typeof textColor !== 'undefined') color = textColor;

            console.log('%c   ', 'font-size:3px;');
            console.log('%c' + siteName, 'background:' + bgColor + '; color: ' + color + '; font-size:14px; padding:5px 10px;');
            console.log('%c   ', 'font-size:3px;');

            if (creditsList !== null) {
                var creditsLength = creditsList.length;
                if (creditsLength) {
                    for (var indexCredit = 0; indexCredit < creditsLength; indexCredit++) {
                        console.log(creditsList[indexCredit].name + ' - ' + creditsList[indexCredit].website);
                    }
                }
            }

            if (thanksList !== null) {
                var thanksLength = thanksList.length;
                if (thanksLength) {
                    console.log("-");
                    console.log("Thanks to");
                    for (var indexThanks = 0; indexThanks < thanksLength; indexThanks++) {
                        console.log(thanksList[indexThanks].name + ' (' + thanksList[indexThanks].website + ')');
                    }
                }
            }

            console.log("-");
            console.log(" ");
        };

        /**
         * Get style value.
         *
         * @param  {jQuery} $el [element to check]
         * @param  {String} style
         * @return {Number}
         */


        Utils.getStyleVal = function getStyleVal($el, style) {
            var elStyle = $el.css(style);
            return Math.round(Number(elStyle.substr(0, elStyle.length - 2)));
        };

        /**
         * Add class custom.
         *
         * @param {HTMLElement} el [dom element]
         * @param {String} classToAdd  [class to add]
         */


        Utils.addClass = function addClass(el, classToAdd) {
            if (el.classList) el.classList.add(classToAdd);else el.className += ' ' + classToAdd;
        };

        /**
         * Remove class custom.
         *
         * @param {HTMLElement} el
         * @param {String} classToRemove
         */


        Utils.removeClass = function removeClass(el, classToRemove) {
            if (el.classList) {
                el.classList.remove(classToRemove);
            } else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + classToRemove.split(' ').join('|') + '(\\b|$)', 'gi'), '');
                var posLastCar = el.className.length - 1;
                if (el.className[posLastCar] == ' ') {
                    el.className = el.className.substring(0, posLastCar);
                }
            }
        };

        /**
         * Get random number.
         *
         * @param  {Number} min [min value]
         * @param  {Number} max [max value]
         * @param  {Number} decimal
         * @return {Number}
         */


        Utils.getRandomNumber = function getRandomNumber(min, max, decimal) {
            var result = Math.random() * (max - min) + min;

            if (typeof decimal !== 'undefined') {
                return Number(result.toFixed(decimal));
            } else return result;
        };

        /**
         * Get random integer.
         *
         * @param  {Number} min [min value]
         * @param  {Number} max [max value]
         * @return {Number}
         */


        Utils.getRandomInt = function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        /**
         * Replace placeholder for browser that
         * do not support it.
         */


        Utils.replacePlaceholder = function replacePlaceholder() {
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
        };

        /**
         * Match CSS media queries and JavaScript window width.
         *
         * @see http://stackoverflow.com/a/11310353
         * @return {Object}
         */


        Utils.getViewportSize = function getViewportSize() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width: e[a + 'Width'], height: e[a + 'Height'] };
        };

        /**
         * Get a css property with the vendor prefix.
         *
         * @param  {String} property the css property
         * @return {String}          the prefixed property
         */


        Utils.prefixProperty = function prefixProperty(property) {
            var prefixes = ['', 'ms', 'Webkit', 'Moz', 'O'];
            var numPrefixes = prefixes.length;
            var tmp = document.createElement("div");

            for (var i = 0; i < numPrefixes; i++) {
                var prefix = prefixes[i];
                property = prefix === '' ? property : property.charAt(0).toUpperCase() + property.substring(1).toLowerCase();
                var prop = prefix + property;

                if (typeof tmp.style[prop] != "undefined") {
                    return prop;
                }
            }
        };

        /**
         * Gets normalized ratio of value inside range.
         *
         * from https://github.com/mout/mout/blob/master/src/math/norm.js
         *
         * @param  {Number} val
         * @param  {Number} min
         * @param  {Number} max
         * @return {Number}
         */


        Utils.getNormRatio = function getNormRatio(val, min, max) {
            if (val < min) return 0;
            if (val > max) return 1;

            return val === max ? 1 : (val - min) / (max - min);
        };

        return Utils;
    }();
});
//# sourceMappingURL=utils.js.map
