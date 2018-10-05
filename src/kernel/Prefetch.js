/**
 * Copyright © 2017, Ambroise Maupate
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
 * @file Prefetch.js
 * @author Adrien Scholaert
 */

import Utils from '../utils/Utils'

/**
 * Prefetch.
 *
 * @type {Object}
 */
export default class Prefetch {
    constructor ({
        noPrefetchClass = 'no-prefetch'
    } = {}) {
        /**
         * Class name used to ignore prefetch on links.
         *
         * @type {string}
         * @default
         */
        this.noPrefetchClass = noPrefetchClass

        /**
         * @type {(Worker|null)}
         */
        this._worker = null

        /**
         * @type {(Pjax|null)}
         */
        this._pjax = null

        /**
         * @type {(CacheProvider|null)}
         */
        this._cacheProvider = null
    }

    set worker (value) {
        this._worker = value
    }

    set pjax (value) {
        this._pjax = value
    }

    set cacheProvider (value) {
        this._cacheProvider = value
    }

    init () {
        if (!window.history.pushState) {
            return false
        }

        document.body.addEventListener('mouseover', this.onLinkEnter.bind(this))
        document.body.addEventListener('touchstart', this.onLinkEnter.bind(this))
    }

    onLinkEnter (evt) {
        let el = evt.target

        while (el && !this._pjax.getHref(el)) {
            el = el.parentNode
        }

        if (!el || el.classList.contains(this.noPrefetchClass)) {
            return
        }

        let url = this._pjax.getHref(el)

        // Check if the link is eligible for Pjax
        if (this._pjax.preventCheck(evt, el) && (this._cacheProvider && !this._cacheProvider.get(url))) {
            let xhr = Utils.request(url, this._worker)

            if (this._cacheProvider) {
                this._cacheProvider.set(url, xhr)
            }
        }
    }
}
