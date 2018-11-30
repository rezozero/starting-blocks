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
 * @file AbstractBlock.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

import AbstractService from './AbstractService'
import { debug } from '../utils/Logger'

/**
 * Base class for creating block implementations.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 *
 * @abstract
 */
export default class AbstractBlock extends AbstractService {
    /**
     * Abstract block constructor.
     *
     * It‘s better to extend this class by using `init` method instead
     * of extending `constructor`.
     *
     * @param {Object} container
     * @param {String} blockName
     * @constructor
     */
    constructor (container, blockName = 'AbstractBlock') {
        super(container, blockName)

        /**
         * Node Type block name type
         *
         * @type {String|null}
         */
        this.type = null

        /**
         * Current page instance
         *
         * @type {AbstractPage|null}
         */
        this.page = null

        /**
         * Container
         * Root container HTMLElement for current block.
         *
         * @type {HTMLElement|null}
         */
        this.rootElement = null

        /**
         * Block id
         *
         * @type {String|null}
         */
        this.id = null

        /**
         * Node name
         *
         * @type {String}
         */
        this.name = null
    }

    /**
     * Basic members initialization for children classes.
     * Do not search for page blocks here, use `onPageReady` method instead
     *
     * @abstract
     */
    init () {
        debug('\t✳️ #' + this.id + ' %c[' + this.type + ']', 'color:grey')
    }

    /**
     * Bind load and resize events for this specific block.
     *
     * Do not forget to call `super.initEvents();` while extending this method.
     *
     * @abstract
     */
    initEvents () {}

    /**
     * Destroy current block.
     *
     * Do not forget to call `super.destroy();` while extending this method.
     */
    destroy () {
        debug('\t🗑️ #' + this.id + ' %c[' + this.type + ']', 'color:grey')
        this.destroyEvents()
    }

    /**
     * Unbind event block events.
     *
     * Make sure you’ve used binded methods to be able to
     * `off` them correctly.
     *
     * Do not forget to call `super.destroyEvents();` while extending this method.
     *
     * @abstract
     */
    destroyEvents () {}

    /**
     * Called on window resize
     *
     * @abstract
     */
    onResize () {}

    /**
     * Called once all page blocks have been created.
     *
     * @abstract
     */
    onPageReady () {}
}
