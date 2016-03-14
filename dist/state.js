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

    var State = exports.State = function State(link, options) {
        _classCallCheck(this, State);

        this.options = {
            previousType: "page",
            navLinkClass: "nav-link"
        };

        if (options !== null) {
            this.options = _jquery2.default.extend(this.options, options);
        }

        var context = link.className.indexOf(this.options.navLinkClass) >= 0 ? 'nav' : 'link',
            dataHome = link.getAttribute('data-is-home'),
            isHome = dataHome == '1' ? true : false,
            title = link.getAttribute('data-title'),
            nodeType = link.getAttribute('data-node-type');

        if (title === '') title = link.innerHTML;
        if (nodeType === '') nodeType = "page";

        this.title = title;
        this.href = link.href;
        this.nodeType = nodeType;
        this.nodeName = link.getAttribute('data-node-name');
        this.index = Number(link.getAttribute('data-index'));
        this.transition = this.options.previousType + '_to_' + nodeType;
        this.context = context;
        this.isHome = isHome;
    };
});
//# sourceMappingURL=state.js.map
