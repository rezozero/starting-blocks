define(["pages/page", "utils/polyfills", "router", "graphicLoader", "nav", "jquery"], function (_page, _polyfills, _router, _graphicLoader, _nav, _jquery) {
  "use strict";

  var _page2 = _interopRequireDefault(_page);

  var _polyfills2 = _interopRequireDefault(_polyfills);

  var _router2 = _interopRequireDefault(_router);

  var _graphicLoader2 = _interopRequireDefault(_graphicLoader);

  var _nav2 = _interopRequireDefault(_nav);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /*
   * Declare polyfills
   */
  (0, _polyfills2.default)();

  /*
   * Begin main app ---
   */
  var $body = (0, _jquery2.default)('body');
  var nodeType = $body[0].getAttribute('data-node-type') || 'page';
  var dataHome = $body[0].getAttribute('data-is-home');
  var bodyId = $body[0].id;
  var isHome = dataHome == '1' ? true : false;

  var router = new _router2.default({
    homeHasClass: false,
    ajaxEnabled: true
  }, {
    /*
     * Routes are nodeType corresponding to
     * ES6 modules
     */
    'page': _page2.default
  },
  // temp namespace is defined in your index.html
  temp.baseUrl, new _graphicLoader2.default(), new _nav2.default());
  router.initEvents();
  router.boot((0, _jquery2.default)('.page-content').eq(0), 'static', isHome);
});
//# sourceMappingURL=main.js.map
