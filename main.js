module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(82);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(33)('wks');
var uid = __webpack_require__(22);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(2);
var ctx = __webpack_require__(15);
var hide = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(48);
var toPrimitive = __webpack_require__(29);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50);
var defined = __webpack_require__(30);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("log");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(19);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(53);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = __webpack_require__(24);

var _jquery2 = _interopRequireDefault(_jquery);

var _loglevel = __webpack_require__(14);

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Utils class
 */
/**
 * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file Utils.js
 * @author Maxime Bérard
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

var Utils = function () {
    function Utils() {
        (0, _classCallCheck3.default)(this, Utils);
    }

    (0, _createClass3.default)(Utils, null, [{
        key: 'stripTrailingSlash',

        /**
         * @param  {String} str
         * @return {String}
         */
        value: function stripTrailingSlash(str) {
            if (str.substr(-1) === '/') {
                return str.substr(0, str.length - 1);
            }
            return str;
        }

        /**
         * Get port
         *
         * @param p
         * @returns {*}
         */

    }, {
        key: 'getPort',
        value: function getPort(p) {
            var port = typeof p !== 'undefined' ? p : window.location.port;
            var protocol = window.location.protocol;

            if (port !== '') {
                return parseInt(port);
            }
            if (protocol === 'http:') {
                return 80;
            }
            if (protocol === 'https:') {
                return 443;
            }
        }
    }, {
        key: 'cleanLink',
        value: function cleanLink(url) {
            return url.replace(/#.*/, '');
        }

        /**
         * Get current url
         *
         * @returns {string}
         */

    }, {
        key: 'getCurrentUrl',
        value: function getCurrentUrl() {
            return window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
        }

        /**
         * Request timeout (in ms)
         *
         * @returns {number}
         */

    }, {
        key: 'requestTimeout',
        value: function requestTimeout() {
            return 10000;
        }

        /**
         * Start a fetch request
         *
         * @param  {String} url
         * @return {Promise}
         */

    }, {
        key: 'request',
        value: function request(url) {
            // TODO implement timeout!
            var dfd = Utils.deferred();

            var timeout = window.setTimeout(function () {
                dfd.reject(new Error('timeout!'));
            }, Utils.requestTimeout());

            var headers = new window.Headers();
            headers.append('X-Starting-Blocks', 'yes');
            headers.append('X-Allow-Partial', 'yes');
            headers.append('X-Requested-With', 'XMLHttpRequest');

            window.fetch(url, {
                method: 'GET',
                headers: headers,
                cache: 'default'
            }).then(function (res) {
                window.clearTimeout(timeout);

                if (res.status >= 200 && res.status < 300) {
                    return dfd.resolve(res.text());
                }

                var err = new Error(res.statusText || res.status);
                return dfd.reject(err);
            }).catch(function (err) {
                window.clearTimeout(timeout);
                dfd.reject(err);
            });

            return dfd.promise;
        }

        /**
         * Log credits to console for code lovers.
         *
         * @param  {String} siteName
         * @param  {String} bgColor
         * @param  {Array}  creditsList
         * @param  {Array}  thanksList
         * @param  {String} textColor (optional)
         */

    }, {
        key: 'logCredits',
        value: function logCredits(siteName, bgColor, creditsList, thanksList, textColor) {
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
                    console.log('-');
                    console.log('Thanks to');
                    for (var indexThanks = 0; indexThanks < thanksLength; indexThanks++) {
                        console.log(thanksList[indexThanks].name + ' (' + thanksList[indexThanks].website + ')');
                    }
                }
            }

            console.log('-');
            console.log(' ');
        }

        /**
         * Get style value.
         *
         * @param  {jQuery} $el [element to check]
         * @param  {String} style
         * @return {Number}
         */

    }, {
        key: 'getStyleVal',
        value: function getStyleVal($el, style) {
            var elStyle = $el.css(style);
            return Math.round(Number(elStyle.substr(0, elStyle.length - 2)));
        }

        /**
         * Add class custom.
         *
         * @param {HTMLElement} el [dom element]
         * @param {String} classToAdd  [class to add]
         */

    }, {
        key: 'addClass',
        value: function addClass(el, classToAdd) {
            if (el.classList) el.classList.add(classToAdd);else el.className += ' ' + classToAdd;
        }

        /**
         * Remove class custom.
         *
         * @param {HTMLElement} el
         * @param {String} classToRemove
         */

    }, {
        key: 'removeClass',
        value: function removeClass(el, classToRemove) {
            if (el.classList) {
                el.classList.remove(classToRemove);
            } else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + classToRemove.split(' ').join('|') + '(\\b|$)', 'gi'), '');
                var posLastCar = el.className.length - 1;
                if (el.className[posLastCar] === ' ') {
                    el.className = el.className.substring(0, posLastCar);
                }
            }
        }

        /**
         * Get random number.
         *
         * @param  {Number} min [min value]
         * @param  {Number} max [max value]
         * @param  {Number} decimal
         * @return {Number}
         */

    }, {
        key: 'getRandomNumber',
        value: function getRandomNumber(min, max, decimal) {
            var result = Math.random() * (max - min) + min;

            if (typeof decimal !== 'undefined') {
                return Number(result.toFixed(decimal));
            } else return result;
        }

        /**
         * Get random integer.
         *
         * @param  {Number} min [min value]
         * @param  {Number} max [max value]
         * @return {Number}
         */

    }, {
        key: 'getRandomInt',
        value: function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        /**
         * Replace placeholder for browser that
         * do not support it.
         */

    }, {
        key: 'replacePlaceholder',
        value: function replacePlaceholder() {
            var $placeholder = (0, _jquery2.default)('[placeholder]');
            if (typeof window.Modernizr !== 'undefined') {
                if (!window.Modernizr.input.placeholder) {
                    $placeholder.focus(function () {
                        var input = (0, _jquery2.default)(this);
                        if (input.val() === input.attr('placeholder')) {
                            input.val('');
                            input.removeClass('placeholder');
                        }
                    }).blur(function () {
                        var input = (0, _jquery2.default)(this);
                        if (input.val() === '' || input.val() === input.attr('placeholder')) {
                            input.addClass('placeholder');
                            input.val(input.attr('placeholder'));
                        }
                    }).blur();
                    $placeholder.parents('form').submit(function () {
                        (0, _jquery2.default)(this).find('[placeholder]').each(function () {
                            var input = (0, _jquery2.default)(this);
                            if (input.val() === input.attr('placeholder')) {
                                input.val('');
                            }
                        });
                    });
                }
            }
        }

        /**
         * Send a GA page view event when context is AJAX.
         */

    }, {
        key: 'trackGoogleAnalytics',
        value: function trackGoogleAnalytics() {
            if (typeof window.ga !== 'undefined') {
                _loglevel2.default.debug('🚩 Push Analytics for: ' + window.location.pathname);
                window.ga('send', 'pageview', {
                    'page': window.location.pathname,
                    'title': document.title
                });
            }
        }

        /**
         * Match CSS media queries and JavaScript window width.
         *
         * @see http://stackoverflow.com/a/11310353
         * @return {Object}
         */

    }, {
        key: 'getViewportSize',
        value: function getViewportSize() {
            var e = window;
            var a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width: e[a + 'Width'], height: e[a + 'Height'] };
        }

        /**
         * Get a css property with the vendor prefix.
         *
         * @param  {String} property the css property
         * @return {String}          the prefixed property
         */

    }, {
        key: 'prefixProperty',
        value: function prefixProperty(property) {
            var prefixes = ['', 'ms', 'Webkit', 'Moz', 'O'];
            var numPrefixes = prefixes.length;
            var tmp = document.createElement('div');

            for (var i = 0; i < numPrefixes; i++) {
                var prefix = prefixes[i];
                property = prefix === '' ? property : property.charAt(0).toUpperCase() + property.substring(1).toLowerCase();
                var prop = prefix + property;

                if (typeof tmp.style[prop] !== 'undefined') {
                    return prop;
                }
            }
        }

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

    }, {
        key: 'getNormRatio',
        value: function getNormRatio(val, min, max) {
            if (val < min) return 0;
            if (val > max) return 1;

            return val === max ? 1 : (val - min) / (max - min);
        }

        /**
         * Return a new "Deferred" object
         * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
         *
         * @return {Deferred}
         */

    }, {
        key: 'deferred',
        value: function deferred() {
            return new function () {
                var _this = this;

                this.resolve = null;
                this.reject = null;

                this.promise = new _promise2.default(function (resolve, reject) {
                    _this.resolve = resolve;
                    _this.reject = reject;
                });
            }();
        }
    }]);
    return Utils;
}();

exports.default = Utils;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(49);
var enumBugKeys = __webpack_require__(34);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("jQuery");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(33)('keys');
var uid = __webpack_require__(22);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 35 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(30);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _loglevel = __webpack_require__(14);

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Event dispatcher singleton.
 */
var Dispatcher = function () {
  function Dispatcher() {
    (0, _classCallCheck3.default)(this, Dispatcher);
  }

  (0, _createClass3.default)(Dispatcher, [{
    key: 'commit',
    value: function commit(eventType, detail) {
      var event = new window.CustomEvent(eventType, { detail: detail });
      _loglevel2.default.debug('🚩 Dispatched ' + eventType);
      window.dispatchEvent(event);
    }
  }]);
  return Dispatcher;
}();

/**
 * @ignore
 */
/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file Events.js
 * @author Ambroise Maupate
 */

exports.default = new Dispatcher();

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(6);
var dPs = __webpack_require__(90);
var enumBugKeys = __webpack_require__(34);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(28)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(58).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(19);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(67);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(4);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(2);
var LIBRARY = __webpack_require__(25);
var wksExt = __webpack_require__(41);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(23);
var createDesc = __webpack_require__(20);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(29);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(48);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(120);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(124);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(67);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file EventTypes.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

/**
 * Before Router initialize XHR request to load new page.
 *
 * @type {String}
 */
var BEFORE_PAGE_LOAD = exports.BEFORE_PAGE_LOAD = 'SB_BEFORE_PAGE_LOAD';

/**
 * After Router XHR request succeeded.
 *
 * @type {String}
 */
var AFTER_PAGE_LOAD = exports.AFTER_PAGE_LOAD = 'SB_AFTER_PAGE_LOAD';

/**
 * After Router appended new page DOM to page-container.
 *
 * @type {String}
 */
var AFTER_DOM_APPENDED = exports.AFTER_DOM_APPENDED = 'SB_AFTER_DOM_APPENDED';

/**
 * When new page container is ready.
 *
 * @type {String}
 */
var CONTAINER_READY = exports.CONTAINER_READY = 'SB_CONTAINER_READY';

/**
 * After Router create new page instance.
 *
 * @type {String}
 */
var AFTER_PAGE_BOOT = exports.AFTER_PAGE_BOOT = 'SB_AFTER_PAGE_BOOT';

/**
 * Before page begins to show, right after assets are loaded (images).
 *
 * @type {String}
 */
var BEFORE_PAGE_SHOW = exports.BEFORE_PAGE_SHOW = 'SB_BEFORE_PAGE_SHOW';

/**
 * After page showed.
 *
 * @type {String}
 */
var AFTER_PAGE_SHOW = exports.AFTER_PAGE_SHOW = 'SB_AFTER_PAGE_SHOW';

