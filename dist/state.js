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

  var State = exports.State = function State(router, link, options) {
    _classCallCheck(this, State);

    /**
     * Keep custom informations such as:
     *
     * - `previousType`: Default `"page"`
     * - `navLinkClass`: Default `"nav-link"`
     *
     * @type {Object}
     */
    this.options = {
      previousType: "page",
      navLinkClass: "nav-link"
    };

    if (options !== null) {
      this.options = _jquery2.default.extend(this.options, options);
    }

    var context = link.className.indexOf(this.options.navLinkClass) >= 0 ? 'nav' : 'link';
    var dataHome = link.getAttribute('data-is-home');
    var isHome = dataHome == '1' ? true : false;
    var title = link.getAttribute('data-title');
    var nodeType = link.getAttribute(router.options.objectTypeAttr);

    if (title === '') title = link.innerHTML;
    if (nodeType === '') nodeType = "page";

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
  };
});
//# sourceMappingURL=state.js.map
