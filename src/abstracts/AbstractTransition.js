/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file AbstractTransition.js
 * @author Quentin Neyraud
 * @author Adrien Scholaert
 */
import Utils from '../utils/Utils'

/**
 * Base class for creating transition.
 *
 * @abstract
 */
export default class AbstractTransition {
    /**
     * Constructor.
     * Do not override this method.
     *
     * @constructor
     */
    constructor () {
        /**
         * @type {AbstractPage|null} old Page instance
         */
        this.oldPage = null

        /**
         * @type {AbstractPage|null}
         */
        this.newPage = null

        /**
         * @type {Promise|null}
         */
        this.newPageLoading = null
    }

    /**
     * Initialize transition.
     * Do not override this method.
     *
     * @param {AbstractPage} oldPage
     * @param {Promise} newPagePromise
     * @returns {Promise}
     */
    init (oldPage, newPagePromise) {
        this.oldPage = oldPage
        this._newPagePromise = newPagePromise

        this.deferred = Utils.deferred()
        this.newPageReady = Utils.deferred()
        this.newPageLoading = this.newPageReady.promise

        this.start()

        this._newPagePromise.then(newPage => {
            this.newPage = newPage
            this.newPageReady.resolve()
        })

        return this.deferred.promise
    }

    /**
     * Call this function when the Transition is finished.
     */
    done () {
        this.oldPage.destroy()
        this.newPage.rootElement.style.visibility = 'visible'
        this.deferred.resolve()
    }

    /**
     * Entry point to create a custom Transition.
     * @abstract
     */
    start () {}
}
