var startingblocks = (function (exports) {
  'use strict';

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
   * Before Kernel initialize XHR request to load new page.
   *
   * @type {String}
   */
  var BEFORE_PAGE_LOAD = 'SB_BEFORE_PAGE_LOAD';
  /**
   * After Kernel XHR request succeeded.
   *
   * @type {String}
   */

  var AFTER_PAGE_LOAD = 'SB_AFTER_PAGE_LOAD';
  /**
   * After Kernel appended new page DOM to page-container.
   *
   * @type {String}
   */

  var AFTER_DOM_APPENDED = 'SB_AFTER_DOM_APPENDED';
  /**
   * When new page container is ready.
   *
   * @type {String}
   */

  var CONTAINER_READY = 'SB_CONTAINER_READY';
  /**
   * After Kernel create new page instance.
   *
   * @type {String}
   */

  var AFTER_PAGE_BOOT = 'SB_AFTER_PAGE_BOOT';
  /**
   * Before page begins to show, right after assets are loaded (images).
   *
   * @type {String}
   */

  var BEFORE_PAGE_SHOW = 'SB_BEFORE_PAGE_SHOW';
  /**
   * After page showed.
   *
   * @type {String}
   */

  var AFTER_PAGE_SHOW = 'SB_AFTER_PAGE_SHOW';
  /**
   * Before page begins to hide.
   * Be careful, this must be triggered manually if hide() method is overriden.
   *
   * @type {String}
   */

  var BEFORE_PAGE_HIDE = 'SB_BEFORE_PAGE_HIDE';
  /**
   * After page hiding animation.
   * Be careful, this must be triggered manually if hide() method is overriden.
   *
   * @type {String}
   */

  var AFTER_PAGE_HIDE = 'SB_AFTER_PAGE_HIDE';
  /**
   * Before page transition begin.
   *
   * @type {String}
   */

  var TRANSITION_START = 'SB_TRANSITION_START';
  /**
   * After page transition completed.
   *
   * @type {String}
   */

  var TRANSITION_COMPLETE = 'SB_TRANSITION_COMPLETE';

  var EventTypes = /*#__PURE__*/Object.freeze({
    BEFORE_PAGE_LOAD: BEFORE_PAGE_LOAD,
    AFTER_PAGE_LOAD: AFTER_PAGE_LOAD,
    AFTER_DOM_APPENDED: AFTER_DOM_APPENDED,
    CONTAINER_READY: CONTAINER_READY,
    AFTER_PAGE_BOOT: AFTER_PAGE_BOOT,
    BEFORE_PAGE_SHOW: BEFORE_PAGE_SHOW,
    AFTER_PAGE_SHOW: AFTER_PAGE_SHOW,
    BEFORE_PAGE_HIDE: BEFORE_PAGE_HIDE,
    AFTER_PAGE_HIDE: AFTER_PAGE_HIDE,
    TRANSITION_START: TRANSITION_START,
    TRANSITION_COMPLETE: TRANSITION_COMPLETE
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var objectSpread = _objectSpread;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

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
  var Dom =
  /*#__PURE__*/
  function () {
    /**
     * Constructor.
     *
     * @params options
     * @param {String} [options.wrapperId=sb-wrapper']
     * @param {String} [options.objectTypeAttr=data-node-type']
     * @param {String} [options.pageClass=page-content]
     */
    function Dom() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$wrapperId = _ref.wrapperId,
          wrapperId = _ref$wrapperId === void 0 ? 'sb-wrapper' : _ref$wrapperId,
          _ref$objectTypeAttr = _ref.objectTypeAttr,
          objectTypeAttr = _ref$objectTypeAttr === void 0 ? 'data-node-type' : _ref$objectTypeAttr,
          _ref$pageClass = _ref.pageClass,
          pageClass = _ref$pageClass === void 0 ? 'page-content' : _ref$pageClass;

      classCallCheck(this, Dom);

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
    }
    /**
     * Parse the responseText obtained from the ajax call.
     *
     * @param  {String} responseText
     * @return {HTMLElement}
     */


    createClass(Dom, [{
      key: "parseResponse",
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
      key: "getWrapper",
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
      key: "getNodeType",
      value: function getNodeType(container) {
        return container.getAttribute(this.objectTypeAttr);
      }
      /**
       * Get the container on the current DOM,
       * or from an HTMLElement passed via argument.
       *
       * @param  {HTMLElement|null} element
       * @return {HTMLElement}
       */

    }, {
      key: "getContainer",
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
          throw new Error("Starting Blocks: container not found! Did you use at least\n            one dom element with \".".concat(this.pageClass, "\" class and \"data-node-type\" attribute?"));
        }

        return container;
      }
      /**
       * Put the container on the page.
       *
       * @param  {HTMLElement} element
       */

    }, {
      key: "putContainer",
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
      key: "parseContainer",
      value: function parseContainer(element) {
        return element.querySelector(".".concat(this.pageClass, "[data-node-type]"));
      }
      /**
       * Update body attributes.
       *
       * @param {AbstractPage} page
       */

    }, {
      key: "updateBodyAttributes",
      value: function updateBodyAttributes(page) {
        // Change body class and id
        if (page.name) {
          document.body.id = page.name;
          document.body.classList.add(page.name);
        }

        document.body.classList.add(page.type);

        if (page.isHome) {
          document.body.setAttribute('data-is-home', '1');
        } else {
          document.body.setAttribute('data-is-home', '0');
        }
      }
      /**
       * Update page title.
       *
       * @param {AbstractPage} page
       */

    }, {
      key: "updatePageTitle",
      value: function updatePageTitle(page) {
        if (page.metaTitle) {
          document.title = page.metaTitle;
        }
      }
    }]);

    return Dom;
  }();

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

  /**
   * Event dispatcher.
   */
  var Dispatcher =
  /*#__PURE__*/
  function () {
    function Dispatcher() {
      classCallCheck(this, Dispatcher);
    }

    createClass(Dispatcher, null, [{
      key: "commit",
      value: function commit(eventType, detail) {
        var event = new window.CustomEvent(eventType, {
          detail: detail
        });
        console.debug('🚩 Dispatched ' + eventType);
        window.dispatchEvent(event);
      }
    }]);

    return Dispatcher;
  }();

  var DEFAULT_OPTIONS = {
    pageClass: 'page-content',
    pageBlockClass: 'page-block',
    objectTypeAttr: 'data-node-type',
    ajaxWrapperId: 'sb-wrapper',
    noAjaxLinkClass: 'no-ajax-link',
    noPrefetchLinkClass: 'no-prefetch'
    /**
     * Application kernel.
     */

  };

  var Kernel =
  /*#__PURE__*/
  function () {
    /**
     * Create a new Kernel.
     *
     * @param {Object} services
     * @param {Pjax|null} [services.pjax]
     * @param {CacheProvider|null} [services.cacheProvider]
     * @param {Prefetch|null} [services.prefetch]
     * @param {Lazyload|null} [services.lazyload]
     * @param {Worker|null} [services.worker]
     * @param {GraphicLoader|null} [services.graphicLoader]
     * @param {ClassFactory|null} [services.classFactory]
     * @param {TransitionFactory|null} [services.transitionFactory]
     *
     * @param {Object} options
     * @param {string} [options.pageClass=page-content] - The class name of the root page node
     * @param {string} [options.pageBlockClass=page-block] - The class name to detect blocks
     * @param {string} [options.objectTypeAttr=data-node-type]
     * @param {string} [options.ajaxWrapperId=sb-wrapper]
     */
    function Kernel() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$services = _ref.services,
          services = _ref$services === void 0 ? {} : _ref$services,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options;

      classCallCheck(this, Kernel);

      /**
       * @type {Object}
       */
      this.options = objectSpread({}, DEFAULT_OPTIONS, options);
      /**
       * @type {(Pjax|null)}
       */

      this.pjax = services.pjax || null;
      /**
       * @type {(CacheProvider|null)}
       */

      this.cacheProvider = services.cacheProvider || null;
      /**
       * @type {(Prefetch|null)}
       */

      this.prefetch = services.prefetch || null;
      /**
       * @type {(Lazyload|null)}
       */

      this.lazyload = services.lazyload || null;
      /**
       * @type {(Worker|null)}
       */

      this.worker = services.worker || null;
      /**
       * @type {(GraphicLoader|null)}
       */

      this.graphicLoader = services.graphicLoader || null;
      /**
       * @type {(ClassFactory|null)}
       */

      this.classFactory = services.classFactory || null;
      /**
       * @type {(TransitionFactory|null)}
       */

      this.transitionFactory = services.transitionFactory || null;

      if (!window.location.origin) {
        window.location.origin = window.location.protocol + '//' + window.location.host;
      }
      /**
       * Base url
       * @type {String}
       */


      this.baseUrl = window.location.origin;
      /**
       * Page instance
       * @type {(AbstractPage|null)}
       */

      this.page = null;
      /**
       * Dom instance
       * @type {(Dom|null)}
       */

      this.dom = null; // Bind methods

      this.buildPage = this.buildPage.bind(this);
    }

    createClass(Kernel, [{
      key: "init",
      value: function init() {
        this.dom = new Dom({
          wrapperId: this.options.ajaxWrapperId,
          objectTypeAttr: this.options.objectTypeAttr,
          pageClass: this.options.pageClass
        }); // Init pjax when ajax is enabled and window.fetch is supported

        if (this.pjax && window.fetch) {
          if (this.cacheProvider) {
            this.pjax.cacheProvider = this.cacheProvider;
          }

          if (this.worker) {
            this.pjax.worker = this.worker;
          }

          if (this.transitionFactory) {
            this.pjax.transitionFactory = this.transitionFactory;
          }

          this.pjax.kernel = this;
          this.pjax.dom = this.dom;
          this.pjax.init(); // Init prefetch

          if (this.prefetch) {
            this.prefetch.cacheProvider = this.cacheProvider;
            this.prefetch.pjax = this.pjax;
            this.prefetch.init();
          }
        } // Build first page with static context


        this.buildPage(this.dom.getContainer(), 'static');
      }
      /**
       * Build a new page instance.
       *
       * @param {HTMLElement} container
       * @param {String} context
       * @returns {AbstractPage|null}
       */

    }, {
      key: "buildPage",
      value: function buildPage(container) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ajax';

        if (!container) {
          throw new Error("Kernel: container not found! Did you use at least \n            one dom element with \".".concat(this.options.pageClass, "\" class and \"data-node-type\" attribute"));
        } // Get page


        this.page = this.classFactory.getPageInstance(this, container, context, this.dom.getNodeType(container)); // Init page

        this.page.init(); // Dispatch an event to inform that the new page is ready

        Dispatcher.commit(AFTER_PAGE_BOOT, this.page);
        return this.page;
      }
    }]);

    return Kernel;
  }();

  // import work from 'webworkify-webpack'

  /**
   * Utils class
   */
  var Utils =
  /*#__PURE__*/
  function () {
    function Utils() {
      classCallCheck(this, Utils);
    }

    createClass(Utils, null, [{
      key: "stripTrailingSlash",

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
      key: "getPort",
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
      key: "cleanLink",
      value: function cleanLink(url) {
        return url.replace(/#.*/, '');
      }
      /**
       * Get current url
       *
       * @returns {string}
       */

    }, {
      key: "getCurrentUrl",
      value: function getCurrentUrl() {
        return window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
      }
      /**
       * Request timeout (in ms)
       *
       * @returns {number}
       */

    }, {
      key: "requestTimeout",
      value: function requestTimeout() {
        return 10000;
      }
      /**
       * Start a fetch request
       *
       * @param {String} url
       * @param {Worker|null} worker
       * @return {Promise}
       */

    }, {
      key: "request",
      value: function request(url, worker) {
        var dfd = Utils.deferred();
        var timeout = window.setTimeout(function () {
          window.clearTimeout(timeout);
          dfd.reject('timeout!');
        }, Utils.requestTimeout());

        if (window.Worker && worker) ; else {
          var headers = new window.Headers();
          headers.append('X-Starting-Blocks', 'yes');
          headers.append('X-Allow-Partial', 'yes');
          headers.append('X-Requested-With', 'XMLHttpRequest');
          window.fetch(url, {
            method: 'GET',
            headers: headers,
            cache: 'default',
            credentials: 'same-origin'
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
        }

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
      key: "logCredits",
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
       * Get random number.
       *
       * @param  {Number} min [min value]
       * @param  {Number} max [max value]
       * @param  {Number} decimal
       * @return {Number}
       */

    }, {
      key: "getRandomNumber",
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
      key: "getRandomInt",
      value: function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      /**
       * Send a GA page view event when context is AJAX.
       */

    }, {
      key: "trackGoogleAnalytics",
      value: function trackGoogleAnalytics() {
        if (typeof window.ga !== 'undefined') {
          console.debug('🚩 Push Analytics for: ' + window.location.pathname);
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
      key: "getViewportSize",
      value: function getViewportSize() {
        var e = window;
        var a = 'inner';

        if (!('innerWidth' in window)) {
          a = 'client';
          e = document.documentElement || document.body;
        }

        return {
          width: e[a + 'Width'],
          height: e[a + 'Height']
        };
      }
      /**
       * Get a css property with the vendor prefix.
       *
       * @param  {String} property the css property
       * @return {String}          the prefixed property
       */

    }, {
      key: "prefixProperty",
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
      key: "getNormRatio",
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
      key: "deferred",
      value: function deferred() {
        return new function () {
          var _this = this;

          this.resolve = null;
          this.reject = null;
          this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
          });
        }();
      }
    }]);

    return Utils;
  }();

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
  var History =
  /*#__PURE__*/
  function () {
    function History() {
      classCallCheck(this, History);

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
     * @param {Object} data (optional data)
     *
     * @return {Object}
     */


    createClass(History, [{
      key: "add",
      value: function add(url, transitionName, context) {
        var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var state = {
          url: url,
          transitionName: transitionName,
          context: context,
          data: data
        };
        this.history.push(state);
        return state;
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

  /**
   * Pjax.
   */

  var Pjax =
  /*#__PURE__*/
  function () {
    /**
     * Constructor.
     *
     * @param {Object} options
     * @param {string} [options.noAjaxLinkClass=no-ajax-link] - The link class name to prevent ajax
     */
    function Pjax() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$noAjaxLinkClass = _ref.noAjaxLinkClass,
          noAjaxLinkClass = _ref$noAjaxLinkClass === void 0 ? 'no-ajax-link' : _ref$noAjaxLinkClass;

      classCallCheck(this, Pjax);

      /**
       * @type {string}
       */
      this.noAjaxLinkClass = noAjaxLinkClass;
      /**
       * @type {(Kernel|null)}
       */

      this._kernel = null;
      /**
       * @type {(History|null)}
       */

      this._history = null;
      /**
       * @type {(Dom|null)}
       */

      this._dom = null;
      /**
       * @type {(CacheProvider|null)}
       */

      this._cacheProvider = null;
      /**
       * @type {(TransitionFactory|null)}
       */

      this._transitionFactory = null;
      /**
       * @type {(GraphicLoader|null)}
       */

      this._graphicLoader = null;
      /**
       * @type {(Worker|null)}
       */

      this._worker = null;
      /**
       * Indicate if there is an animation in progress.
       *
       * @readOnly
       * @type {Boolean}
       */

      this.transitionProgress = false; // Bind methods

      this.onNewPageLoaded = this.onNewPageLoaded.bind(this);
      this.onTransitionEnd = this.onTransitionEnd.bind(this);
      this.onLinkClick = this.onLinkClick.bind(this);
      this.onStateChange = this.onStateChange.bind(this);
    }

    createClass(Pjax, [{
      key: "init",

      /**
       * Init the events.
       *
       * @private
       */
      value: function init() {
        this._history = new History();

        var wrapper = this._dom.getWrapper();

        wrapper.setAttribute('aria-live', 'polite');
        this.currentState = this._history.add(this.getCurrentUrl(), null, 'static');
        this.bindEvents();
      }
      /**
       * Attach event listeners.
       *
       * @private
       */

    }, {
      key: "bindEvents",
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
      key: "getCurrentUrl",
      value: function getCurrentUrl() {
        // TODO, clean from what? currenturl do not takes hash..
        return Utils.cleanLink(Utils.getCurrentUrl());
      }
      /**
       * Change the URL with push state and trigger the state change.
       *
       * @param {String} url
       * @param {String} transitionName
       */

    }, {
      key: "goTo",
      value: function goTo(url, transitionName) {
        var currentPosition = window.scrollY;
        window.history.pushState(null, null, url);
        window.scrollTo(0, currentPosition);
        this.onStateChange(transitionName, true);
      }
      /**
       * Force the browser to go to a certain url.
       *
       * @param {String} url
       * @private
       */

    }, {
      key: "forceGoTo",
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
      key: "load",
      value: function load(url) {
        var _this = this;

        var deferred = Utils.deferred(); // Show loader

        if (this._graphicLoader) {
          this._graphicLoader.show();
        } // Check cache


        var request = null;

        if (this._cacheProvider) {
          request = this._cacheProvider.get(url);
        } // If no cache, make request


        if (!request) {
          request = Utils.request(url, this._worker); // If cache provider, cache the request

          if (this._cacheProvider) {
            this._cacheProvider.set(url, request);
          }
        } // When data are loaded


        request.then(function (data) {
          var container = _this._dom.parseResponse(data); // Dispatch an event


          Dispatcher.commit(AFTER_PAGE_LOAD, {
            container: container,
            currentHTML: _this._dom.currentHTML
          }); // Add new container to the DOM

          _this._dom.putContainer(container); // Dispatch an event


          Dispatcher.commit(AFTER_DOM_APPENDED, {
            container: container,
            currentHTML: _this._dom.currentHTML
          }); // Build page

          var page = _this._kernel.buildPage(container);

          deferred.resolve(page);
        }).catch(function (err) {
          console.error(err);

          _this.forceGoTo(url);

          deferred.reject();
        });
        return deferred.promise;
      }
      /**
       * Get the .href parameter out of a link element
       *
       * @private
       * @param  {HTMLElement} el
       * @return {String|undefined} href
       */

    }, {
      key: "getHref",
      value: function getHref(el) {
        if (!el) {
          return undefined;
        } // Check if has a href and if it's a link element


        if (typeof el.href === 'string' && el.tagName.toUpperCase() === 'A') {
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
      key: "getTransitionName",
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
      key: "onLinkClick",
      value: function onLinkClick(evt) {
        /**
         * @type {HTMLElement|Node|EventTarget}
         */
        var el = evt.target; // Go up in the node list until we
        // find something with an href

        while (el && !this.getHref(el)) {
          el = el.parentNode;
        }

        if (this.preventCheck(evt, el)) {
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
      key: "preventCheck",
      value: function preventCheck(evt, element) {
        if (!window.history.pushState) {
          return false;
        }

        var href = this.getHref(element); // User

        if (!element || !href) {
          return false;
        } // Middle click, cmd click, and ctrl click


        if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) {
          return false;
        } // Ignore target with _blank target


        if (element.target && element.target === '_blank') {
          return false;
        } // Check if it's the same domain


        if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) {
          return false;
        } // Check if the port is the same


        if (Utils.getPort() !== Utils.getPort(element.port)) {
          return false;
        } // Ignore case when a hash is being tacked on the current URL
        // if (href.indexOf('#') > -1)
        //   return false;
        // Ignore case where there is download attribute


        if (element.getAttribute && typeof element.getAttribute('download') === 'string') {
          return false;
        } // In case you're trying to load the same page


        if (Utils.cleanLink(href) === Utils.cleanLink(window.location.href)) {
          return false;
        }

        return !element.classList.contains(this.noAjaxLinkClass);
      }
      /**
       * Return a transition object.
       *
       * @param  {object} prev historyManager
       * @param  {object} current historyManager
       * @return {AbstractTransition} Transition object
       */

    }, {
      key: "getTransition",
      value: function getTransition(prev, current) {
        return this._transitionFactory.getTransition(prev, current);
      }
      /**
       * Method called after a 'popstate' or from .goTo().
       *
       * @private
       */

    }, {
      key: "onStateChange",
      value: function onStateChange() {
        var transitionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var isAjax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var newUrl = this.getCurrentUrl();

        if (this.transitionProgress) {
          this.forceGoTo(newUrl);
        }

        if (this._history.currentStatus().url === newUrl) {
          return false;
        } // If transition name is a string, a link have been click
        // Otherwise back/forward buttons have been pressed


        if (typeof transitionName === 'string' || isAjax) {
          this.currentState = this._history.add(newUrl, transitionName, 'ajax');
        } else {
          this.currentState = this._history.add(newUrl, null, '_history');
        } // Dispatch an event to inform that the page is being load


        Dispatcher.commit(BEFORE_PAGE_LOAD, {
          currentStatus: this._history.currentStatus(),
          prevStatus: this._history.prevStatus()
        }); // Load the page with the new url (promise is return)

        var newPagePromise = this.load(newUrl); // Get the page transition instance (from prev and current state)

        var transition = this.getTransition(this._history.prevStatus(), this._history.currentStatus());
        this.transitionProgress = true; // Dispatch an event that the transition is started

        Dispatcher.commit(TRANSITION_START, {
          transition: transition,
          currentStatus: this._history.currentStatus(),
          prevStatus: this._history.prevStatus()
        }); // Start the transition (with the current page, and the new page load promise)

        var transitionPromise = transition.init(this._kernel.page, newPagePromise);
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
      key: "onNewPageLoaded",
      value: function onNewPageLoaded(page) {
        var currentStatus = this._history.currentStatus();

        if (this._graphicLoader) {
          this._graphicLoader.hide();
        } // Update body attributes (class, id, data-attributes


        this._dom.updateBodyAttributes(page); // Update the page title


        this._dom.updatePageTitle(page); // Send google analytic data


        Utils.trackGoogleAnalytics(); // Update the current state

        if (this.currentState && page) {
          if (!this.currentState.data.title && page.metaTitle) {
            this.currentState.data.title = page.metaTitle;
          }
        }

        Dispatcher.commit(CONTAINER_READY, {
          currentStatus: currentStatus,
          prevStatus: this._history.prevStatus(),
          currentHTML: this._dom.currentHTML,
          page: page
        });
      }
      /**
       * Function called as soon the transition is finished.
       *
       * @private
       */

    }, {
      key: "onTransitionEnd",
      value: function onTransitionEnd() {
        this.transitionProgress = false;

        if (this.linkHash) {
          window.location.hash = '';
          window.location.hash = this.linkHash;
          this.linkHash = null;
        }

        Dispatcher.commit(TRANSITION_COMPLETE, {
          currentStatus: this._history.currentStatus(),
          prevStatus: this._history.prevStatus()
        });
      }
    }, {
      key: "kernel",
      set: function set(value) {
        this._kernel = value;
      }
    }, {
      key: "history",
      set: function set(value) {
        this._history = value;
      }
    }, {
      key: "dom",
      set: function set(value) {
        this._dom = value;
      }
    }, {
      key: "cacheProvider",
      set: function set(value) {
        this._cacheProvider = value;
      }
    }, {
      key: "graphicLoader",
      set: function set(value) {
        this._graphicLoader = value;
      }
    }, {
      key: "worker",
      set: function set(value) {
        this._worker = value;
      }
    }, {
      key: "transitionFactory",
      set: function set(value) {
        this._transitionFactory = value;
      }
    }]);

    return Pjax;
  }();

  /**
   * Prefetch.
   *
   * @type {Object}
   */

  var Prefetch =
  /*#__PURE__*/
  function () {
    function Prefetch() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$noPrefetchClass = _ref.noPrefetchClass,
          noPrefetchClass = _ref$noPrefetchClass === void 0 ? 'no-prefetch' : _ref$noPrefetchClass;

      classCallCheck(this, Prefetch);

      /**
       * Class name used to ignore prefetch on links.
       *
       * @type {string}
       * @default
       */
      this.noPrefetchClass = noPrefetchClass;
      /**
       * @type {(Worker|null)}
       */

      this._worker = null;
      /**
       * @type {(Pjax|null)}
       */

      this._pjax = null;
      /**
       * @type {(CacheProvider|null)}
       */

      this._cacheProvider = null;
    }

    createClass(Prefetch, [{
      key: "init",
      value: function init() {
        if (!window.history.pushState) {
          return false;
        }

        document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
        document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
      }
    }, {
      key: "onLinkEnter",
      value: function onLinkEnter(evt) {
        var el = evt.target;

        while (el && !this._pjax.getHref(el)) {
          el = el.parentNode;
        }

        if (!el || el.classList.contains(this.noPrefetchClass)) {
          return;
        }

        var url = this._pjax.getHref(el); // Check if the link is eligible for Pjax


        if (this._pjax.preventCheck(evt, el) && this._cacheProvider && !this._cacheProvider.get(url)) {
          var xhr = Utils.request(url, this._worker);

          if (this._cacheProvider) {
            this._cacheProvider.set(url, xhr);
          }
        }
      }
    }, {
      key: "worker",
      set: function set(value) {
        this._worker = value;
      }
    }, {
      key: "pjax",
      set: function set(value) {
        this._pjax = value;
      }
    }, {
      key: "cacheProvider",
      set: function set(value) {
        this._cacheProvider = value;
      }
    }]);

    return Prefetch;
  }();

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
  var CacheProvider =
  /*#__PURE__*/
  function () {
    function CacheProvider() {
      classCallCheck(this, CacheProvider);

      this.data = {};
    }
    /**
     * @param  {String} key
     * @return {Boolean}
     */


    createClass(CacheProvider, [{
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
   * @file GraphicLoader.js
   * @author Ambroise Maupate
   */

  /**
   * Handle your application main loader animation.
   *
   * **Do not instanciate this class directly, create a sub-class**.
   */
  var GraphicLoader =
  /*#__PURE__*/
  function () {
    /**
     * Interface for a graphic loader element.
     *
     * Any child implementations must implements
     * show and hide methods.
     *
     * @abstract
     */
    function GraphicLoader() {
      classCallCheck(this, GraphicLoader);

      console.debug('🌀 Construct loader');
    }
    /**
     * Show loader.
     *
     * @abstract
     */


    createClass(GraphicLoader, [{
      key: "show",
      value: function show() {
        console.debug('🌀 Show loader');
      }
      /**
       * Hide loader.
       *
       * @abstract
       */

    }, {
      key: "hide",
      value: function hide() {
        console.debug('🌀 Hide loader');
      }
    }]);

    return GraphicLoader;
  }();

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var runtime = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  !(function(global) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }

    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = module.exports;

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    runtime.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    runtime.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    runtime.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    runtime.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );

      return runtime.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator.return) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;

    function doneResult() {
      return { value: undefined, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };
  })(
    // In sloppy mode, unbound `this` refers to the global object, fallback to
    // Function constructor if we're in global strict mode. That is sadly a form
    // of indirect eval which violates Content Security Policy.
    (function() {
      return this || (typeof self === "object" && self);
    })() || Function("return this")()
  );
  });

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  // This method of obtaining a reference to the global object needs to be
  // kept identical to the way it is obtained in runtime.js
  var g = (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")();

  // Use `getOwnPropertyNames` because not all browsers support calling
  // `hasOwnProperty` on the global `self` object in a worker. See #183.
  var hadRuntime = g.regeneratorRuntime &&
    Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

  // Save the old regeneratorRuntime in case it needs to be restored later.
  var oldRuntime = hadRuntime && g.regeneratorRuntime;

  // Force reevalutation of runtime.js.
  g.regeneratorRuntime = undefined;

  var runtimeModule = runtime;

  if (hadRuntime) {
    // Restore the original runtime.
    g.regeneratorRuntime = oldRuntime;
  } else {
    // Remove the global property added by runtime.js.
    try {
      delete g.regeneratorRuntime;
    } catch(e) {
      g.regeneratorRuntime = undefined;
    }
  }

  var regenerator = runtimeModule;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var asyncToGenerator = _asyncToGenerator;

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
    var timeout;
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

  /**
   * Base class for creating block implementations.
   *
   * **Do not instanciate this class directly, create a sub-class**.
   *
   * @abstract
   */

  var AbstractBlock =
  /*#__PURE__*/
  function () {
    /**
     * Abstract block constructor.
     *
     * It‘s better to extend this class by using `init` method instead
     * of extending `constructor`.
     *
     * @param  {AbstractPage} page
     * @param  {HTMLElement} container
     * @param  {String} type
     *
     * @constructor
     */
    function AbstractBlock(page, container, type) {
      classCallCheck(this, AbstractBlock);

      type = type || 'block';
      /**
       * Current page instance
       *
       * @type {AbstractPage}
       */

      this.page = page;
      /**
       * Container
       * Root container HTMLElement for current block.
       *
       * @type {HTMLElement}
       */

      this.container = container;
      /**
       * Block id
       *
       * @type {String}
       */

      this.id = this.container.id;
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

      this.name = this.container.hasAttribute('data-node-name') ? this.container.getAttribute('data-node-name') : ''; // Binded methods

      this.onResize = this.onResize.bind(this);
      this.onResizeDebounce = debounce(this.onResize, 50, false); // Debugs

      console.debug('\t✳️ #' + this.id + ' %c[' + type + ']', 'color:grey');
      this.init();
      this.initEvents();
    }
    /**
     * Basic members initialization for children classes.
     * Do not search for page blocks here, use `onPageReady` method instead
     *
     * @abstract
     */


    createClass(AbstractBlock, [{
      key: "init",
      value: function init() {}
      /**
       * Bind load and resize events for this specific block.
       *
       * Do not forget to call `super.initEvents();` while extending this method.
       *
       * @abstract
       */

    }, {
      key: "initEvents",
      value: function initEvents() {
        window.addEventListener('resize', this.onResizeDebounce);
      }
      /**
       * Destroy current block.
       *
       * Do not forget to call `super.destroy();` while extending this method.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        console.debug('\t🗑 #' + this.id);
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
      key: "destroyEvents",
      value: function destroyEvents() {
        window.removeEventListener('resize', this.onResizeDebounce);
      }
      /**
       * Called on window resize
       *
       * @abstract
       */

    }, {
      key: "onResize",
      value: function onResize() {}
      /**
       * Called once all page blocks have been created.
       *
       * @abstract
       */

    }, {
      key: "onPageReady",
      value: function onPageReady() {}
    }]);

    return AbstractBlock;
  }();

  /**
   * Base class for creating page implementations.
   *
   * **Do not instanciate this class directly, create a sub-class**.
   *
   * @abstract
   */

  var AbstractPage =
  /*#__PURE__*/
  function () {
    /**
     * Base constructor for Pages.
     *
     * Do not override this method, override `init` method instead.
     *
     * @param  {Kernel}  kernel
     * @param  {HTMLElement}  container
     * @param  {String}  context
     * @param  {String}  type
     *
     * @constructor
     */
    function AbstractPage(kernel, container, context, type) {
      classCallCheck(this, AbstractPage);

      type = type || 'page';

      if (!container) {
        throw new Error('AbstractPage need a container (HTMLElement) to be defined.');
      }

      if (!kernel) {
        throw new Error('AbstractPage need a Kernel instance to be defined.');
      }
      /**
       * Kernel
       *
       * @type {Kernel}
       */


      this.kernel = kernel;
      /**
       * Container element
       *
       * @type {HTMLElement}
       */

      this.container = container;

      if (!this.container) {
        throw new Error("AbstractPage: container not found!");
      }
      /**
       * Page id
       *
       * @type {String}
       */


      this.id = this.container.id;

      if (!this.id) {
        throw new Error("AbstractPage: container have no id!");
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
       * @type {boolean}
       */

      this.isHome = this.container.getAttribute('data-is-home') === '1';
      /**
       * Lazyload instance
       *
       * @type {Lazyload|null}
       */

      this.lazyload = null;
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

      this.name = this.container.hasAttribute('data-node-name') ? this.container.getAttribute('data-node-name') : '';
      this.metaTitle = this.container.hasAttribute('data-meta-title') ? this.container.getAttribute('data-meta-title') : ''; // Binded methods

      this.onResize = this.onResize.bind(this);
      this.onResizeDebounce = debounce(this.onResize, 50, false);
      this.bindedUpdateBlocks = debounce(this.updateBlocks.bind(this), 50, false);
      this.onLazyImageSet = this.onLazyImageSet.bind(this);
      this.onLazyImageLoad = this.onLazyImageLoad.bind(this);
      this.onLazyImageProcessed = this.onLazyImageProcessed.bind(this); // Debug

      console.debug('✳️ #' + this.id + ' %c[' + type + '] [' + this.context + ']', 'color:grey');
    }
    /**
     * Initialize page.
     *
     * You should always extends this method in your child implementations instead
     * of extending page constructor.
     */


    createClass(AbstractPage, [{
      key: "init",
      value: function () {
        var _init = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee() {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  /**
                   * HTMLElement blocks collection.
                   *
                   * @type {Array}
                   */
                  this.blockElements = toConsumableArray(this.container.querySelectorAll(".".concat(this.kernel.options.pageBlockClass)));
                  /**
                   * @type {Number}
                   */

                  this.blockLength = this.blockElements.length;

                  if (!this.blockLength) {
                    _context.next = 5;
                    break;
                  }

                  _context.next = 5;
                  return this.initBlocks();

                case 5:
                  // Context
                  if (this.kernel.options.ajaxEnabled && this.context === 'ajax') {
                    this.initAjax();
                  } // Lazyload


                  if (this.kernel.options.lazyloadEnabled) {
                    this.initLazyload();
                  }

                  this.initEvents();

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function init() {
          return _init.apply(this, arguments);
        };
      }()
      /**
       * Destroy current page and all its blocks.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        console.debug('🗑 #' + this.id);
        this.container.parentNode.removeChild(this.container);
        this.destroyEvents(); // Do not remove name class on body if destroyed page is the same as current one.

        if (this.kernel.page !== null && this.kernel.page.name !== this.name) {
          document.body.classList.remove(this.name);
        } // Do not remove type class on body if destroyed page is the same as current one.


        if (this.kernel.page !== null && this.kernel.page.type !== this.type) {
          document.body.classList.remove(this.type);
        } // Blocks


        if (this.blocks !== null) {
          for (var blockIndex in this.blocks) {
            if (this.blocks.hasOwnProperty(blockIndex)) {
              this.blocks[blockIndex].destroy();
            }
          }
        } // Remove Lazyload instance and listeners


        if (this.lazyload !== null) {
          this.lazyload.destroy();
          this.lazyload = null;
        }
      }
      /**
       * Initialize basic events.
       */

    }, {
      key: "initEvents",
      value: function initEvents() {
        window.addEventListener('resize', this.onResizeDebounce);
        this.domObserver = new window.MutationObserver(this.bindedUpdateBlocks);
        this.domObserver.observe(this.container, {
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
      key: "destroyEvents",
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
      key: "initLazyload",
      value: function initLazyload() {
        this.beforeLazyload(); // this.lazyload = new Lazyload({
        //     threshold: this.kernel.options.lazyloadThreshold,
        //     throttle: this.kernel.options.lazyloadThrottle,
        //     elements_selector: '.' + this.kernel.options.lazyloadClass,
        //     data_src: this.kernel.options.lazyloadSrcAttr.replace('data-', ''),
        //     data_srcset: this.kernel.options.lazyloadSrcSetAttr.replace('data-', ''),
        //     callback_set: this.onLazyImageSet,
        //     callback_load: this.onLazyImageLoad,
        //     callback_processed: this.onLazyImageProcessed
        // })
      }
    }, {
      key: "updateLazyload",
      value: function updateLazyload() {
        if (this.lazyload) {
          this.lazyload.update();
        }
      }
      /**
       * @param {Function} onShow
       */

    }, {
      key: "show",
      value: function show(onShow) {
        console.debug('▶️ #' + this.id);
        this.container.style.opacity = '1';
        if (typeof onShow !== 'undefined') onShow();
        this.container.classList.remove(this.kernel.options.pageClass + '-transitioning');
        Dispatcher.commit(AFTER_PAGE_SHOW, this);
      }
      /**
       * @param {Function} onHidden
       */

    }, {
      key: "hide",
      value: function hide(onHidden) {
        Dispatcher.commit(BEFORE_PAGE_HIDE, this);
        console.debug('◀️ #' + this.id);
        this.container.style.opacity = '0';
        if (typeof onHidden !== 'undefined') onHidden();
        Dispatcher.commit(AFTER_PAGE_HIDE, this);
      }
    }, {
      key: "initAjax",
      value: function initAjax() {
        this.container.classList.add(this.kernel.options.pageClass + '-transitioning');
      }
      /**
       * Initialize page blocks on page.
       */

    }, {
      key: "initBlocks",
      value: function () {
        var _initBlocks = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee2() {
          var blockIndex, block, i;
          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  blockIndex = 0;

                case 1:
                  if (!(blockIndex < this.blockLength)) {
                    _context2.next = 9;
                    break;
                  }

                  _context2.next = 4;
                  return this.initSingleBlock(this.blockElements[blockIndex]);

                case 4:
                  block = _context2.sent;
                  // Prevent undefined blocks to be appended to block collection.
                  this.blocks.push(block);

                case 6:
                  blockIndex++;
                  _context2.next = 1;
                  break;

                case 9:
                  // Notify all blocks that page init is over.
                  for (i = this.blocks.length - 1; i >= 0; i--) {
                    if (typeof this.blocks[i].onPageReady === 'function') this.blocks[i].onPageReady();
                  }

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function initBlocks() {
          return _initBlocks.apply(this, arguments);
        };
      }()
      /**
       * Append new blocks which were not present at init.
       */

    }, {
      key: "updateBlocks",
      value: function () {
        var _updateBlocks = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee3() {
          var blockIndex, blockElement, block;
          return regenerator.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  console.debug('\t📯 Page DOM changed…'); // Update lazy load if init.

                  this.updateLazyload(); // Create new blocks

                  this.blockElements = this.container.querySelectorAll(".".concat(this.kernel.options.pageBlockClass));
                  this.blockLength = this.blockElements.length;
                  blockIndex = 0;

                case 5:
                  if (!(blockIndex < this.blockLength)) {
                    _context3.next = 22;
                    break;
                  }

                  blockElement = this.blockElements[blockIndex];

                  if (this.getBlockById(blockElement.id)) {
                    _context3.next = 19;
                    break;
                  }

                  _context3.prev = 8;
                  _context3.next = 11;
                  return this.initSingleBlock(this.blockElements[blockIndex]);

                case 11:
                  block = _context3.sent;
                  this.blocks.push(block);
                  block.onPageReady();
                  _context3.next = 19;
                  break;

                case 16:
                  _context3.prev = 16;
                  _context3.t0 = _context3["catch"](8);
                  console.info(_context3.t0.message);

                case 19:
                  blockIndex++;
                  _context3.next = 5;
                  break;

                case 22:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[8, 16]]);
        }));

        return function updateBlocks() {
          return _updateBlocks.apply(this, arguments);
        };
      }()
      /**
       * @param {HTMLElement} blockElement
       * @return {AbstractBlock}
       */

    }, {
      key: "initSingleBlock",
      value: function () {
        var _initSingleBlock = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee4(blockElement) {
          var type, blockInstance;
          return regenerator.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  type = blockElement.getAttribute(this.kernel.options.objectTypeAttr);
                  _context4.next = 3;
                  return this.kernel.classFactory.getBlockInstance(this, blockElement, type);

                case 3:
                  blockInstance = _context4.sent;

                  if (blockInstance) {
                    _context4.next = 6;
                    break;
                  }

                  return _context4.abrupt("return", new AbstractBlock(this, blockElement, type));

                case 6:
                  return _context4.abrupt("return", blockInstance);

                case 7:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        return function initSingleBlock(_x) {
          return _initSingleBlock.apply(this, arguments);
        };
      }()
      /**
       * Get a page block instance from its `id`.
       *
       * @param  {String} id
       * @return {AbstractBlock|null}
       */

    }, {
      key: "getBlockById",
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
      key: "getBlockIndexById",
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
      key: "getFirstBlockByType",
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
      key: "getFirstBlockIndexByType",
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
      key: "onResize",
      value: function onResize() {}
      /**
       * Called before init lazyload images.
       */

    }, {
      key: "beforeLazyload",
      value: function beforeLazyload() {}
      /**
       * After image src switched.
       *
       * @abstract
       * @param {HTMLImageElement} element
       */

    }, {
      key: "onLazyImageSet",
      value: function onLazyImageSet(element) {
        console.debug('\t🖼 «' + element.id + '» set');
      }
      /**
       * After lazyload image loaded.
       *
       * @abstract
       * @param {HTMLImageElement} element
       */

    }, {
      key: "onLazyImageLoad",
      value: function onLazyImageLoad(element) {
        console.debug('\t🖼 «' + element.id + '» load');
      }
      /**
       * Before lazyload.
       *
       * @abstract
       */

    }, {
      key: "onLazyImageProcessed",
      value: function onLazyImageProcessed(index) {
        console.debug('\t🖼 Lazy load processed');
      }
    }]);

    return AbstractPage;
  }();

  /**
   * Base class for creating transition.
   *
   * @abstract
   */

  var AbstractTransition =
  /*#__PURE__*/
  function () {
    /**
     * Constructor.
     * Do not override this method.
     *
     * @constructor
     */
    function AbstractTransition() {
      classCallCheck(this, AbstractTransition);

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


    createClass(AbstractTransition, [{
      key: "init",
      value: function init(oldPage, newPagePromise) {
        var _this = this;

        this.oldPage = oldPage;
        this._newPagePromise = newPagePromise;
        this.deferred = Utils.deferred();
        this.newPageReady = Utils.deferred();
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
      key: "done",
      value: function done() {
        this.oldPage.destroy();
        this.newPage.container.style.visibility = 'visible';
        this.newPage.updateLazyload();
        this.deferred.resolve();
      }
      /**
       * Entry point to create a custom Transition.
       * @abstract
       */

    }, {
      key: "start",
      value: function start() {}
    }]);

    return AbstractTransition;
  }();

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  /**
   * Default Transition. Show / Hide content.
   *
   * @extends {AbstractTransition}
   */

  var DefaultTransition =
  /*#__PURE__*/
  function (_AbstractTransition) {
    inherits(DefaultTransition, _AbstractTransition);

    function DefaultTransition() {
      classCallCheck(this, DefaultTransition);

      return possibleConstructorReturn(this, getPrototypeOf(DefaultTransition).apply(this, arguments));
    }

    createClass(DefaultTransition, [{
      key: "start",
      value: function start() {
        Promise.all([this.newPageLoading]).then(this.finish.bind(this));
      }
    }, {
      key: "finish",
      value: function finish() {
        document.body.scrollTop = 0;
        this.done();
      }
    }]);

    return DefaultTransition;
  }(AbstractTransition);

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
  var Scroll =
  /*#__PURE__*/
  function () {
    function Scroll() {
      classCallCheck(this, Scroll);
    }

    createClass(Scroll, null, [{
      key: "_preventDefault",

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
      key: "_keydown",
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
      key: "_wheel",
      value: function _wheel(e) {
        Scroll._preventDefault(e);
      }
      /**
       * Disable scroll.
       *
       * @return {void}
       */

    }, {
      key: "disable",
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
      key: "enable",
      value: function enable() {
        if (window.removeEventListener) {
          window.removeEventListener('DOMMouseScroll', Scroll._wheel, false);
        }

        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
      }
    }]);

    return Scroll;
  }();

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
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (
      /* function */
      callback) {
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
      var method;

      var noop = function noop() {};

      var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
      var length = methods.length;
      var console = window.console = window.console || {};

      while (length--) {
        method = methods[length]; // Only stub undefined methods.

        if (!console[method]) {
          console[method] = noop;
        }
      }
    }
    /**
     * Array.from polyfill
     */

    if (!Array.from) {
      Array.from = function (object) {

        return [].slice.call(object);
      };
    }
    /**
     * Array.find polyfill
     */


    if (!Array.prototype.find) {
      // eslint-disable-next-line no-extend-native
      Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
          if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
          }

          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }

          var list = Object(this);
          var length = list.length >>> 0;
          var thisArg = arguments[1];
          var value;

          for (var i = 0; i < length; i++) {
            value = list[i];

            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }

          return undefined;
        }
      });
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

          var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

          var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


          var thisArg = arguments[1]; // 5. Let k be 0.

          var k = 0; // 6. Repeat, while k < len

          while (k < len) {
            // a. Let Pk be ! ToString(k).
            // b. Let kValue be ? Get(O, Pk).
            // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
            // d. If testResult is true, return k.
            var kValue = o[k];

            if (predicate.call(thisArg, kValue, k, o)) {
              return k;
            } // e. Increase k by 1.


            k++;
          } // 7. Return -1.


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
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }

      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent;
    })();
  }

  /**
   * Method to track JS errors if your Google Analytics account.
   */
  function gaTrackErrors() {
    if (typeof ga !== 'undefined') {
      // Pure JavaScript errors handler
      window.addEventListener('error', function (err) {
        var lineAndColumnInfo = err.colno ? ' line:' + err.lineno + ', column:' + err.colno : ' line:' + err.lineno;
        window.ga('send', 'event', 'JavaScript Error', err.message, err.filename + lineAndColumnInfo + ' -> ' + navigator.userAgent, 0, true);
      });
    }
  }

  /**
   * Static class to get bootstrap breakpoints.
   */

  var BootstrapMedia =
  /*#__PURE__*/
  function () {
    function BootstrapMedia() {
      classCallCheck(this, BootstrapMedia);

      // Values
      this.viewportSize = null;
      this.breakpoints = {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1920 // Binded methods

      };
      this.setValues = this.setValues.bind(this); // Init

      this.init();
    }

    createClass(BootstrapMedia, [{
      key: "init",
      value: function init() {
        window.addEventListener('resize', this.setValues);
        this.setValues();
      }
    }, {
      key: "setValues",
      value: function setValues() {
        this.viewportSize = Utils.getViewportSize();
      }
    }, {
      key: "resize",
      value: function resize() {
        this.setValues();
      }
    }, {
      key: "isMin",
      value: function isMin(breakpoint) {
        if (!this.breakpoints[breakpoint]) {
          var errorMessage = "Breakpoint '".concat(breakpoint, "' do not exist");
          console.error(errorMessage);
          throw new Error(errorMessage);
        }

        return this.viewportSize.width >= this.breakpoints[breakpoint];
      }
    }]);

    return BootstrapMedia;
  }();

  exports.EventTypes = EventTypes;
  exports.Kernel = Kernel;
  exports.Pjax = Pjax;
  exports.History = History;
  exports.Prefetch = Prefetch;
  exports.CacheProvider = CacheProvider;
  exports.GraphicLoader = GraphicLoader;
  exports.AbstractPage = AbstractPage;
  exports.AbstractBlock = AbstractBlock;
  exports.AbstractTransition = AbstractTransition;
  exports.DefaultTransition = DefaultTransition;
  exports.Utils = Utils;
  exports.Scroll = Scroll;
  exports.polyfills = polyfills;
  exports.gaTrackErrors = gaTrackErrors;
  exports.debounce = debounce;
  exports.BootstrapMedia = BootstrapMedia;

  return exports;

}({}));