/**
 * Before page begins to hide.
 * Be careful, this must be triggered manually if hide() method is overriden.
 *
 * @type {String}
 */
var BEFORE_PAGE_HIDE = exports.BEFORE_PAGE_HIDE = 'SB_BEFORE_PAGE_HIDE';

/**
 * After page hiding animation.
 * Be careful, this must be triggered manually if hide() method is overriden.
 *
 * @type {String}
 */
var AFTER_PAGE_HIDE = exports.AFTER_PAGE_HIDE = 'SB_AFTER_PAGE_HIDE';

/**
 * Before page transition begin.
 *
 * @type {String}
 */
var TRANSITION_START = exports.TRANSITION_START = 'SB_TRANSITION_START';

/**
 * After page transition completed.
 *
 * @type {String}
 */
var TRANSITION_COMPLETE = exports.TRANSITION_COMPLETE = 'SB_TRANSITION_COMPLETE';

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _loglevel = __webpack_require__(14);

var _loglevel2 = _interopRequireDefault(_loglevel);

var _jquery = __webpack_require__(24);

var _jquery2 = _interopRequireDefault(_jquery);

var _vanillaLazyload = __webpack_require__(137);

var _vanillaLazyload2 = _interopRequireDefault(_vanillaLazyload);

var _debounce = __webpack_require__(47);

var _debounce2 = _interopRequireDefault(_debounce);

var _Dispatcher = __webpack_require__(37);

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _EventTypes = __webpack_require__(45);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base class for creating page implementations.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 *
 * @abstract
 */
/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file AbstractPage.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

var AbstractPage = function () {
    /**
     * Base constructor for Pages.
     *
     * Do not override this method, override `init` method instead.
     *
     * @param  {Router}  router
     * @param  {HTMLElement}  container
     * @param  {String}  context
     * @param  {String}  type
     * @param  {Boolean} isHome
     *
     * @constructor
     */
    function AbstractPage(router, container, context, type, isHome) {
        (0, _classCallCheck3.default)(this, AbstractPage);

        type = type || 'page';

        if (!container) {
            throw new Error('AbstractPage need a container (HTMLElement) to be defined.');
        }

        if (!router) {
            throw new Error('AbstractPage need a Router instance to be defined.');
        }

        /**
         * Router
         *
         * @type {Router}
         */
        this.router = router;

        /**
         * Container element (Jquery)
         *
         * @type {jQuery}
         */
        this.$cont = (0, _jquery2.default)(container);

        if (!this.$cont) {
            throw new Error('AbstractPage: container not found!');
        }

        /**
         * Page id
         *
         * @type {String}
         */
        this.id = this.$cont.attr('id');

        if (!this.$cont) {
            throw new Error('AbstractPage: container have no id!');
        }

        /**
         * Page context (static or ajax)
         *
         * @type {String}
         */
        this.context = context;

        /**
         * Page type
         *
         * @type {String}
         */
        this.type = type;

        /**
         * Is home ?
         *
         * @type {Boolean}
         */
        this.isHome = isHome;

        /**
         * Lazyload instance
         *
         * @type {Lazyload|null}
         */
        this.lazyload = null;

        if (this.$cont.attr('data-is-home') === '1') {
            this.isHome = true;
        }

        /**
         * AbstractBlock collection.
         *
         * @type {Array<AbstractBlock>}
         */
        this.blocks = [];

        /**
         * Node name
         *
         * @type {String}
         */
        this.name = this.$cont.length ? this.$cont.attr('data-node-name') : '';
        this.metaTitle = this.$cont.length ? this.$cont.attr('data-meta-title') : '';

        // Binded methods
        this.onResize = this.onResize.bind(this);
        this.onResizeDebounce = (0, _debounce2.default)(this.onResize, 50, false);
        this.bindedUpdateBlocks = this.updateBlocks.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onLazyImageSet = this.onLazyImageSet.bind(this);
        this.onLazyImageLoad = this.onLazyImageLoad.bind(this);
        this.onLazyImageProcessed = this.onLazyImageProcessed.bind(this);

        // Debug
        _loglevel2.default.debug('✳️ #' + this.id + ' %c[' + type + '] [' + this.context + ']', 'color:grey');
    }

    /**
     * Initialize page.
     *
     * You should always extends this method in your child implementations instead
     * of extending page constructor.
     */


    (0, _createClass3.default)(AbstractPage, [{
        key: 'init',
        value: function init() {
            /**
             * jQuery blocks collection.
             *
             * @type {jQuery}
             */
            this.$blocks = this.$cont.find(this.router.options.pageBlockClass);
            /**
             * @type {Number}
             */
            this.blockLength = this.$blocks.length;
            if (this.blockLength) {
                this.initBlocks();
            }

            // Context
            if (this.router.options.ajaxEnabled && this.context === 'ajax') {
                this.initAjax();
            }

            // Lazyload
            if (this.router.options.lazyloadEnabled) {
                this.initLazyload();
            }

            this.initEvents();
        }

        /**
         * Destroy current page and all its blocks.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            _loglevel2.default.debug('🗑 #' + this.id);
            this.$cont.remove();
            this.destroyEvents();

            /*
             * Do not remove name class on body if destroyed page is the same as current one.
             */
            if (this.router.page !== null && this.router.page.name !== this.name) {
                this.router.$body.removeClass(this.name);
            }

            /*
             * Do not remove type class on body if destroyed page is the same as current one.
             */
            if (this.router.page !== null && this.router.page.type !== this.type) {
                this.router.$body.removeClass(this.type);
            }

            // --- Blocks --- //
            if (this.blocks !== null) {
                for (var blockIndex in this.blocks) {
                    this.blocks[blockIndex].destroy();
                }
            }
            /*
             * Remove Lazyload instance and listeners
             */
            if (this.lazyload !== null) {
                this.lazyload.destroy();
            }
        }

        /**
         * Initialize basic events.
         *
         * Such as waitForImages.
         */

    }, {
        key: 'initEvents',
        value: function initEvents() {
            if (this.$cont.find('img').length) {
                this.$cont.waitForImages({
                    finished: this.onLoad,
                    waitForAll: true
                });
            } else {
                this.onLoad();
            }

            window.addEventListener('resize', this.onResizeDebounce);

            this.domObserver = new window.MutationObserver(this.bindedUpdateBlocks);
            this.domObserver.observe(this.$cont.get(0), {
                childList: true,
                attributes: false,
                characterData: false,
                subtree: true
            });
        }

        /**
         * Destroy events
         */

    }, {
        key: 'destroyEvents',
        value: function destroyEvents() {
            window.removeEventListener('resize', this.onResizeDebounce);
            this.domObserver.disconnect();
        }

        /**
         * Init lazyload
         *
         * @private
         */

    }, {
        key: 'initLazyload',
        value: function initLazyload() {
            this.beforeLazyload();
            this.lazyload = new _vanillaLazyload2.default({
                threshold: this.router.options.lazyloadThreshold,
                throttle: this.router.options.lazyloadThrottle,
                elements_selector: '.' + this.router.options.lazyloadClass,
                data_src: this.router.options.lazyloadSrcAttr.replace('data-', ''),
                data_srcset: this.router.options.lazyloadSrcSetAttr.replace('data-', ''),
                callback_set: this.onLazyImageSet,
                callback_load: this.onLazyImageLoad,
                callback_processed: this.onLazyImageProcessed
            });
        }
    }, {
        key: 'checkLazyload',
        value: function checkLazyload() {
            if (this.lazyload) {
                this.lazyload.update();
            }
        }

        /**
         * @private
         */

    }, {
        key: 'onLoad',
        value: function onLoad() {
            /**
             * Date when onLoad was triggered.
             * @type {Date}
             */
            this.loadDate = new Date();
            /**
             * Duration between router loaded page and when onLoad was triggered.
             * @type {Date}
             */
            this.loadDuration = this.loadDate - this.router.loadBeginDate;
            this.router.nav.update(this);

            _Dispatcher2.default.commit(_EventTypes.BEFORE_PAGE_SHOW, this);
        }
    }, {
        key: 'updateLazyload',
        value: function updateLazyload() {
            if (this.lazyload) {
                this.lazyload.update();
            }
        }

        /**
         * @param {Function} onShow
         */

    }, {
        key: 'show',
        value: function show(onShow) {
            _loglevel2.default.debug('▶️ #' + this.id);
            this.$cont[0].style.opacity = '1';
            if (typeof onShow !== 'undefined') onShow();
            _Dispatcher2.default.commit(_EventTypes.AFTER_PAGE_SHOW, this);
        }

        /**
         * @param {Function} onHidden
         */

    }, {
        key: 'hide',
        value: function hide(onHidden) {
            _Dispatcher2.default.commit(_EventTypes.BEFORE_PAGE_HIDE, this);
            _loglevel2.default.debug('◀️ #' + this.id);
            this.$cont[0].style.opacity = '0';
            if (typeof onHidden !== 'undefined') onHidden();
            _Dispatcher2.default.commit(_EventTypes.AFTER_PAGE_HIDE, this);
        }
    }, {
        key: 'initAjax',
        value: function initAjax() {
            this.$cont.addClass(this.router.options.pageClass + '-transitioning');
        }

        /**
         * Initialize page blocks on page.
         */

    }, {
        key: 'initBlocks',
        value: function initBlocks() {
            for (var blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {
                /**
                 * New Block.
                 *
                 * @type {AbstractBlock}
                 */
                var block = this.initSingleBlock(this.$blocks.eq(blockIndex));
                /*
                 * Prevent undefined blocks to be appended to block collection.
                 */
                if (block) {
                    this.blocks.push(block);
                }
            }
            /*
             * Notify all blocks that page init is over.
             */
            for (var i = this.blocks.length - 1; i >= 0; i--) {
                if (typeof this.blocks[i].onPageReady === 'function') this.blocks[i].onPageReady();
            }
        }

        /**
         * Append new blocks which were not present at init.
         */

    }, {
        key: 'updateBlocks',
        value: function updateBlocks() {
            var _this = this;

            _loglevel2.default.debug('\t📯 Page DOM changed…');

            /*
             * Update Lazyload if init.
             */
            if (this.lazyload) {
                this.lazyload.update();
            }

            /*
             * Create new blocks
             */
            this.$blocks = this.$cont.find(this.router.options.pageBlockClass);
            this.blockLength = this.$blocks.length;

            this.$blocks.each(function (blockIndex, el) {
                var block = _this.getBlockById(el.id);
                if (block === null) {
                    var _block = _this.initSingleBlock(_this.$blocks.eq(blockIndex));
                    // Prevent undefined blocks to be appended to block collection.
                    if (_block) {
                        _this.blocks.push(_block);
                        _block.onPageReady();
                    }
                }
            });
        }

        /**
         * @param {jQuery} $singleBlock
         * @return {AbstractBlock}
         */

    }, {
        key: 'initSingleBlock',
        value: function initSingleBlock($singleBlock) {
            var type = $singleBlock[0].getAttribute(this.router.options.objectTypeAttr);

            return this.router.classFactory.getBlockInstance(type, this, $singleBlock);
        }

        /**
         * Get a page block instance from its `id`.
         *
         * @param  {String} id
         * @return {AbstractBlock|null}
         */

    }, {
        key: 'getBlockById',
        value: function getBlockById(id) {
            var index = this.getBlockIndexById(id);
            if (this.blocks[index]) {
                return this.blocks[index];
            }
            return null;
        }

        /**
         * Get a page block index from its `id`.
         *
         * @param  {String} id
         * @return {*|null}
         */

    }, {
        key: 'getBlockIndexById',
        value: function getBlockIndexById(id) {
            for (var i in this.blocks) {
                if (this.blocks.hasOwnProperty(i)) {
                    if (this.blocks[i] && this.blocks[i].id && this.blocks[i].id === id) {
                        return i;
                    }
                }
            }
            return null;
        }

        /**
         * Get the first page block instance from its `type`.
         *
         * @param  {String} type
         * @return {AbstractBlock|null}
         */

    }, {
        key: 'getFirstBlockByType',
        value: function getFirstBlockByType(type) {
            var index = this.getFirstBlockIndexByType(type);
            if (this.blocks[index]) {
                return this.blocks[index];
            }
            return null;
        }

        /**
         * Get the first page block index from its `type`.
         *
         * @param  {String} type
         * @return {*|null}
         */

    }, {
        key: 'getFirstBlockIndexByType',
        value: function getFirstBlockIndexByType(type) {
            for (var i in this.blocks) {
                if (this.blocks.hasOwnProperty(i)) {
                    if (this.blocks[i] && this.blocks[i].type && this.blocks[i].type === type) {
                        return i;
                    }
                }
            }
            return null;
        }

        /**
         * @abstract
         */

    }, {
        key: 'onResize',
        value: function onResize() {}

        /**
         * Called before init lazyload images.
         */

    }, {
        key: 'beforeLazyload',
        value: function beforeLazyload() {}

        /**
         * After image src switched.
         *
         * @abstract
         * @param {HTMLImageElement} element
         */

    }, {
        key: 'onLazyImageSet',
        value: function onLazyImageSet(element) {
            _loglevel2.default.debug('\t🖼 «' + element.id + '» set');
        }

        /**
         * After lazyload image loaded.
         *
         * @abstract
         * @param {HTMLImageElement} element
         */

    }, {
        key: 'onLazyImageLoad',
        value: function onLazyImageLoad(element) {
            _loglevel2.default.debug('\t🖼 «' + element.id + '» load');
        }

        /**
         * Before lazyload.
         *
         * @abstract
         */

    }, {
        key: 'onLazyImageProcessed',
        value: function onLazyImageProcessed(index) {
            _loglevel2.default.debug('\t🖼 Lazy load processed');
        }
    }]);
    return AbstractPage;
}();

