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

  var GraphicLoader = exports.GraphicLoader = function () {

    /**
     * Interface for a graphic loader element.
     *
     * Any child implementations must implements
     * show and hide methods.
     */

    function GraphicLoader() {
      _classCallCheck(this, GraphicLoader);
    }

    /**
     * Show loader.
     */


    _createClass(GraphicLoader, [{
      key: 'show',
      value: function show() {
        console.log('[GraphicLoader] Show loader.');
      }

      /**
       * Hide loader.
       */

    }, {
      key: 'hide',
      value: function hide() {
        console.log('[GraphicLoader] Hide loader.');
      }
    }]);

    return GraphicLoader;
  }();
});
//# sourceMappingURL=graphicLoader.js.map
