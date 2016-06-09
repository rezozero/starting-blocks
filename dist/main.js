define(["jquery", "loglevel", "utils/polyfills", "router", "graphicLoader", "abstract-nav", "class-factory"], function (_jquery, _loglevel, _polyfills, _router, _graphicLoader, _abstractNav, _classFactory) {
    "use strict";

    var _jquery2 = _interopRequireDefault(_jquery);

    var _loglevel2 = _interopRequireDefault(_loglevel);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /*
     * Declare polyfills
     */
    (0, _polyfills.polyfills)();

    _loglevel2.default.setLevel(0);
    /*
     * Begin main app ---
     */
    var $body = (0, _jquery2.default)('body');
    var nodeType = $body[0].getAttribute('data-node-type') || 'page';
    var dataHome = $body[0].getAttribute('data-is-home');
    var bodyId = $body[0].id;
    var isHome = dataHome == '1' ? true : false;

    var router = new _router.Router({
        homeHasClass: false,
        ajaxEnabled: false,
        preBoot: function preBoot() {
            _loglevel2.default.debug('--- preboot');
        },
        postLoad: function postLoad() {
            _loglevel2.default.debug('--- postLoad');
        },
        preLoad: function preLoad() {
            _loglevel2.default.debug('--- preLoad');
        },
        onDestroy: function onDestroy() {
            _loglevel2.default.debug('--- onDestroy');
        },
        prePushState: function prePushState() {
            _loglevel2.default.debug('--- prePushState');
        }
    }, new _classFactory.ClassFactory(),
    // temp namespace is defined in your index.html
    temp.baseUrl, new _graphicLoader.GraphicLoader(), new _abstractNav.AbstractNav());
    router.initEvents();
    router.boot((0, _jquery2.default)('.page-content').eq(0), 'static', isHome);
});
//# sourceMappingURL=main.js.map