exports.default = AbstractPage;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = debounce;
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered.
 *
 * The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @see   http://davidwalsh.name/javascript-debounce-function
 * @param {Function} func     [function to debounce]
 * @param {Number} wait       [time to wait]
 * @param {Boolean} immediate []
 */
function debounce(func, wait, immediate) {
    var timeout = void 0;
    return function () {
        var context = this;
        var args = arguments;
        var later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(28)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(80)(false);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(16);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(31);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file CacheProvider.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

/**
 * Cache provider class.
 *
 * This class stores Ajax response in memory.
 */
var CacheProvider = function () {
  function CacheProvider() {
    (0, _classCallCheck3.default)(this, CacheProvider);

    this.data = {};
  }

  /**
   * @param  {String} key
   * @return {Boolean}
   */


  (0, _createClass3.default)(CacheProvider, [{
    key: "exists",
    value: function exists(key) {
      return key in this.data;
    }

    /**
     * @param  {String} href
     * @return {Object}
     */

  }, {
    key: "get",
    value: function get(href) {
      return this.data[href];
    }

    /**
     * @param  {String} key
     * @param  {Object} data
     * @return {CacheProvider}  this
     */

  }, {
    key: "set",
    value: function set(key, data) {
      this.data[key] = data;
      return this;
    }

    /**
     * Flush the cache
     */

  }, {
    key: "reset",
    value: function reset() {
      this.data = {};
    }
  }]);
  return CacheProvider;
}();

exports.default = CacheProvider;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports) {



/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(88)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(56)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(57);
var hide = __webpack_require__(9);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(17);
var $iterCreate = __webpack_require__(89);
var setToStringTag = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(59);
var ITERATOR = __webpack_require__(4)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(36);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
var global = __webpack_require__(3);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(17);
var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(16);
var TAG = __webpack_require__(4)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(6);
var aFunction = __webpack_require__(19);
var SPECIES = __webpack_require__(4)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var invoke = __webpack_require__(100);
var html = __webpack_require__(58);
var cel = __webpack_require__(28);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(16)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var isObject = __webpack_require__(10);
var newPromiseCapability = __webpack_require__(39);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(5);
var core = __webpack_require__(2);
var fails = __webpack_require__(13);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(109);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(111);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(49);
var hiddenKeys = __webpack_require__(34).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Utils = __webpack_require__(18);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base class for creating transition.
 *
 * @abstract
 */
var AbstractTransition = function () {
  /**
   * Constructor.
   * Do not override this method.
   *
   * @constructor
   */
  function AbstractTransition() {
    (0, _classCallCheck3.default)(this, AbstractTransition);

    /**
     * @type {AbstractPage} old Page instance
     */
    this.oldPage = undefined;

    /**
     * @type {AbstractPage}
     */
    this.newPage = undefined;

    /**
     * @type {Promise}
     */
    this.newPageLoading = undefined;
  }

  /**
   * Initialize transition.
   * Do not override this method.
   *
   * @param {AbstractPage} oldPage
   * @param {Promise} newPagePromise
   * @returns {Promise}
   */


  (0, _createClass3.default)(AbstractTransition, [{
    key: 'init',
    value: function init(oldPage, newPagePromise) {
      var _this = this;

      this.oldPage = oldPage;
      this._newPagePromise = newPagePromise;

      this.deferred = _Utils2.default.deferred();
      this.newPageReady = _Utils2.default.deferred();
      this.newPageLoading = this.newPageReady.promise;

      this.start();

      this._newPagePromise.then(function (newPage) {
        _this.newPage = newPage;
        _this.newPageReady.resolve();
      });

      return this.deferred.promise;
    }

    /**
     * Call this function when the Transition is finished.
     */

  }, {
    key: 'done',
    value: function done() {
      this.oldPage.destroy();
      this.newPage.$cont[0].style.visibility = 'visible';
      this.newPage.checkLazyload();
      this.deferred.resolve();
    }

    /**
     * Entry point to create a custom Transition.
     * @abstract
     */

  }, {
    key: 'start',
    value: function start() {}
  }]);
  return AbstractTransition;
}(); /**
      * Copyright © 2016, Ambroise Maupate
      *
      * Permission is hereby granted, free of charge, to any person obtaining a copy
      * of this software and associated documentation files (the "Software"), to deal
      * in the Software without restriction, including without limitation the rights
      * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      * copies of the Software, and to permit persons to whom the Software is furnished
      * to do so, subject to the following conditions:
      *
      * The above copyright notice and this permission notice shall be included in all
      * copies or substantial portions of the Software.
      *
      * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
      * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
      * IN THE SOFTWARE.
      *
      * @file AbstractTransition.js
      * @author Quentin Neyraud
      * @author Adrien Scholaert
      */


exports.default = AbstractTransition;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _loglevel = __webpack_require__(14);

var _loglevel2 = _interopRequireDefault(_loglevel);

var _debounce = __webpack_require__(47);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base class for creating block implementations.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 *
 * @abstract
 */
/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file AbstractBlock.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

var AbstractBlock = function () {
  /**
   * Abstract block constructor.
   *
   * It‘s better to extend this class by using `init` method instead
   * of extending `constructor`.
   *
   * @param  {AbstractPage} page
   * @param  {jQuery} $cont
   * @param  {String} type
   *
   * @constructor
   */
  function AbstractBlock(page, $cont, type) {
    (0, _classCallCheck3.default)(this, AbstractBlock);

    type = type || 'block';

    /**
     * Current page instance
     *
     * @type {AbstractPage}
     */
    this.page = page;

    /**
     * Container
     * jQuery DOM object for current block.
     *
     * @type {jQuery}
     */
    this.$cont = $cont;

    /**
     * Block id
     *
     * @type {String}
     */
    this.id = $cont.attr('id');

    /**
     * Block type
     *
     * @type {String}
     */
    this.type = type;

    /**
     * Node name
     *
     * @type {String}
     */
    this.name = this.$cont.length ? this.$cont.attr('data-node-name') : '';

    // Binded methods
    this.onResize = this.onResize.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onResizeDebounce = (0, _debounce2.default)(this.onResize, 50, false);

    // Debugs
    _loglevel2.default.debug('\t✳️ #' + this.id + ' %c[' + type + ']', 'color:grey');

    this.init();
    this.initEvents();
  }

  /**
   * Basic members initialization for children classes.
   * Do not search for page blocks here, use `onPageReady` method instead
   *
   * @abstract
   */


  (0, _createClass3.default)(AbstractBlock, [{
    key: 'init',
    value: function init() {}

    /**
     * Bind load and resize events for this specific block.
     *
     * Do not forget to call `super.initEvents();` while extending this method.
     *
     * @abstract
     */

  }, {
    key: 'initEvents',
    value: function initEvents() {
      if (this.$cont.find('img').length) {
        this.$cont.waitForImages({
          finished: this.onLoad,
          waitForAll: true
        });
      } else {
        this.onLoad();
      }

      window.addEventListener('resize', this.onResizeDebounce);
    }

    /**
     * Destroy current block.
     *
     * Do not forget to call `super.destroy();` while extending this method.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      _loglevel2.default.debug('\t🗑 #' + this.id);
      this.destroyEvents();
    }

    /**
     * Unbind event block events.
     *
     * Make sure you’ve used binded methods to be able to
     * `off` them correctly.
     *
     * Do not forget to call `super.destroyEvents();` while extending this method.
     *
     * @abstract
     */

  }, {
    key: 'destroyEvents',
    value: function destroyEvents() {
      window.removeEventListener('resize', this.onResizeDebounce);
    }

    /**
     * Called on window resize
     *
     * @abstract
     */

  }, {
    key: 'onResize',
    value: function onResize() {}

    /**
     * Called once images are loaded
     *
     * @abstract
     */

  }, {
    key: 'onLoad',
    value: function onLoad() {}

    /**
     * Called once all page blocks have been created.
     *
     * @abstract
     */

  }, {
    key: 'onPageReady',
    value: function onPageReady() {}
  }]);
  return AbstractBlock;
}();

exports.default = AbstractBlock;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file AbstractNav.js
 * @author Ambroise Maupate
 */

/**
 * Base class for handling your website main navigation.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 *
 * @abstract
 */
var AbstractNav = function () {
  /**
   * Interface for a navigation element.
   *
   * Any child implementations must implements
   * update method.
   *
   * @constructor
   */
  function AbstractNav() {
    (0, _classCallCheck3.default)(this, AbstractNav);

    /**
     * Page DOM section.
     *
     * @type {jQuery}
     */
    this.$cont = null;

    /**
     * Main router.
     *
     * @type {Router}
     */
    this.router = null;

    /**
     * Current active page.
     *
     * **First page won’t be available**.
     * @type {AbstractPage|null}
     */
    this.page = null;
  }

  /**
   * Update navigation state against a DOM container.
   *
   * @abstract
   * @param {AbstractPage} page
   */


  (0, _createClass3.default)(AbstractNav, [{
    key: 'update',
    value: function update(page) {
      if (!page) {
        throw new Error('Nav update method needs a Page object.');
      }

      this.page = page;
    }

    /**
     * Bind navigation against router.
     *
     * @param {Router} router
     * @abstract
     */

  }, {
    key: 'initEvents',
    value: function initEvents(router) {
      if (!router) {
        throw new Error('Nav initEvents method needs a Router object.');
      }
      this.router = router;
    }
  }]);
  return AbstractNav;
}();

exports.default = AbstractNav;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _loglevel = __webpack_require__(14);

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handle your application main loader animation.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 */
var GraphicLoader = function () {
  /**
   * Interface for a graphic loader element.
   *
   * Any child implementations must implements
   * show and hide methods.
   *
   * @abstract
   */
  function GraphicLoader() {
    (0, _classCallCheck3.default)(this, GraphicLoader);

    _loglevel2.default.debug('🌀 Construct loader');
  }

  /**
   * Show loader.
   *
   * @abstract
   */


  (0, _createClass3.default)(GraphicLoader, [{
    key: 'show',
    value: function show() {
      _loglevel2.default.debug('🌀 Show loader');
    }

    /**
     * Hide loader.
     *
     * @abstract
     */

  }, {
    key: 'hide',
    value: function hide() {
      _loglevel2.default.debug('🌀 Hide loader');
    }
  }]);
  return GraphicLoader;
}(); /**
      * Copyright © 2016, Ambroise Maupate
      *
      * Permission is hereby granted, free of charge, to any person obtaining a copy
      * of this software and associated documentation files (the "Software"), to deal
      * in the Software without restriction, including without limitation the rights
      * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      * copies of the Software, and to permit persons to whom the Software is furnished
      * to do so, subject to the following conditions:
      *
      * The above copyright notice and this permission notice shall be included in all
      * copies or substantial portions of the Software.
      *
      * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
      * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
      * IN THE SOFTWARE.
      *
      * @file GraphicLoader.js
      * @author Ambroise Maupate
      */


exports.default = GraphicLoader;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BootstrapMedia = exports.debounce = exports.gaTrackErrors = exports.polyfills = exports.Scroll = exports.Utils = exports.AbstractTransition = exports.AbstractBlock = exports.AbstractNav = exports.AbstractPage = exports.GraphicLoader = exports.CacheProvider = exports.Router = undefined;

var _Router = __webpack_require__(74);

var _Router2 = _interopRequireDefault(_Router);

var _CacheProvider = __webpack_require__(52);

var _CacheProvider2 = _interopRequireDefault(_CacheProvider);

var _GraphicLoader = __webpack_require__(72);

var _GraphicLoader2 = _interopRequireDefault(_GraphicLoader);

var _AbstractPage = __webpack_require__(46);

var _AbstractPage2 = _interopRequireDefault(_AbstractPage);

var _AbstractNav = __webpack_require__(71);

var _AbstractNav2 = _interopRequireDefault(_AbstractNav);

var _AbstractBlock = __webpack_require__(70);

var _AbstractBlock2 = _interopRequireDefault(_AbstractBlock);

var _AbstractTransition = __webpack_require__(69);

var _AbstractTransition2 = _interopRequireDefault(_AbstractTransition);

var _Utils = __webpack_require__(18);

var _Utils2 = _interopRequireDefault(_Utils);

var _Scroll = __webpack_require__(139);

var _Scroll2 = _interopRequireDefault(_Scroll);

var _polyfills = __webpack_require__(140);

var _polyfills2 = _interopRequireDefault(_polyfills);

var _gaTrackErrors = __webpack_require__(141);

var _gaTrackErrors2 = _interopRequireDefault(_gaTrackErrors);

var _debounce = __webpack_require__(47);

var _debounce2 = _interopRequireDefault(_debounce);

var _BootstrapMedia = __webpack_require__(144);

var _BootstrapMedia2 = _interopRequireDefault(_BootstrapMedia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @private */
var Router = exports.Router = _Router2.default;
/** @private */
var CacheProvider = exports.CacheProvider = _CacheProvider2.default;
/** @private */
var GraphicLoader = exports.GraphicLoader = _GraphicLoader2.default;
/** @private */
var AbstractPage = exports.AbstractPage = _AbstractPage2.default;
/** @private */
var AbstractNav = exports.AbstractNav = _AbstractNav2.default;
/** @private */
var AbstractBlock = exports.AbstractBlock = _AbstractBlock2.default;
/** @private */
var AbstractTransition = exports.AbstractTransition = _AbstractTransition2.default;
/** @private */
var Utils = exports.Utils = _Utils2.default;
/** @private */
var Scroll = exports.Scroll = _Scroll2.default;
/** @private */
var polyfills = exports.polyfills = _polyfills2.default;
/** @private */
var gaTrackErrors = exports.gaTrackErrors = _gaTrackErrors2.default;
/** @private */
var debounce = exports.debounce = _debounce2.default;
/** @private */
var BootstrapMedia = exports.BootstrapMedia = _BootstrapMedia2.default;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(75);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = __webpack_require__(24);

var _jquery2 = _interopRequireDefault(_jquery);

var _CacheProvider = __webpack_require__(52);

var _CacheProvider2 = _interopRequireDefault(_CacheProvider);

var _Dispatcher = __webpack_require__(37);

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _TransitionFactory = __webpack_require__(85);

var _TransitionFactory2 = _interopRequireDefault(_TransitionFactory);

var _EventTypes = __webpack_require__(45);

var _Prefetch = __webpack_require__(127);

var _Prefetch2 = _interopRequireDefault(_Prefetch);

var _History = __webpack_require__(128);

var _History2 = _interopRequireDefault(_History);

var _Pjax = __webpack_require__(129);

var _Pjax2 = _interopRequireDefault(_Pjax);

var _Dom = __webpack_require__(130);

var _Dom2 = _interopRequireDefault(_Dom);

var _ClassFactory = __webpack_require__(131);

var _ClassFactory2 = _interopRequireDefault(_ClassFactory);

var _AbstractNav = __webpack_require__(71);

var _AbstractNav2 = _interopRequireDefault(_AbstractNav);

var _GraphicLoader = __webpack_require__(72);

var _GraphicLoader2 = _interopRequireDefault(_GraphicLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file Router.js
 * @author Ambroise Maupate
 */

var DEFAULT_OPTIONS = {
    homeHasClass: false,
    ajaxEnabled: true,
    pageClass: 'page-content',
    ajaxWrapperId: 'sb-wrapper',
    objectTypeAttr: 'data-node-type',
    ajaxLinkTypeAttr: 'data-node-type',
    noAjaxLinkClass: 'no-ajax-link',
    noPrefetchLinkClass: 'no-prefetch',
    navLinkClass: 'nav-link',
    activeClass: 'active',
    pageBlockClass: '.page-block',
    lazyloadEnabled: false,
    prefetchEnabled: true,
    lazyloadSrcAttr: 'data-src',
    lazyloadClass: 'lazyload',
    lazyloadSrcSetAttr: 'data-srcset',
    lazyloadThreshold: 300,
    lazyloadThrottle: 150,
    minLoadDuration: 0,
    preLoadPageDelay: 0,
    useCache: false,
    classFactory: null,
    graphicLoader: null,
    nav: null,
    transitionFactory: null

    /**
     * Application main page router.
     */
};
var Router = function () {
    /**
     * Create a new Router.
     *
     * ### Default options list:
     *
     * | Options | Default value |
     * | ----- | ----- |
     * | `homeHasClass` | `false` |
     * | `ajaxEnabled` | `true` |
     * | `pageClass` | "page-content" **without point!** |
     * | `objectTypeAttr` | "data-node-type" |
     * | `ajaxLinkTypeAttr`  | "data-node-type" |
     * | `noAjaxLinkClass` | "no-ajax-link" |
     * | `noPrefetchLinkClass` | "no-prefetch" |
     * | `navLinkClass` | "nav-link" |
     * | `activeClass` | "active" |
     * | `useCache` | `true` |
     * | `pageBlockClass` | `".page-block"` **with point!** |
     * | `lazyloadEnabled` | `false` |
     * | `lazyloadSrcAttr` | "data-src" |
     * | `lazyloadClass` | "lazyload" |
     * | `lazyloadSrcSetAttr` | "data-src-set" |
     * | `lazyloadThreshold` | `300` |
     * | `lazyloadThrottle` | `150` |
     * | `minLoadDuration` | `0` |
     * | `preLoadPageDelay` |  |
     * | `classFactory` | ClassFactory instance |
     * | `graphicLoader` | GraphicLoader instance |
     * | `nav` | AbstractNav instance |
     * | `transitionFactory` | TransitionFactory instance |
     *
     *
     * @param {Object} options
     */
    function Router() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, Router);

        /**
         * @type {Object}
         */
        this.options = (0, _extends3.default)({}, DEFAULT_OPTIONS, options);

        if (!window.location.origin) {
            window.location.origin = window.location.protocol + '//' + window.location.host;
        }

        /**
         * Transition factory instance to manage page transition
         * @type {TransitionFactory}
         */
        this.transitionFactory = null;

        if (!this.options.graphicLoader) {
            /**
             * @type {GraphicLoader}
             */
            this.loader = new _GraphicLoader2.default();
        } else {
            this.loader = this.options.graphicLoader;
        }

        if (!this.options.classFactory) {
            /**
             * Class factory instance to manage page type and blocks.
             *
             * @type {ClassFactory}
             */
            this.classFactory = new _ClassFactory2.default();
        } else {
            this.classFactory = this.options.classFactory;
        }

        if (!this.options.nav) {
            this.nav = new _AbstractNav2.default();
        } else {
            this.nav = this.options.nav;
        }
        this.nav.router = this;

        /* Check if ajax is enable */
        if (this.options.ajaxEnabled) {
            /* If enabled, we use a transition factory to manage page transition */
            this.transitionFactory = this.options.transitionFactory || new _TransitionFactory2.default();
        }

        /**
         * Base url
         * @type {String}
         */
        this.baseUrl = window.location.origin;

        /**
         * Page instance
         * @type {AbstractPage|null}
         */
        this.page = null;

        /**
         * Transition instance
         * @type {AbstractTransition|boolean}
         */
        this.transition = false;

        /**
         * Prefetch instance
         * @type {null}
         */
        this.prefetch = null;

        /**
         * Cache provider instance
         * @type {CacheProvider|null}
         */
        this.cacheProvider = null;

        /**
         * History instance
         * @type {History|null}
         */
        this.history = null;

        /**
         * Dom instance
         * @type {Dom|null}
         */
        this.dom = null;

        /**
         * Pjax instance
         * @type {Pjax|null}
         */
        this.pjax = null;

        this.$body = (0, _jquery2.default)(document.body);

        // Binded methods
        this.buildPage = this.buildPage.bind(this);
    }

    (0, _createClass3.default)(Router, [{
        key: 'init',
        value: function init() {
            this.dom = new _Dom2.default(this.$body, {
                wrapperId: this.options.ajaxWrapperId,
                objectTypeAttr: this.options.objectTypeAttr,
                containerClass: this.options.pageClass
            });

            // Init pjax is ajax enable
            if (this.options.ajaxEnabled) {
                this.cacheProvider = new _CacheProvider2.default();
                this.history = new _History2.default();

                var pjaxOptions = {
                    ignoreClassLink: this.options.noAjaxLinkClass,
                    cacheEnabled: this.options.useCache
                };

                this.pjax = new _Pjax2.default(this, this.history, this.dom, this.cacheProvider, this.transitionFactory, this.loader, pjaxOptions);
                this.pjax.init();
            }

            // Init prefetch if ajax and prefetch option are enabled
            if (this.options.ajaxEnabled && this.options.prefetchEnabled) {
                this.prefetch = new _Prefetch2.default(this.pjax, this.cacheProvider, {
                    cacheEnabled: this.options.useCache,
                    noPrefetchLinkClass: this.options.noPrefetchLinkClass
                });
                this.prefetch.init();
            }

            // Build first page with static context
            this.buildPage(this.dom.getContainer(), 'static');
            this.initEvents();
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {}

        /**
         * Build a new page instance.
         *
         * @param {HTMLElement} container
         * @param {String} context
         * @returns {AbstractPage|null}
         */

    }, {
        key: 'buildPage',
        value: function buildPage(container) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ajax';

            if (!container) throw new Error('Router: container not found!');

            // Get page
            this.page = this.classFactory.getPageInstance(this.dom.getNodeType(container), this, container, context);

            // Init page
            this.page.init();

            // Dispatch an event to inform that the new page is ready
            _Dispatcher2.default.commit(_EventTypes.AFTER_PAGE_BOOT, this.page);

            return this.page;
        }
    }]);
    return Router;
}();

exports.default = Router;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(76);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(5);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(79) });


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(35);
var pIE = __webpack_require__(23);
var toObject = __webpack_require__(36);
var IObject = __webpack_require__(50);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(13)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(51);
var toAbsoluteIndex = __webpack_require__(81);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(31);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _DefaultTransition = __webpack_require__(86);

