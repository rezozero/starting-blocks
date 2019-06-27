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
 * @file AbstractPage.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

import debounce from '../utils/debounce'
import AbstractService from './AbstractService'
import { debug, warn } from '../utils/Logger'

/**
 * Base class for creating page implementations.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 *
 * @abstract
 */
export default class AbstractPage extends AbstractService {
    /**
     * Base constructor for Pages.
     * @constructor
     */
    constructor (container) {
        super(container, 'AbstractPage')

        /**
         * Container element
         *
         * @type {HTMLElement}
         */
        this.rootElement = null

        /**
         * Page id
         *
         * @type {String|null}
         */
        this.id = null

        /**
         * Page context (static or ajax)
         *
         * @type {String|null}
         */
        this.context = null

        /**
         * Page type
         *
         * @type {String|null}
         */
        this.type = null

        /**
         * Is home ?
         *
         * @type {boolean}
         */
        this.isHome = null

        /**
         * AbstractBlock collection.
         *
         * @type {Array<AbstractBlock>}
         */
        this.blocks = []

        /**
         * Node name
         *
         * @type {String|null}
         */
        this.name = null

        /**
         * Meta title
         * @type {String|null}
         */
        this.metaTitle = null

        // Bind methods
        this.onResize = this.onResize.bind(this)
        this.onResizeDebounce = debounce(this.onResize, 50, false)
        this.bindedUpdateBlocks = debounce(this.updateBlocks.bind(this), 50, false)
    }

    /**
     * Initialize page.
     *
     * You should always extends this method in your child implementations instead
     * of extending page constructor.
     */
    async init () {
        // Debug
        debug('✳️ #' + this.id + ' %c[' + this.type + '] [' + this.context + ']', 'color:grey')

        /**
         * HTMLElement blocks collection.
         *
         * @type {Array}
         */
        this.blockElements = [...this.rootElement.querySelectorAll(`.${this.getService('Config').pageBlockClass}`)]

        /**
         * @type {Number}
         */
        this.blockLength = this.blockElements.length

        if (this.blockLength) {
            await this.initBlocks()
        }

        this.initEvents()
    }

    /**
     * Destroy current page and all its blocks.
     */
    destroy () {
        debug('🗑️ #' + this.id + ' %c[' + this.type + ']', 'color:grey')
        this.rootElement.parentNode.removeChild(this.rootElement)
        this.destroyEvents()

        // Do not remove name class on body if destroyed page is the same as current one.
        if (this.getService('PageBuilder').page !== null && this.getService('PageBuilder').page.name !== this.name) {
            document.body.classList.remove(this.name)
        }

        // Do not remove type class on body if destroyed page is the same as current one.
        if (this.getService('PageBuilder').page !== null && this.getService('PageBuilder').page.type !== this.type) {
            document.body.classList.remove(this.type)
        }

        // Blocks
        if (this.blocks !== null) {
            for (let blockIndex in this.blocks) {
                if (this.blocks.hasOwnProperty(blockIndex)) {
                    this.blocks[blockIndex].destroy()
                }
            }
        }
    }

    /**
     * Initialize basic events.
     */
    initEvents () {
        window.addEventListener('resize', this.onResizeDebounce)

        this.domObserver = new window.MutationObserver(this.bindedUpdateBlocks)
        this.domObserver.observe(this.rootElement, {
            childList: true,
            attributes: false,
            characterData: false,
            subtree: true
        })
    }

    /**
     * Destroy events
     */
    destroyEvents () {
        window.removeEventListener('resize', this.onResizeDebounce)
        this.domObserver.disconnect()
    }

    /**
     * Initialize page blocks on page.
     */
    async initBlocks () {
        for (let blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {
            /**
             * New Block.
             *
             * @type {AbstractBlock}
             */
            let block = await this.initSingleBlock(this.blockElements[blockIndex])

            // Prevent undefined blocks to be appended to block collection.
            if (block) {
                this.blocks.push(block)
            }
        }

        // Notify all blocks that page init is over.
        for (let i = this.blocks.length - 1; i >= 0; i--) {
            if (typeof this.blocks[i].onPageReady === 'function') this.blocks[i].onPageReady()
        }
    }

    /**
     * Append new blocks which were not present at init.
     */
    async updateBlocks () {
        debug('\t📯 Page DOM changed…')

        // Create new blocks
        this.blockElements = this.rootElement.querySelectorAll(`.${this.getService('Config').pageBlockClass}`)
        this.blockLength = this.blockElements.length

        for (let blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {
            let blockElement = this.blockElements[blockIndex]
            const existingBlock = this.getBlockById(blockElement.id)

            if (!blockElement.id) break

            if (existingBlock === null) {
                try {
                    let block = await this.initSingleBlock(this.blockElements[blockIndex])

                    if (block) {
                        this.blocks.push(block)
                        block.onPageReady()
                    }
                } catch (e) {
                    warn(e.message)
                }
            }
        }
    }

    /**
     * @param {HTMLElement} blockElement
     * @return {AbstractBlock}
     */
    async initSingleBlock (blockElement) {
        if (!blockElement.id) return null

        let blockType = blockElement.getAttribute(this.getService('Config').objectTypeAttr)
        let blockInstance = await this.getService('BlockBuilder').getBlockInstance(blockType)

        if (!blockInstance) {
            return null
        }

        // Set values
        blockInstance.type = blockType
        blockInstance.page = this
        blockInstance.rootElement = blockElement
        blockInstance.id = blockElement.id
        blockInstance.name = blockElement.hasAttribute('data-node-name') ? blockElement.getAttribute('data-node-name') : ''

        // Init everything
        blockInstance.init()
        blockInstance.initEvents()

        return blockInstance
    }

    /**
     * Get a page block instance from its `id`.
     *
     * @param  {String} id
     * @return {AbstractBlock|null}
     */
    getBlockById (id) {
        for (const block of this.blocks) {
            if (block.id && block.id === id) {
                return block
            }
        }

        return null
    }

    /**
     * Get a page block index from its `id`.
     *
     * @param  {String} id
     * @return {*|null}
     */
    getBlockIndexById (id) {
        const l = this.blocks.length

        for (let i = 0; i < l; i++) {
            if (this.blocks[i].id && this.blocks[i].id === id) {
                return i
            }
        }

        return null
    }

    /**
     * Get the first page block instance from its `type`.
     *
     * @param  {String} type
     * @return {AbstractBlock|null}
     */
    getFirstBlockByType (type) {
        const index = this.getFirstBlockIndexByType(type)
        if (this.blocks[index]) {
            return this.blocks[index]
        }

        return null
    }

    /**
     * Get the first page block index from its `type`.
     *
     * @param  {String} type
     * @return {*|null}
     */
    getFirstBlockIndexByType (type) {
        const l = this.blocks.length

        for (let i = 0; i < l; i++) {
            if (this.blocks[i].type && this.blocks[i].type === type) {
                return i
            }
        }

        return null
    }

    /**
     * @abstract
     */
    onResize () {
        for (const block of this.blocks) {
            block.onResize()
        }
    }
}
