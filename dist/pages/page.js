define(["exports", "abstract-page", "utils/bootstrapMedia"], function (exports, _abstractPage, _bootstrapMedia) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Page = undefined;

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Page = exports.Page = function (_AbstractPage) {
    _inherits(Page, _AbstractPage);

    /**
     * Some example "page" page.
     *
     * @param  {Router}  router
     * @param  {jQuery}  $cont
     * @param  {String}  context
     * @param  {String}  type
     * @param  {Boolean} isHome
     */

    function Page(router, $cont, context, type, isHome) {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).call(this, router, $cont, context, type, isHome));
    }

    _createClass(Page, [{
      key: "onResize",
      value: function onResize() {
        _get(Object.getPrototypeOf(Page.prototype), "onResize", this).call(this);

        // if (BootstrapMedia.isMinSM()) {
        //     console.log('-- sm');
        // }
        // if (BootstrapMedia.isMinMD()) {
        //     console.log('-- md');
        // }
        // if (BootstrapMedia.isMinLG()) {
        //     console.log('-- lg');
        // }
      }
    }]);

    return Page;
  }(_abstractPage.AbstractPage);
});
//# sourceMappingURL=page.js.map