var _DefaultTransition2 = _interopRequireDefault(_DefaultTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transition mapper class.
 *
 * This class maps your `data-transition` with your *ES6* classes.
 *
 * **You must define your own ClassFactory for each of your projects.**.
 */
var TransitionFactory = function () {
  function TransitionFactory() {
    (0, _classCallCheck3.default)(this, TransitionFactory);
  }

  (0, _createClass3.default)(TransitionFactory, [{
    key: 'getTransition',

    /**
     * Get Transition
     *
     * @param {Object} previousState
     * @param {Object} state
     * @returns {AbstractTransition}
     */
    value: function getTransition(previousState, state) {
      /**
       * You can customise transition logic with the previousState and the new state
       *
       * Ex: when back or prev button its pressed we use FadeTransition
       */
      if (state && state.context === 'history') {
        return new _DefaultTransition2.default();
      }

      var transition = void 0;

      switch (state.transitionName) {
        default:
          transition = new _DefaultTransition2.default();
          break;
      }

      return transition;
    }
  }]);
  return TransitionFactory;
}(); /**
      * Copyright © 2016, Ambroise Maupate
      *
      * Permission is hereby granted, free of charge, to any person obtaining a copy
      * of this software and associated documentation files (the "Software"), to deal
      * in the Software without restriction, including without limitation the rights
      * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      * copies of the Software, and to permit persons to whom the Software is furnished
      * to do so, subject to the following conditions:
      *
      * The above copyright notice and this permission notice shall be included in all
      * copies or substantial portions of the Software.
      *
      * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
      * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
      * IN THE SOFTWARE.
      *
      * @file TransitionFactory.js
      * @author Quentin Neyraud
      * @author Adrien Scholaert
      */

exports.default = TransitionFactory;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(53);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(27);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(44);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractTransition2 = __webpack_require__(69);

var _AbstractTransition3 = _interopRequireDefault(_AbstractTransition2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default Transition. Show / Hide content.
 *
 * @extends {AbstractTransition}
 */
var DefaultTransition = function (_AbstractTransition) {
    (0, _inherits3.default)(DefaultTransition, _AbstractTransition);

    function DefaultTransition() {
        (0, _classCallCheck3.default)(this, DefaultTransition);
        return (0, _possibleConstructorReturn3.default)(this, (DefaultTransition.__proto__ || (0, _getPrototypeOf2.default)(DefaultTransition)).apply(this, arguments));
    }

    (0, _createClass3.default)(DefaultTransition, [{
        key: 'start',
        value: function start() {
            _promise2.default.all([this.newPageLoading]).then(this.finish.bind(this));
        }
    }, {
        key: 'finish',
        value: function finish() {
            document.body.scrollTop = 0;
            this.done();
        }
    }]);
    return DefaultTransition;
}(_AbstractTransition3.default); /**
                                  * Copyright © 2016, Ambroise Maupate
                                  *
                                  * Permission is hereby granted, free of charge, to any person obtaining a copy
                                  * of this software and associated documentation files (the "Software"), to deal
                                  * in the Software without restriction, including without limitation the rights
                                  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                  * copies of the Software, and to permit persons to whom the Software is furnished
                                  * to do so, subject to the following conditions:
                                  *
                                  * The above copyright notice and this permission notice shall be included in all
                                  * copies or substantial portions of the Software.
                                  *
                                  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                                  * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
                                  * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
                                  * IN THE SOFTWARE.
                                  *
                                  * @file DefaultTransition.js
                                  * @author Quentin Neyraud
                                  * @author Adrien Scholaert
                                  */


exports.default = DefaultTransition;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
__webpack_require__(55);
__webpack_require__(60);
__webpack_require__(94);
__webpack_require__(105);
__webpack_require__(106);
module.exports = __webpack_require__(2).Promise;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(31);
var defined = __webpack_require__(30);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(38);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(26);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(6);
var getKeys = __webpack_require__(21);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(92);
var step = __webpack_require__(93);
var Iterators = __webpack_require__(17);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(56)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var global = __webpack_require__(3);
var ctx = __webpack_require__(15);
var classof = __webpack_require__(61);
var $export = __webpack_require__(5);
var isObject = __webpack_require__(10);
var aFunction = __webpack_require__(19);
var anInstance = __webpack_require__(95);
var forOf = __webpack_require__(96);
var speciesConstructor = __webpack_require__(62);
var task = __webpack_require__(63).set;
var microtask = __webpack_require__(101)();
var newPromiseCapabilityModule = __webpack_require__(39);
var perform = __webpack_require__(64);
var promiseResolve = __webpack_require__(65);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(4)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(102)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(26)($Promise, PROMISE);
__webpack_require__(103)(PROMISE);
Wrapper = __webpack_require__(2)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(104)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var call = __webpack_require__(97);
var isArrayIter = __webpack_require__(98);
var anObject = __webpack_require__(6);
var toLength = __webpack_require__(51);
var getIterFn = __webpack_require__(99);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(6);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(17);
var ITERATOR = __webpack_require__(4)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(61);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(17);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 100 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(63).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(16)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(8);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(4)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(5);
var core = __webpack_require__(2);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(62);
var promiseResolve = __webpack_require__(65);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(5);
var newPromiseCapability = __webpack_require__(39);
var perform = __webpack_require__(64);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
module.exports = __webpack_require__(2).Object.getPrototypeOf;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(36);
var $getPrototypeOf = __webpack_require__(59);

__webpack_require__(66)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55);
__webpack_require__(60);
module.exports = __webpack_require__(41).f('iterator');


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(113);
__webpack_require__(54);
__webpack_require__(118);
__webpack_require__(119);
module.exports = __webpack_require__(2).Symbol;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(8);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(57);
var META = __webpack_require__(114).KEY;
var $fails = __webpack_require__(13);
var shared = __webpack_require__(33);
var setToStringTag = __webpack_require__(26);
var uid = __webpack_require__(22);
var wks = __webpack_require__(4);
var wksExt = __webpack_require__(41);
var wksDefine = __webpack_require__(42);
var enumKeys = __webpack_require__(115);
var isArray = __webpack_require__(116);
var anObject = __webpack_require__(6);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(29);
var createDesc = __webpack_require__(20);
var _create = __webpack_require__(38);
var gOPNExt = __webpack_require__(117);
var $GOPD = __webpack_require__(43);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(21);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(68).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(23).f = $propertyIsEnumerable;
  __webpack_require__(35).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(25)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(22)('meta');
var isObject = __webpack_require__(10);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(13)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(35);
var pIE = __webpack_require__(23);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(16);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(68).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42)('asyncIterator');


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42)('observable');


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(2).Object.setPrototypeOf;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(5);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(123).set });


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(10);
var anObject = __webpack_require__(6);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(15)(Function.call, __webpack_require__(43).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
var $Object = __webpack_require__(2).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(38) });


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Utils = __webpack_require__(18);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Prefetch.
 *
 * @type {Object}
 */
