/**
 * Method to track JS errors if your Google Analytics account.
 */
export default function gaTrackErrors () {
    if (typeof ga !== 'undefined') {
        // Pure JavaScript errors handler
        window.addEventListener('error', function (err) {
            const lineAndColumnInfo = err.colno ? ' line:' + err.lineno + ', column:' + err.colno : ' line:' + err.lineno
            window.ga(
                'send',
                'event',
                'JavaScript Error',
                err.message,
                err.filename + lineAndColumnInfo + ' -> ' + navigator.userAgent,
                0,
                true
            )
        })
    }
}
