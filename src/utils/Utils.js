// import work from 'webworkify-webpack'

/**
 * Utils class
 */
export default class Utils {
    /**
     * @param  {String} str
     * @return {String}
     */
    static stripTrailingSlash (str) {
        if (str.substr(-1) === '/') {
            return str.substr(0, str.length - 1)
        }
        return str
    }

    /**
     * Get port
     *
     * @param p
     * @returns {*}
     */
    static getPort (p) {
        const port = typeof p !== 'undefined' ? p : window.location.port
        const protocol = window.location.protocol

        if (port !== '') { return parseInt(port) }
        if (protocol === 'http:') { return 80 }
        if (protocol === 'https:') { return 443 }
    }

    static cleanLink (url) {
        return url.replace(/#.*/, '')
    }

    /**
     * Get current url
     *
     * @returns {string}
     */
    static getCurrentUrl () {
        return window.location.protocol + '//' +
            window.location.host +
            window.location.pathname +
            window.location.search
    }

    /**
     * Request timeout (in ms)
     *
     * @returns {number}
     */
    static requestTimeout () {
        return 10000
    }

    /**
     * Start a fetch request
     *
     * @param {String} url
     * @param {Worker|null} worker
     * @return {Promise}
     */
    static request (url, worker) {
        const dfd = Utils.deferred()
        const timeout = window.setTimeout(() => {
            window.clearTimeout(timeout)
            dfd.reject('timeout!')
        }, Utils.requestTimeout())

        if (window.Worker && worker) {
            /**
             * @type {Window.Worker}
             */
            // const worker = work(require.resolve('../workers/Request.worker.js'))

            // Listen worker event message
            // worker.addEventListener('message', function (e) {
            //     const data = JSON.parse(e.data)
            //
            //     if (data.err) {
            //         window.clearTimeout(timeout)
            //         worker.terminate()
            //         dfd.reject(data.err)
            //     } else {
            //         worker.terminate()
            //         return dfd.resolve(data.res)
            //     }
            // })

            // Send url to the worker
            // worker.postMessage({ url })
        } else {
            const headers = new window.Headers()
            headers.append('X-Starting-Blocks', 'yes')
            headers.append('X-Allow-Partial', 'yes')
            headers.append('X-Requested-With', 'XMLHttpRequest')

            window.fetch(url, {
                method: 'GET',
                headers: headers,
                cache: 'default',
                credentials: 'same-origin'
            }).then(res => {
                window.clearTimeout(timeout)

                if (res.status >= 200 && res.status < 300) {
                    return dfd.resolve(res.text())
                }

                const err = new Error(res.statusText || res.status)
                return dfd.reject(err)
            }).catch(err => {
                window.clearTimeout(timeout)
                dfd.reject(err)
            })
        }

        return dfd.promise
    }

    /**
     * Log credits to console for code lovers.
     *
     * @param  {String} siteName
     * @param  {String} bgColor
     * @param  {Array}  creditsList
     * @param  {Array}  thanksList
     * @param  {String} textColor (optional)
     */
    static logCredits (siteName, bgColor, creditsList, thanksList, textColor) {
        let color = '#fff'
        if (typeof textColor !== 'undefined') color = textColor

        console.log('%c   ', 'font-size:3px;')
        console.log('%c' + siteName, 'background:' + bgColor + '; color: ' + color + '; font-size:14px; padding:5px 10px;')
        console.log('%c   ', 'font-size:3px;')

        if (creditsList !== null) {
            let creditsLength = creditsList.length
            if (creditsLength) {
                for (let indexCredit = 0; indexCredit < creditsLength; indexCredit++) {
                    console.log(creditsList[indexCredit].name + ' - ' + creditsList[indexCredit].website)
                }
            }
        }

        if (thanksList !== null) {
            let thanksLength = thanksList.length
            if (thanksLength) {
                console.log('-')
                console.log('Thanks to')
                for (let indexThanks = 0; indexThanks < thanksLength; indexThanks++) {
                    console.log(thanksList[indexThanks].name + ' (' + thanksList[indexThanks].website + ')')
                }
            }
        }

        console.log('-')
        console.log(' ')
    }

    /**
     * Get random number.
     *
     * @param  {Number} min [min value]
     * @param  {Number} max [max value]
     * @param  {Number} decimal
     * @return {Number}
     */
    static getRandomNumber (min, max, decimal) {
        const result = Math.random() * (max - min) + min

        if (typeof decimal !== 'undefined') {
            return Number(result.toFixed(decimal))
        } else return result
    }

    /**
     * Get random integer.
     *
     * @param  {Number} min [min value]
     * @param  {Number} max [max value]
     * @return {Number}
     */
    static getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    /**
     * Send a GA page view event when context is AJAX.
     */
    static trackGoogleAnalytics () {
        if (typeof window.ga !== 'undefined') {
            console.debug('🚩 Push Analytics for: ' + window.location.pathname)
            window.ga('send', 'pageview', {
                'page': window.location.pathname,
                'title': document.title
            })
        }
    }

    /**
     * Match CSS media queries and JavaScript window width.
     *
     * @see http://stackoverflow.com/a/11310353
     * @return {Object}
     */
    static getViewportSize () {
        let e = window
        let a = 'inner'
        if (!('innerWidth' in window)) {
            a = 'client'
            e = document.documentElement || document.body
        }
        return { width: e[ a + 'Width' ], height: e[ a + 'Height' ] }
    }

    /**
     * Get a css property with the vendor prefix.
     *
     * @param  {String} property the css property
     * @return {String}          the prefixed property
     */
    static prefixProperty (property) {
        const prefixes = ['', 'ms', 'Webkit', 'Moz', 'O']
        const numPrefixes = prefixes.length
        const tmp = document.createElement('div')

        for (let i = 0; i < numPrefixes; i++) {
            let prefix = prefixes[i]
            property = prefix === '' ? property : property.charAt(0).toUpperCase() + property.substring(1).toLowerCase()
            const prop = prefix + property

            if (typeof tmp.style[prop] !== 'undefined') {
                return prop
            }
        }
    }

    /**
     * Gets normalized ratio of value inside range.
     *
     * from https://github.com/mout/mout/blob/master/src/math/norm.js
     *
     * @param  {Number} val
     * @param  {Number} min
     * @param  {Number} max
     * @return {Number}
     */
    static getNormRatio (val, min, max) {
        if (val < min) return 0
        if (val > max) return 1

        return val === max ? 1 : (val - min) / (max - min)
    }

    /**
     * Return a new "Deferred" object
     * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
     *
     * @return {Deferred}
     */
    static deferred () {
        return new function () {
            this.resolve = null
            this.reject = null

            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve
                this.reject = reject
            })
        }()
    }
}