var Prefetch = function () {
    function Prefetch(pjax, cacheProvider) {
        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref$ignoreClassLink = _ref.ignoreClassLink,
            ignoreClassLink = _ref$ignoreClassLink === undefined ? 'no-prefetch' : _ref$ignoreClassLink,
            _ref$cacheEnabled = _ref.cacheEnabled,
            cacheEnabled = _ref$cacheEnabled === undefined ? true : _ref$cacheEnabled;

        (0, _classCallCheck3.default)(this, Prefetch);

        /**
         * Class name used to ignore prefetch on links.
         *
         * @type {string}
         * @default
         */
        this.ignoreClassLink = ignoreClassLink;
        this.cacheEnabled = cacheEnabled;
        this.pjax = pjax;
        this.cacheProvider = cacheProvider;
    }

    (0, _createClass3.default)(Prefetch, [{
        key: 'init',
        value: function init() {
            if (!window.history.pushState) {
                return false;
            }

            document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
            document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
        }
    }, {
        key: 'onLinkEnter',
        value: function onLinkEnter(evt) {
            var el = evt.target;

            while (el && !this.pjax.getHref(el)) {
                el = el.parentNode;
            }

            if (!el || el.classList.contains(this.ignoreClassLink)) {
                return;
            }

            var url = this.pjax.getHref(el);

            // Check if the link is elegible for Pjax
            if (this.pjax.preventCheck(evt, el) && !this.cacheProvider.get(url)) {
                var xhr = _Utils2.default.request(url);

                if (this.cacheEnabled) {
                    this.cacheProvider.set(url, xhr);
                }
            }
        }
    }]);
    return Prefetch;
}(); /**
      * Copyright © 2017, Ambroise Maupate
      *
      * Permission is hereby granted, free of charge, to any person obtaining a copy
      * of this software and associated documentation files (the "Software"), to deal
      * in the Software without restriction, including without limitation the rights
      * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      * copies of the Software, and to permit persons to whom the Software is furnished
      * to do so, subject to the following conditions:
      *
      * The above copyright notice and this permission notice shall be included in all
      * copies or substantial portions of the Software.
      *
      * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
      * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
      * IN THE SOFTWARE.
      *
      * @file Prefetch.js
      * @author Adrien Scholaert
      */

exports.default = Prefetch;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file History.js
 * @author Adrien Scholaert
 */

/**
 * HistoryManager helps to keep track of the navigation.
 *
 * @type {Object}
 */
