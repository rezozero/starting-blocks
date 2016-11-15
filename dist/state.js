define(["exports", "jquery"], function (exports, _jquery) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.State = undefined;

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

  var State = exports.State = function () {
    /**
     *
     * @param {Router} router
     * @param {String} link
     * @param {Object} options Extends state options.
     */

    function State(router, link, options) {
      _classCallCheck(this, State);

      /**
       * Keep custom informations such as:
       *
       * - `previousType`: Default `"page"`
       * - `previousName`: Default `"home"`
       * - `navLinkClass`: Default `"nav-link"`
       * - `previousHref`: Default `window.location.href`
       *
       * @type {Object}
       */
      this.options = {
        previousType: "page",
        previousName: "home",
        navLinkClass: "nav-link",
        previousHref: window.location.href
      };

      if (options !== null) {
        this.options = _jquery2.default.extend(this.options, options);
      }

      var context = link.className.indexOf(this.options.navLinkClass) >= 0 ? 'nav' : 'link';
      var dataHome = link.getAttribute('data-is-home');
      var isHome = dataHome == '1' ? true : false;

      var title = link.getAttribute('data-title');
      if (title === '') title = link.innerHTML;

      var nodeType = link.getAttribute(router.options.ajaxLinkTypeAttr);
      if (nodeType === null || nodeType === '') {
        var objectTypeAttr = link.getAttribute(router.options.objectTypeAttr);
        if (objectTypeAttr !== null && objectTypeAttr !== '') nodeType = objectTypeAttr;else nodeType = "page";
      }

      /**
       * @type {String}
       */
      this.title = title;
      /**
       * @type {String}
       */
      this.href = link.href;
      /**
       * @type {String}
       */
      this.nodeType = nodeType;
      /**
       * @type {String}
       */
      this.nodeName = link.getAttribute('data-node-name');
      /**
       * @type {Number}
       */
      this.index = Number(link.getAttribute('data-index'));
      /**
       * @type {String}
       */
      this.transition = this.options.previousType + '_to_' + nodeType;
      /**
       * History change context:
       *
       * - `nav`
       * - `link`
       *
       * @type {String}
       */
      this.context = context;
      /**
       * @type {Boolean}
       */
      this.isHome = isHome;

      console.log('STATE');
      console.log(this);
    }

    /**
     * Update
     * @param  {AbstractPage} page
     * @return {this}      
     */


    State.prototype.update = function update(page) {
      this.transition = this.options.previousType + '_to_' + page.type;
      this.nodeName = page.name;
      this.isHome = page.isHome;
      this.nodeType = page.type;

      if (history.replaceState) {
        history.replaceState(this, document.title, window.location.href);
      }
    };

    return State;
  }();
});
//# sourceMappingURL=state.js.map
