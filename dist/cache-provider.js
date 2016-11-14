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

    var CacheProvider = exports.CacheProvider = function () {
        function CacheProvider() {
            _classCallCheck(this, CacheProvider);

            this.hash = {};
        }

        /**
         * @param  {String} href
         * @return {Boolean}
         */


        CacheProvider.prototype.exists = function exists(href) {
            if (href in this.hash) {
                return true;
            }
            return false;
        };

        /**
         * @param  {String} href
         * @return {Object}
         */


        CacheProvider.prototype.fetch = function fetch(href) {
            return this.hash[href];
        };

        /**
         * @param  {String} href
         * @param  {Object} data
         * @return {CacheProvider}  this
         */


        CacheProvider.prototype.save = function save(href, data) {
            this.hash[href] = data;
            return this;
        };

        return CacheProvider;
    }();
});
//# sourceMappingURL=cache-provider.js.map