var History = function () {
  function History() {
    (0, _classCallCheck3.default)(this, History);

    /**
     * Keep track of the status in historic order.
     *
     * @readOnly
     * @type {Array}
     */
    this.history = [];
  }

  /**
   * Add a new set of url and namespace.
   *
   * @param {String} url
   * @param {String} transitionName
   * @param {String} context (ajax, history)
   */


  (0, _createClass3.default)(History, [{
    key: "add",
    value: function add(url, transitionName, context) {
      this.history.push({ url: url, transitionName: transitionName, context: context });
    }

    /**
     * Return information about the current status.
     *
     * @return {Object}
     */

  }, {
    key: "currentStatus",
    value: function currentStatus() {
      return this.history[this.history.length - 1];
    }

    /**
     * Return information about the previous status.
     *
     * @return {Object}
     */

  }, {
    key: "prevStatus",
    value: function prevStatus() {
      var history = this.history;

      if (history.length < 2) {
        return null;
      }

      return history[history.length - 2];
    }
  }]);
  return History;
}();

exports.default = History;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Utils = __webpack_require__(18);

var _Utils2 = _interopRequireDefault(_Utils);

var _Dispatcher = __webpack_require__(37);

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _EventTypes = __webpack_require__(45);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pjax is a static object with main function.
 *
 * @type {Object}
 */
var Pjax = function () {
    /**
     * Constructor.
     *
     * @param {Router} router
     * @param {History} history
     * @param {Dom} dom
     * @param {CacheProvider} cache
     * @param {TransitionFactory} transitionFactory
     * @param {GraphicLoader} loader
     * @param {String} ignoreClassLink
     * @param {Boolean} cacheEnabled
     */
    function Pjax(router, history, dom, cache, transitionFactory, loader) {
        var _ref = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {},
            _ref$ignoreClassLink = _ref.ignoreClassLink,
            ignoreClassLink = _ref$ignoreClassLink === undefined ? 'no-ajax-link' : _ref$ignoreClassLink,
            _ref$cacheEnabled = _ref.cacheEnabled,
            cacheEnabled = _ref$cacheEnabled === undefined ? true : _ref$cacheEnabled;

        (0, _classCallCheck3.default)(this, Pjax);

        this.router = router;
        this.history = history;
        this.dom = dom;
        this.cache = cache;
        this.transitionFactory = transitionFactory;

        if (!this.router || !this.history || !this.dom || !this.cache || !this.transitionFactory) {
            throw new Error('Starting Blocks: a Pjax parameter is missing!');
        }

        /**
         * GraphicLoader.
         *
         * @type {GraphicLoader}
         */
        this.loader = loader;

        /**
         * Indicate wether or not use the cache.
         *
         * @type {Boolean}
         * @default
         */
        this.cacheEnabled = cacheEnabled;

        /**
         * Class name used to ignore links.
         *
         * @type {String}
         * @default
         */
        this.ignoreClassLink = ignoreClassLink;

        /**
         * Indicate if there is an animation in progress.
         *
         * @readOnly
         * @type {Boolean}
         */
        this.transitionProgress = false;

        // Binded methods
        this.onNewPageLoaded = this.onNewPageLoaded.bind(this);
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
        this.onLinkClick = this.onLinkClick.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
    }

    /**
     * Init the events.
     *
     * @private
     */


    (0, _createClass3.default)(Pjax, [{
        key: 'init',
        value: function init() {
            var wrapper = this.dom.getWrapper();
            wrapper.setAttribute('aria-live', 'polite');

            this.history.add(this.getCurrentUrl(), null, 'static');

            this.bindEvents();
        }

        /**
         * Attach the eventlisteners.
         *
         * @private
         */

    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            document.addEventListener('click', this.onLinkClick);
            window.addEventListener('popstate', this.onStateChange);
        }

        /**
         * Return the currentURL cleaned.
         *
         * @return {String} currentUrl
         */

    }, {
        key: 'getCurrentUrl',
        value: function getCurrentUrl() {
            // TODO, clean from what? currenturl do not takes hash..
            return _Utils2.default.cleanLink(_Utils2.default.getCurrentUrl());
        }

        /**
         * Change the URL with pushstate and trigger the state change.
         *
         * @param {String} url
         * @param {String} transitionName
         */

    }, {
        key: 'goTo',
        value: function goTo(url, transitionName) {
            var currentPosition = window.scrollY;
            window.history.pushState(null, null, url);
            window.scrollTo(0, currentPosition);
            this.onStateChange(transitionName);
        }

        /**
         * Force the browser to go to a certain url.
         *
         * @param {String} url
         * @private
         */

    }, {
        key: 'forceGoTo',
        value: function forceGoTo(url) {
            window.location = url;
        }

        /**
         * Load an url, will start an ajax request or load from the cache.
         *
         * @private
         * @param  {String} url
         * @return {Promise}
         */

    }, {
        key: 'load',
        value: function load(url) {
            var _this = this;

            var deferred = _Utils2.default.deferred();

            // Show loader
            if (this.loader) {
                this.loader.show();
            }

            // Check cache
            var request = this.cache.get(url);

            // If no cache, make request and cache it
            if (!request) {
                request = _Utils2.default.request(url);
                this.cache.set(url, request);
            }

            // When data are loaded
            request.then(function (data) {
                var container = _this.dom.parseResponse(data);

                // Dispatch an event
                _Dispatcher2.default.commit(_EventTypes.AFTER_PAGE_LOAD, {
                    container: container,
                    currentHTML: _this.dom.currentHTML
                });

                // Add new container to the DOM
                _this.dom.putContainer(container);

                // Dispatch an event
                _Dispatcher2.default.commit(_EventTypes.AFTER_DOM_APPENDED, {
                    container: container,
                    currentHTML: _this.dom.currentHTML
                });

                // Build page
                var page = _this.router.buildPage(container);

                if (!_this.cacheEnabled) {
                    _this.cache.reset();
                }

                deferred.resolve(page);
            }).catch(function (err) {
                console.error(err);
                _this.forceGoTo(url);
                deferred.reject();
            });

            return deferred.promise;
        }

        /**
         * Get the .href parameter out of an element
         * and handle special cases (like xlink:href).
         *
         * @private
         * @param  {HTMLElement} el
         * @return {String|undefined} href
         */

    }, {
        key: 'getHref',
        value: function getHref(el) {
            if (!el) {
                return undefined;
            }

            if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
                return el.getAttribute('xlink:href');
            }

            if (typeof el.href === 'string') {
                return el.href;
            }

            return undefined;
        }

        /**
         * Get transition name from HTMLElement attribute (data-transition).
         *
         * @param {HTMLElement} el
         * @returns {String|undefined} The transition name
         */

    }, {
        key: 'getTransitionName',
        value: function getTransitionName(el) {
            if (!el) {
                return null;
            }

            if (el.getAttribute && typeof el.getAttribute('data-transition') === 'string') {
                return el.getAttribute('data-transition');
            }

            return null;
        }

        /**
         * Callback called from click event.
         *
         * @private
         * @param {MouseEvent} evt
         */

    }, {
        key: 'onLinkClick',
        value: function onLinkClick(evt) {
            /**
             * @type {HTMLElement|Node|EventTarget}
             */
            var el = evt.target;

            // Go up in the nodelist until we
            // find something with an href
            while (el && !this.getHref(el)) {
                el = el.parentNode;
            }

            if (this.preventCheck(evt, el)) {
                evt.stopPropagation();
                evt.preventDefault();

                this.linkHash = el.hash.split('#')[1];

                var href = this.getHref(el);
                var transitionName = this.getTransitionName(el);
                this.goTo(href, transitionName);
            }
        }

        /**
         * Determine if the link should be followed.
         *
         * @param  {MouseEvent} evt
         * @param  {HTMLElement} element
         * @return {Boolean}
         */

    }, {
        key: 'preventCheck',
        value: function preventCheck(evt, element) {
            if (!window.history.pushState) {
                return false;
            }

            var href = this.getHref(element);

            // User
            if (!element || !href) {
                return false;
            }

            // Middle click, cmd click, and ctrl click
            if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) {
                return false;
            }

            // Ignore target with _blank target
            if (element.target && element.target === '_blank') {
                return false;
            }

            // Check if it's the same domain
            if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) {
                return false;
            }

            // Check if the port is the same
            if (_Utils2.default.getPort() !== _Utils2.default.getPort(element.port)) {
                return false;
            }

            // Ignore case when a hash is being tacked on the current URL
            // if (href.indexOf('#') > -1)
            //   return false;

            // Ignore case where there is download attribute
            if (element.getAttribute && typeof element.getAttribute('download') === 'string') {
                return false;
            }

            // In case you're trying to load the same page
            if (_Utils2.default.cleanLink(href) === _Utils2.default.cleanLink(window.location.href)) {
                return false;
            }

            return !element.classList.contains(this.ignoreClassLink);
        }

        /**
         * Return a transition object.
         *
         * @param  {object} prev historyManager
         * @param  {object} current historyManager
         * @return {AbstractTransition} Transition object
         */

    }, {
        key: 'getTransition',
        value: function getTransition(prev, current) {
            return this.transitionFactory.getTransition(prev, current);
        }

        /**
         * Method called after a 'popstate' or from .goTo().
         *
         * @private
         */

    }, {
        key: 'onStateChange',
        value: function onStateChange() {
            var transitionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var newUrl = this.getCurrentUrl();

            if (this.transitionProgress) {
                this.forceGoTo(newUrl);
            }

            if (this.history.currentStatus().url === newUrl) {
                return false;
            }

            // If transition name is a string, a link have been click
            // Otherwise back/forward buttons have been pressed
            if (typeof transitionName === 'string') {
                this.history.add(newUrl, transitionName, 'ajax');
            } else {
                this.history.add(newUrl, null, 'history');
            }

            // Dispatch an event to inform that the page is being load
            _Dispatcher2.default.commit(_EventTypes.BEFORE_PAGE_LOAD, {
                currentStatus: this.history.currentStatus(),
                prevStatus: this.history.prevStatus()
            });

            // Load the page with the new url (promise is return)
            var newPagePromise = this.load(newUrl);

            // Get the page transition instance (from prev and current state)
            var transition = this.getTransition(this.history.prevStatus(), this.history.currentStatus());

            this.transitionProgress = true;

            // Dispatch an event that the transition is started
            _Dispatcher2.default.commit(_EventTypes.TRANSITION_START, {
                transition: transition,
                currentStatus: this.history.currentStatus(),
                prevStatus: this.history.prevStatus()
            });

            // Start the transition (with the current page, and the new page load promise)
            var transitionPromise = transition.init(this.router.page, newPagePromise);

            newPagePromise.then(this.onNewPageLoaded);
            transitionPromise.then(this.onTransitionEnd);
        }

        /**
         * Function called as soon the new page is ready.
         *
         * @private
         * @param {AbstractPage} page
         */

    }, {
        key: 'onNewPageLoaded',
        value: function onNewPageLoaded(page) {
            var currentStatus = this.history.currentStatus();

            if (this.loader) {
                this.loader.hide();
            }

            // Update body attributes (class, id, data-attributes
            this.dom.updateBodyAttributes(page);
            // Update the page title
            this.dom.updatePageTitle(page);
            // Send google analytic data
            _Utils2.default.trackGoogleAnalytics();

            _Dispatcher2.default.commit(_EventTypes.CONTAINER_READY, {
                currentStatus: currentStatus,
                prevStatus: this.history.prevStatus(),
                currentHTML: this.dom.currentHTML,
                page: page
            });
        }

        /**
         * Function called as soon the transition is finished.
         *
         * @private
         */

    }, {
        key: 'onTransitionEnd',
        value: function onTransitionEnd() {
            this.transitionProgress = false;

            if (this.linkHash) {
                window.location.hash = '';
                window.location.hash = this.linkHash;

                this.linkHash = null;
            }

            _Dispatcher2.default.commit(_EventTypes.TRANSITION_COMPLETE, {
                currentStatus: this.history.currentStatus(),
                prevStatus: this.history.prevStatus()
            });
        }
    }]);
    return Pjax;
}(); /**
      * Copyright © 2017, Ambroise Maupate
      *
      * Permission is hereby granted, free of charge, to any person obtaining a copy
      * of this software and associated documentation files (the "Software"), to deal
      * in the Software without restriction, including without limitation the rights
      * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      * copies of the Software, and to permit persons to whom the Software is furnished
      * to do so, subject to the following conditions:
      *
      * The above copyright notice and this permission notice shall be included in all
      * copies or substantial portions of the Software.
      *
      * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
      * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
      * IN THE SOFTWARE.
      *
      * @file Pjax.js
      * @author Adrien Scholaert
      */

