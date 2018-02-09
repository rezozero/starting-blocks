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
 * @file CacheProvider.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

/**
 * Cache provider class.
 *
 * This class stores Ajax response in memory.
 */
export default class CacheProvider {
    constructor () {
        this.data = {}
    }

    /**
     * @param  {String} key
     * @return {Boolean}
     */
    exists (key) {
        return key in this.data
    }

    /**
     * @param  {String} href
     * @return {Object}
     */
    get (href) {
        return this.data[href]
    }

    /**
     * @param  {String} key
     * @param  {Object} data
     * @return {CacheProvider}  this
     */
    set (key, data) {
        this.data[key] = data
        return this
    }

    /**
     * Flush the cache
     */
    reset () {
        this.data = {}
    }
}
