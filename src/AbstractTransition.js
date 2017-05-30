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
import Utils from './utils/utils'

/**
 * Base class for creating transition.
 */
export default class AbstractTransition {
    /**
     * Constructor.
     * Do not override this method.
     */
    constructor () {
        /**
         * @type {Object} Dom element
         */
        this.oldContainer = undefined
        /**
         * @type {Promise}
         */
        this.newContainer = undefined
        /**
         * @type {Promise}
         */
        this.newContainerLoading = undefined
    }

    /**
     * Initialize transition.
     * Do not override this method.
     *
     * @param oldContainer
     * @param newContainer
     * @returns {Promise}
     */
    init (oldContainer, newContainer) {
        this.oldContainer = oldContainer
        this._newContainerPromise = newContainer

        this.deferred = Utils.deferred()
        this.newContainerReady = Utils.deferred()
        this.newContainerLoading = this.newContainerReady.promise

        this.start()

        this._newContainerPromise.then(newContainer => {
            this.newContainer = newContainer
            this.newContainerReady.resolve()
        })

        return this.deferred.promise
    }

    /**
     * Call this function when the Transition is finished.
     */
    done () {
        this.newContainer.css('visibility', 'visible')
        this.deferred.resolve()
    }

    /**
     * Entry point to create a custom Transition.
     */
    start () {}
};