exports.default = Pjax;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file Dom.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

/**
 * Class that is going to deal with DOM parsing/manipulation.
 */
var Dom = function () {
    /**
     * Constructor.
     *
     * @param {jQuery} $body
     * @param {String} wrapperId
     * @param {String} objectTypeAttr
     * @param {String} pageClass
     */
    function Dom($body) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$wrapperId = _ref.wrapperId,
            wrapperId = _ref$wrapperId === undefined ? 'sb-wrapper' : _ref$wrapperId,
            _ref$objectTypeAttr = _ref.objectTypeAttr,
            objectTypeAttr = _ref$objectTypeAttr === undefined ? 'data-node-type' : _ref$objectTypeAttr,
            _ref$pageClass = _ref.pageClass,
            pageClass = _ref$pageClass === undefined ? 'page-content' : _ref$pageClass;

        (0, _classCallCheck3.default)(this, Dom);

        /**
         * Id of the main wrapper
         *
         * @type {String}
         * @default
         */
        this.wrapperId = wrapperId;

        /**
         * The data attribute name to find the node type
         *
         * @type {string}
         * @default
         */
        this.objectTypeAttr = objectTypeAttr;

        /**
         * Class name used to identify the containers
         *
         * @type {String}
         * @default
         */
        this.pageClass = pageClass;

        /**
         * Full HTML String of the current page.
         * By default is the innerHTML of the initial loaded page.
         *
         * Each time a new page is loaded, the value is the response of the ajax call.
         *
         * @type {String}
         * @default
         */
        this.currentHTML = document.documentElement.innerHTML;

        /**
         * Body jquery element
         *
         * @type {jQuery}
         * @default
         */
        this.$body = $body;
    }

    /**
     * Parse the responseText obtained from the ajax call.
     *
     * @param  {String} responseText
     * @return {HTMLElement}
     */


    (0, _createClass3.default)(Dom, [{
        key: 'parseResponse',
        value: function parseResponse(responseText) {
            this.currentHTML = responseText;

            var wrapper = document.createElement('div');
            wrapper.innerHTML = responseText;

            return this.getContainer(wrapper);
        }

        /**
         * Get the main wrapper by the ID `wrapperId`.
         *
         * @return {HTMLElement} element
         */

    }, {
        key: 'getWrapper',
        value: function getWrapper() {
            var wrapper = document.getElementById(this.wrapperId);

            if (!wrapper) {
                throw new Error('Starting Blocks: Wrapper not found!');
            }

            return wrapper;
        }

        /**
         * Return node type.
         *
         * @param container
         * @returns {string}
         */

    }, {
        key: 'getNodeType',
        value: function getNodeType(container) {
            var nodeType = container.getAttribute(this.objectTypeAttr);

            if (!nodeType) {
                throw new Error('Starting Blocks: Node Type not found!');
            }

            return nodeType;
        }

        /**
         * Get the container on the current DOM,
         * or from an HTMLElement passed via argument.
         *
         * @param  {HTMLElement|null} element
         * @return {HTMLElement}
         */

    }, {
        key: 'getContainer',
        value: function getContainer() {
            var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (!element) {
                element = document.body;
            }

            if (!element) {
                throw new Error('Starting Blocks: DOM not ready!');
            }

            var container = this.parseContainer(element);

            if (!container) {
                throw new Error('Starting Blocks: no container found');
            }

            return container;
        }

        /**
         * Put the container on the page.
         *
         * @param  {HTMLElement} element
         */

    }, {
        key: 'putContainer',
        value: function putContainer(element) {
            element.style.visibility = 'hidden';
            var wrapper = this.getWrapper();
            wrapper.appendChild(element);
        }

        /**
         * Get container selector.
         *
         * @param  {HTMLElement} element
         * @return {HTMLElement} element
         */

    }, {
        key: 'parseContainer',
        value: function parseContainer(element) {
            return element.querySelector('.' + this.pageClass);
        }

        /**
         * Update body attributes.
         *
         * @param {AbstractPage} page
         */

    }, {
        key: 'updateBodyAttributes',
        value: function updateBodyAttributes(page) {
            // Change body class and id
            if (page.name) {
                document.body.id = page.name;
                this.$body.addClass(page.name);
            }

            this.$body.addClass(page.type);
        }

        /**
         * Update page title.
         *
         * @param {AbstractPage} page
         */

    }, {
        key: 'updatePageTitle',
        value: function updatePageTitle(page) {
            if (page.metaTitle) {
                document.title = page.metaTitle;
            }
        }
    }]);
    return Dom;
}();

exports.default = Dom;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _loglevel = __webpack_require__(14);

var _loglevel2 = _interopRequireDefault(_loglevel);

var _DefaultPage = __webpack_require__(132);

var _DefaultPage2 = _interopRequireDefault(_DefaultPage);

var _HomePage = __webpack_require__(138);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _AbstractBlock = __webpack_require__(70);

