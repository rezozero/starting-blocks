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

    var Nav = exports.Nav = function () {
        function Nav() {
            _classCallCheck(this, Nav);

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
         * @param {JQuery object} $cont
         */


        _createClass(Nav, [{
            key: "update",
            value: function update($cont) {
                if (!$cont) {
                    throw "Nav update method needs a JQuery DOM object.";
                }
                this.$cont = $cont;

                // console.log('[Nav] Updated for ' + this.$cont[0].id);
            }

            /**
             * Bind navigation against router.
             *
             * @param {Router} router
             */

        }, {
            key: "initEvents",
            value: function initEvents(router) {
                if (!router) {
                    throw "Nav initEvents method needs a Router object.";
                }
                // console.log('Init nav events');
            }
        }]);

        return Nav;
    }();
});
//# sourceMappingURL=nav.js.map
