define(["jquery", "utils/polyfills", "router", "graphicLoader", "abstract-nav", "pages/page"], function (_jquery, _polyfills, _router, _graphicLoader, _abstractNav, _page) {
    "use strict";

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /*
     * Declare polyfills
     */
    (0, _polyfills.polyfills)();

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
        ajaxEnabled: true,
        preBoot: function preBoot() {
            console.log('--- preboot');
        },
        postLoad: function postLoad() {
            console.log('--- postLoad');
        },
        preLoad: function preLoad() {
            console.log('--- preLoad');
        },
        onDestroy: function onDestroy() {
            console.log('--- onDestroy');
        },
        prePushState: function prePushState() {
            console.log('--- prePushState');
        }
    }, {
        /*
         * Routes are nodeType corresponding to
         * ES6 modules
         */
        'page': _page.Page
    },
    // temp namespace is defined in your index.html
    temp.baseUrl, new _graphicLoader.GraphicLoader(), new _abstractNav.AbstractNav());
    router.initEvents();
    router.boot((0, _jquery2.default)('.page-content').eq(0), 'static', isHome);
});
//# sourceMappingURL=main.js.map