var _AbstractBlock2 = _interopRequireDefault(_AbstractBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Router mapper class.
 *
 * This class maps your `data-node-type` with your *ES6* classes.
 *
 * **You must define your own ClassFactory for each of your projects.**.
 */
/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file ClassFactory.js
 * @author Ambroise Maupate
 */

var ClassFactory = function () {
    function ClassFactory() {
        (0, _classCallCheck3.default)(this, ClassFactory);
    }

    (0, _createClass3.default)(ClassFactory, [{
        key: 'getPageInstance',

        /**
         * Returns an `AbstractPage` child class instance
         * according to the `nodeTypeName` or an `AbstractPage` as default.
         *
         * @param  {String}  nodeType
         * @param  {Router}  router
         * @param  {HTMLElement}  container
         * @param  {String}  context
         * @param  {Boolean} isHome
         *
         * @return {AbstractPage}
         */
        value: function getPageInstance(nodeType, router, container, context, isHome) {
            switch (nodeType) {
                case 'home':
                    _loglevel2.default.debug('Create new home');
                    return new _HomePage2.default(router, container, context, nodeType, isHome);
                default:
                    _loglevel2.default.info('"' + nodeType + '" has no defined route, using Page.');
                    return new _DefaultPage2.default(router, container, context, nodeType, isHome);
            }
        }

        /**
         * Returns an `AbstractBlock` child class instance
         * according to the nodeTypeName or an AbstractBlock as default.
         *
         * Comment out the default case if you don’t want a default block to be instantiated
         * for each block.
         *
         * @param  {String}  nodeTypeName
         * @param  {AbstractPage} page
         * @param  {jQuery}  $cont
         * @return {AbstractBlock}
         */

    }, {
        key: 'getBlockInstance',
        value: function getBlockInstance(nodeTypeName, page, $cont) {
            switch (nodeTypeName) {
                case 'block':
                    return new _AbstractBlock2.default(page, $cont, nodeTypeName);
            }
        }
    }]);
    return ClassFactory;
}();

exports.default = ClassFactory;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(27);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(133);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(44);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractPage2 = __webpack_require__(46);

var _AbstractPage3 = _interopRequireDefault(_AbstractPage2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Some example "page".
 *
 * @extends {AbstractPage}
 * @private
 */
var DefaultPage = function (_AbstractPage) {
    (0, _inherits3.default)(DefaultPage, _AbstractPage);

    function DefaultPage() {
        (0, _classCallCheck3.default)(this, DefaultPage);
        return (0, _possibleConstructorReturn3.default)(this, (DefaultPage.__proto__ || (0, _getPrototypeOf2.default)(DefaultPage)).apply(this, arguments));
    }

    (0, _createClass3.default)(DefaultPage, [{
        key: 'init',
        value: function init() {
            this.$duplicate = this.$cont.find('a.duplicate-last');
            (0, _get3.default)(DefaultPage.prototype.__proto__ || (0, _getPrototypeOf2.default)(DefaultPage.prototype), 'init', this).call(this);
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            var _this2 = this;

            (0, _get3.default)(DefaultPage.prototype.__proto__ || (0, _getPrototypeOf2.default)(DefaultPage.prototype), 'initEvents', this).call(this);
            this.$duplicate.on('click', function (e) {
                e.preventDefault();
                var $new = _this2.$blocks.last().clone();
                $new.attr('id', 'block-' + (_this2.$blocks.length + 1));
                _this2.$cont.append($new);
                return false;
            });
        }
    }]);
    return DefaultPage;
}(_AbstractPage3.default); /**
                            * Copyright © 2016, Ambroise Maupate
                            *
                            * Permission is hereby granted, free of charge, to any person obtaining a copy
                            * of this software and associated documentation files (the "Software"), to deal
                            * in the Software without restriction, including without limitation the rights
                            * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                            * copies of the Software, and to permit persons to whom the Software is furnished
                            * to do so, subject to the following conditions:
                            *
                            * The above copyright notice and this permission notice shall be included in all
                            * copies or substantial portions of the Software.
                            *
                            * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                            * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                            * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
                            * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                            * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                            * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
                            * IN THE SOFTWARE.
                            *
                            * @file Page.js
                            * @author Ambroise Maupate
                            */

exports.default = DefaultPage;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(27);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(134);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
var $Object = __webpack_require__(2).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(12);
var $getOwnPropertyDescriptor = __webpack_require__(43).f;

__webpack_require__(66)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(a,b){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=b():a.LazyLoad=b()}(this,function(){function a(){r||(n={elements_selector:"img",container:window,threshold:300,throttle:50,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null},o=!!window.addEventListener,p=!!window.attachEvent,q=!!document.body.classList,r=!0)}function b(a,b,c){return o?void a.addEventListener(b,c):void(p&&(a.attachEvent("on"+b,function(a){return function(){c.call(a,window.event)}}(a)),a=null))}function c(a,b,c){return o?void a.removeEventListener(b,c):void(p&&a.detachEvent("on"+b,c))}function d(a,b,c){function d(){return window.innerWidth||l.documentElement.clientWidth||document.body.clientWidth}function e(){return window.innerHeight||l.documentElement.clientHeight||document.body.clientHeight}function f(a){return a.getBoundingClientRect().top+m-l.documentElement.clientTop}function g(a){return a.getBoundingClientRect().left+n-l.documentElement.clientLeft}function h(){var d;return d=b===window?e()+m:f(b)+b.offsetHeight,d<=f(a)-c}function i(){var e;return e=b===window?d()+window.pageXOffset:g(b)+d(),e<=g(a)-c}function j(){var d;return d=b===window?m:f(b),d>=f(a)+c+a.offsetHeight}function k(){var d;return d=b===window?n:g(b),d>=g(a)+c+a.offsetWidth}var l,m,n;return l=a.ownerDocument,m=window.pageYOffset||l.body.scrollTop,n=window.pageXOffset||l.body.scrollLeft,!(h()||j()||i()||k())}function e(){var a=new Date;return a.getTime()}function f(a,b){var c,d={};for(c in a)a.hasOwnProperty(c)&&(d[c]=a[c]);for(c in b)b.hasOwnProperty(c)&&(d[c]=b[c]);return d}function g(a){try{return Array.prototype.slice.call(a)}catch(b){var c,d=[],e=a.length;for(c=0;e>c;c++)d.push(a[c]);return d}}function h(a,b){return q?void a.classList.add(b):void(a.className+=(a.className?" ":"")+b)}function i(a,b){return q?void a.classList.remove(b):void(a.className=a.className.replace(new RegExp("(^|\\s+)"+b+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,""))}function j(a,b){var c=a.parentElement;if("PICTURE"===c.tagName)for(var d=0;d<c.children.length;d++){var e=c.children[d];if("SOURCE"===e.tagName){var f=e.getAttribute("data-"+b);f&&e.setAttribute("srcset",f)}}}function k(a,b,c){var d=a.tagName,e=a.getAttribute("data-"+c);if("IMG"===d){j(a,b);var f=a.getAttribute("data-"+b);return f&&a.setAttribute("srcset",f),void(e&&a.setAttribute("src",e))}return"IFRAME"===d?void(e&&a.setAttribute("src",e)):void(a.style.backgroundImage="url("+e+")")}function l(a,b){return function(){return a.apply(b,arguments)}}function m(c){a(),this._settings=f(n,c),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._handleScrollFn=l(this.handleScroll,this),b(window,"resize",this._handleScrollFn),this.update()}var n,o,p,q,r=!1;return m.prototype._showOnAppear=function(a){function d(){null!==e&&(e.callback_load&&e.callback_load(a),i(a,e.class_loading),h(a,e.class_loaded),c(a,"load",d))}var e=this._settings;("IMG"===a.tagName||"IFRAME"===a.tagName)&&(b(a,"load",d),b(a,"error",function(){c(a,"load",d),i(a,e.class_loading),e.callback_error&&e.callback_error(a)}),h(a,e.class_loading)),k(a,e.data_srcset,e.data_src),e.callback_set&&e.callback_set(a)},m.prototype._loopThroughElements=function(){var a,b,c=this._settings,e=this._elements,f=e?e.length:0,g=[];for(a=0;f>a;a++)b=e[a],c.skip_invisible&&null===b.offsetParent||d(b,c.container,c.threshold)&&(this._showOnAppear(b),g.push(a),b.wasProcessed=!0);for(;g.length>0;)e.splice(g.pop(),1),c.callback_processed&&c.callback_processed(e.length);0===f&&this._stopScrollHandler()},m.prototype._purgeElements=function(){var a,b,c=this._elements,d=c.length,e=[];for(a=0;d>a;a++)b=c[a],b.wasProcessed&&e.push(a);for(;e.length>0;)c.splice(e.pop(),1)},m.prototype._startScrollHandler=function(){this._isHandlingScroll||(this._isHandlingScroll=!0,b(this._settings.container,"scroll",this._handleScrollFn))},m.prototype._stopScrollHandler=function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,c(this._settings.container,"scroll",this._handleScrollFn))},m.prototype.handleScroll=function(){var a,b,c;this._settings&&(b=e(),c=this._settings.throttle,0!==c?(a=c-(b-this._previousLoopTime),0>=a||a>c?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=b,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(l(function(){this._previousLoopTime=e(),this._loopTimeout=null,this._loopThroughElements()},this),a))):this._loopThroughElements())},m.prototype.update=function(){this._elements=g(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},m.prototype.destroy=function(){c(window,"resize",this._handleScrollFn),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},m});
//# sourceMappingURL=lazyload.min.js.map

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(27);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(44);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractPage2 = __webpack_require__(46);

var _AbstractPage3 = _interopRequireDefault(_AbstractPage2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Some example "home" page.
 *
 * @extends {AbstractPage}
 * @class
 */
var HomePage = function (_AbstractPage) {
  (0, _inherits3.default)(HomePage, _AbstractPage);

  function HomePage() {
    (0, _classCallCheck3.default)(this, HomePage);
    return (0, _possibleConstructorReturn3.default)(this, (HomePage.__proto__ || (0, _getPrototypeOf2.default)(HomePage)).apply(this, arguments));
  }

  return HomePage;
}(_AbstractPage3.default); /**
                            * Copyright © 2016, Ambroise Maupate
                            *
                            * Permission is hereby granted, free of charge, to any person obtaining a copy
                            * of this software and associated documentation files (the "Software"), to deal
                            * in the Software without restriction, including without limitation the rights
                            * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                            * copies of the Software, and to permit persons to whom the Software is furnished
                            * to do so, subject to the following conditions:
                            *
                            * The above copyright notice and this permission notice shall be included in all
                            * copies or substantial portions of the Software.
                            *
                            * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                            * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                            * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
                            * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                            * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                            * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
                            * IN THE SOFTWARE.
                            *
                            * @file Home.js
                            * @author Ambroise Maupate
                            */

exports.default = HomePage;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file Scroll.js
 * @author Ambroise Maupate
 */

/**
 * @static
 */
var Scroll = function () {
    function Scroll() {
        (0, _classCallCheck3.default)(this, Scroll);
    }

    (0, _createClass3.default)(Scroll, null, [{
        key: '_preventDefault',

        /**
         *
         * @param e
         * @private
         */
        value: function _preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        /**
         *
         * @param e
         * @private
         */

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

        /**
         *
         * @param e
         * @private
         */

    }, {
        key: '_wheel',
        value: function _wheel(e) {
            Scroll._preventDefault(e);
        }

        /**
         * Disable scroll.
         *
         * @return {void}
         */

    }, {
        key: 'disable',
        value: function disable() {
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', Scroll._wheel, false);
            }
            window.onmousewheel = document.onmousewheel = Scroll._wheel;
            document.onkeydown = Scroll._keydown;
        }

        /**
         * Enable scroll again.
         *
         * @return {void}
         */

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

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = polyfills;
/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file polyfills.js
 * @author Ambroise Maupate
 */

/**
 * Execute some polyfill for older and crappy browsers.
 *
 * - window.requestAnimFrame
 * - window.cancelAnimFrame
 * - Avoid `console` errors in browsers that lack a console.
 */
function polyfills() {
    window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */callback) {
            window.setTimeout(callback, 1000 / 60); // 60fps
        };
    }();

    window.cancelAnimFrame = function () {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
            window.clearTimeout(id);
        };
    }();

    /*
     * Avoid `console` errors in browsers that lack a console.
     * @return {[type]} [description]
     */
    {
        var method = void 0;
        var noop = function noop() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = window.console || {};

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }

    /**
     * FindIndex polyfill
     */
    if (!Array.prototype.findIndex) {
        // eslint-disable-next-line no-extend-native
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this === null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return -1.
                return -1;
            }
        });
    }

    /**
     * Custom event support for IE
     */
    (function () {
        if (typeof window.CustomEvent === 'function') return false;

        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    })();
}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(142);

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = gaTrackErrors;

var _jquery = __webpack_require__(24);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Method to track JS errors if your Google Analytics account.
 *
 * @see http://blog.gospodarets.com/track_javascript_angularjs_and_jquery_errors_with_google_analytics/
 */
function gaTrackErrors() {
    if (typeof ga !== 'undefined') {
        // Pure JavaScript errors handler
        window.addEventListener('error', function (err) {
            var lineAndColumnInfo = err.colno ? ' line:' + err.lineno + ', column:' + err.colno : ' line:' + err.lineno;
            window.ga('send', 'event', 'JavaScript Error', err.message, err.filename + lineAndColumnInfo + ' -> ' + navigator.userAgent, 0, true);
        });

        // jQuery errors handler (jQuery API)
        _jquery2.default.error = function (message) {
            window.ga('send', 'event', 'jQuery Error', message, navigator.userAgent, 0, true);
        };

        // jQuery AJAX errors handler (jQuery API)
        (0, _jquery2.default)(document).ajaxError(function (event, request, settings) {
            window.ga('send', 'event', 'jQuery Ajax Error', settings.url, (0, _stringify2.default)({
                result: event.result,
                status: request.status,
                statusText: request.statusText,
                crossDomain: settings.crossDomain,
                dataType: settings.dataType
            }), 0, true);
        });
    }
}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Utils = __webpack_require__(18);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Static class to get bootstrap breakpoints.
 */
var BootstrapMedia = function () {
  function BootstrapMedia() {
    (0, _classCallCheck3.default)(this, BootstrapMedia);
  }

  (0, _createClass3.default)(BootstrapMedia, null, [{
    key: 'isMinXS',

    /**
     * Test if viewport width in greater or equal than bootstrap XS breakpoint (480px).
     *
     * @return {Boolean}
     */
    value: function isMinXS() {
      var size = _Utils2.default.getViewportSize();
      return size.width >= 480;
    }

    /**
     * Test if viewport width in greater or equal than bootstrap SM breakpoint (768px).
     *
     * @return {Boolean}
     */

  }, {
    key: 'isMinSM',
    value: function isMinSM() {
      var size = _Utils2.default.getViewportSize();
      return size.width >= 768;
    }

    /**
     * Test if viewport width in greater or equal than bootstrap MD breakpoint (992px).
     *
     * @return {Boolean}
     */

  }, {
    key: 'isMinMD',
    value: function isMinMD() {
      var size = _Utils2.default.getViewportSize();
      return size.width >= 992;
    }

    /**
     * Test if viewport width in greater or equal than bootstrap LG breakpoint (1200px).
     *
     * @return {Boolean}
     */

  }, {
    key: 'isMinLG',
    value: function isMinLG() {
      var size = _Utils2.default.getViewportSize();
      return size.width >= 1200;
    }

    /**
     * Test if viewport width in greater or equal than bootstrap XL breakpoint (1920px).
     *
     * @return {Boolean}
     */

  }, {
    key: 'isMinXL',
    value: function isMinXL() {
      var size = _Utils2.default.getViewportSize();
      return size.width >= 1920;
    }
  }]);
  return BootstrapMedia;
}(); /**
      * Copyright REZO ZERO 2016
      *
      *
      *
      * @file bootstrapMedia.js
      * @copyright REZO ZERO 2016
      * @author Ambroise Maupate
      */


exports.default = BootstrapMedia;

/***/ })
/******/ ]);