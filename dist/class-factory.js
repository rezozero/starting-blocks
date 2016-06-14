define(["exports", "loglevel", "pages/page", "pages/home", "abstract-block"], function (exports, _loglevel, _page, _home, _abstractBlock) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ClassFactory = undefined;

    var _loglevel2 = _interopRequireDefault(_loglevel);

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

    var ClassFactory = exports.ClassFactory = function () {
        function ClassFactory() {
            _classCallCheck(this, ClassFactory);
        }

        /**
         * Returns an AbstractPage child class instance
         * according to the nodeTypeName or an AbstractPage as default.
         *
         * @param  {String}  nodeTypeName
         * @param  {Router}  router
         * @param  {jQuery}  $cont
         * @param  {String}  context
         * @param  {String}  nodeType
         * @param  {Boolean} isHome
         * @return {AbstractPage}
         */

        ClassFactory.prototype.getPageInstance = function getPageInstance(nodeTypeName, router, $cont, context, nodeType, isHome) {
            switch (nodeTypeName) {
                case 'home':
                    _loglevel2.default.debug('Create new home');
                    return new _home.Home(router, $cont, context, nodeType, isHome);
                default:
                    _loglevel2.default.info('"' + nodeTypeName + '" has no defined route, using Page.');
                    return new _page.Page(router, $cont, context, nodeType, isHome);
            }
        };

        /**
         * Returns an AbstractBlock child class instance
         * according to the nodeTypeName or an AbstractBlock as default.
         *
         * @param  {String}  nodeTypeName
         * @param  {AbstractPage} page
         * @param  {jQuery}  $cont
         * @return {AbstractBlock}
         */


        ClassFactory.prototype.getBlockInstance = function getBlockInstance(nodeTypeName, page, $cont) {
            switch (nodeTypeName) {
                /*case 'map-block':
                    return new MapBlock(page, $cont, nodeTypeName);*/
                default:
                    _loglevel2.default.info('    "' + nodeTypeName + '" has no defined route, using AbstractBlock.');
                    return new _abstractBlock.AbstractBlock(page, $cont, nodeTypeName);
            }
        };

        return ClassFactory;
    }();
});
//# sourceMappingURL=class-factory.js.map
