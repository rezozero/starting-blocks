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
 * @file History.js
 * @author Adrien Scholaert
 */

/**
 * HistoryManager helps to keep track of the navigation
 *
 * @type {Object}
 */
export default class History {
    constructor () {
        /**
         * Keep track of the status in historic order
         *
         * @readOnly
         * @type {Array}
         */
        this.history = []
    }

    /**
     * Add a new set of url and namespace
     *
     * @param {String} url
     */
    add (url) {
        this.history.push({ url })
    }

    /**
     * Return information about the current status
     *
     * @return {Object}
     */
    currentStatus () {
        return this.history[this.history.length - 1]
    }

    /**
     * Return information about the previous status
     *
     * @return {Object}
     */
    prevStatus () {
        const history = this.history

        if (history.length < 2) { return null }

        return history[history.length - 2]
    }
}
