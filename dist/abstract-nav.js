define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AbstractNav = exports.AbstractNav = function () {

    /**
     * Interface for a navigation element.
     *
     * Any child implementations must implements
     * update method.
     */

    function AbstractNav() {
      _classCallCheck(this, AbstractNav);

      /**
       * Page DOM section.
       *
       * @type {jQuery}
       */
      this.$cont = null;
    }

    /**
     * Update navigation state against a DOM container.
     *
     * @abstract
     * @param {AbstractPage} page
     */


    AbstractNav.prototype.update = function update(page) {
      if (!page) {
        throw "Nav update method needs a Page object.";
      }

      this.page = page;
    };

    /**
     * Bind navigation against router.
     *
     * @param {Router} router
     * @abstract
     */


    AbstractNav.prototype.initEvents = function initEvents(router) {
      if (!router) {
        throw "Nav initEvents method needs a Router object.";
      }
    };

    return AbstractNav;
  }();
});
//# sourceMappingURL=abstract-nav.js.map
