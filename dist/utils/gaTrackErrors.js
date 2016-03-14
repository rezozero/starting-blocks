define(['exports', 'jquery'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.gaTrackErrors = gaTrackErrors;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function gaTrackErrors() {
        if (typeof ga !== 'undefined') {
            // Pure JavaScript errors handler
            window.addEventListener('error', function (err) {
                var lineAndColumnInfo = err.colno ? ' line:' + err.lineno + ', column:' + err.colno : ' line:' + err.lineno;
                ga('send', 'event', 'JavaScript Error', err.message, err.filename + lineAndColumnInfo + ' -> ' + navigator.userAgent, 0, true);
            });

            // jQuery errors handler (jQuery API)
            _jquery2.default.error = function (message) {
                ga('send', 'event', 'jQuery Error', message, navigator.userAgent, 0, true);
            };

            // jQuery AJAX errors handler (jQuery API)
            (0, _jquery2.default)(document).ajaxError(function (event, request, settings) {
                ga('send', 'event', 'jQuery Ajax Error', settings.url, JSON.stringify({
                    result: event.result,
                    status: request.status,
                    statusText: request.statusText,
                    crossDomain: settings.crossDomain,
                    dataType: settings.dataType
                }), 0, true);
            });
        }
    } /**
       * Tracks errors with Analytics
       * http://blog.gospodarets.com/track_javascript_angularjs_and_jquery_errors_with_google_analytics/
       */
});
//# sourceMappingURL=gaTrackErrors.js.map
