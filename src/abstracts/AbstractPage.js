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

// import Lazyload from 'vanilla-lazyload/dist/lazyload.min'
import debounce from '../utils/debounce'
import Dispatcher from '../dispatcher/Dispatcher'
import AbstractBlock from './AbstractBlock'
import {
    AFTER_PAGE_SHOW,
    BEFORE_PAGE_HIDE,
    AFTER_PAGE_HIDE
} from '../types/EventTypes'

/**
 * Base class for creating page implementations.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 *
 * @abstract
 */
export default class AbstractPage {
    /**
     * Base constructor for Pages.
     *
     * Do not override this method, override `init` method instead.
     *
     * @param  {Kernel}  kernel
     * @param  {HTMLElement}  container
     * @param  {String}  context
     * @param  {String}  type
     *
     * @constructor
     */
    constructor (kernel, container, context, type) {
        type = type || 'page'

        if (!container) {
            throw new Error('AbstractPage need a container (HTMLElement) to be defined.')
        }

        if (!kernel) {
            throw new Error('AbstractPage need a Kernel instance to be defined.')
        }

        /**
         * Kernel
         *
         * @type {Kernel}
         */
        this.kernel = kernel

        /**
         * Container element
         *
         * @type {HTMLElement}
         */
        this.container = container

        if (!this.container) {
            throw new Error(`AbstractPage: container not found!`)
        }

        /**
         * Page id
         *
         * @type {String}
         */
        this.id = this.container.id

        if (!this.id) {
            throw new Error(`AbstractPage: container have no id!`)
        }

        /**
         * Page context (static or ajax)
         *
         * @type {String}
         */
        this.context = context

        /**
         * Page type
         *
         * @type {String}
         */
        this.type = type

        /**
         * Is home ?
         *
         * @type {boolean}
         */
        this.isHome = this.container.getAttribute('data-is-home') === '1'

        /**
         * Lazyload instance
         *
         * @type {Lazyload|null}
         */
        this.lazyload = null

        /**
         * AbstractBlock collection.
         *
         * @type {Array<AbstractBlock>}
         */
        this.blocks = []

        /**
         * Node name
         *
         * @type {String}
         */
        this.name = this.container.hasAttribute('data-node-name') ? this.container.getAttribute('data-node-name') : ''
        this.metaTitle = this.container.hasAttribute('data-meta-title') ? this.container.getAttribute('data-meta-title') : ''

        // Binded methods
        this.onResize = this.onResize.bind(this)
        this.onResizeDebounce = debounce(this.onResize, 50, false)
        this.bindedUpdateBlocks = debounce(this.updateBlocks.bind(this), 50, false)
        this.onLazyImageSet = this.onLazyImageSet.bind(this)
        this.onLazyImageLoad = this.onLazyImageLoad.bind(this)
        this.onLazyImageProcessed = this.onLazyImageProcessed.bind(this)

        // Debug
        console.debug('✳️ #' + this.id + ' %c[' + type + '] [' + this.context + ']', 'color:grey')
    }

    /**
     * Initialize page.
     *
     * You should always extends this method in your child implementations instead
     * of extending page constructor.
     */
    async init () {
        /**
         * HTMLElement blocks collection.
         *
         * @type {Array}
         */
        this.blockElements = [...this.container.querySelectorAll(`.${this.kernel.options.pageBlockClass}`)]

        /**
         * @type {Number}
         */
        this.blockLength = this.blockElements.length

        if (this.blockLength) {
            await this.initBlocks()
        }

        // Context
        if (this.kernel.options.ajaxEnabled && this.context === 'ajax') {
            this.initAjax()
        }

        // Lazyload
        if (this.kernel.options.lazyloadEnabled) {
            this.initLazyload()
        }

        this.initEvents()
    }

    /**
     * Destroy current page and all its blocks.
     */
    destroy () {
        console.debug('🗑 #' + this.id)
        this.container.parentNode.removeChild(this.container)
        this.destroyEvents()

        // Do not remove name class on body if destroyed page is the same as current one.
        if (this.kernel.page !== null && this.kernel.page.name !== this.name) {
            document.body.classList.remove(this.name)
        }

        // Do not remove type class on body if destroyed page is the same as current one.
        if (this.kernel.page !== null && this.kernel.page.type !== this.type) {
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

        // Remove Lazyload instance and listeners
        if (this.lazyload !== null) {
            this.lazyload.destroy()
            this.lazyload = null
        }
    }

    /**
     * Initialize basic events.
     */
    initEvents () {
        window.addEventListener('resize', this.onResizeDebounce)

        this.domObserver = new window.MutationObserver(this.bindedUpdateBlocks)
        this.domObserver.observe(this.container, {
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
     * Init lazyload
     *
     * @private
     */
    initLazyload () {
        this.beforeLazyload()
        // this.lazyload = new Lazyload({
        //     threshold: this.kernel.options.lazyloadThreshold,
        //     throttle: this.kernel.options.lazyloadThrottle,
        //     elements_selector: '.' + this.kernel.options.lazyloadClass,
        //     data_src: this.kernel.options.lazyloadSrcAttr.replace('data-', ''),
        //     data_srcset: this.kernel.options.lazyloadSrcSetAttr.replace('data-', ''),
        //     callback_set: this.onLazyImageSet,
        //     callback_load: this.onLazyImageLoad,
        //     callback_processed: this.onLazyImageProcessed
        // })
    }

    updateLazyload () {
        if (this.lazyload) {
            this.lazyload.update()
        }
    }

    /**
     * @param {Function} onShow
     */
    show (onShow) {
        console.debug('▶️ #' + this.id)
        this.container.style.opacity = '1'
        if (typeof onShow !== 'undefined') onShow()
        this.container.classList.remove(this.kernel.options.pageClass + '-transitioning')
        Dispatcher.commit(AFTER_PAGE_SHOW, this)
    }

    /**
     * @param {Function} onHidden
     */
    hide (onHidden) {
        Dispatcher.commit(BEFORE_PAGE_HIDE, this)
        console.debug('◀️ #' + this.id)
        this.container.style.opacity = '0'
        if (typeof onHidden !== 'undefined') onHidden()
        Dispatcher.commit(AFTER_PAGE_HIDE, this)
    }

    initAjax () {
        this.container.classList.add(this.kernel.options.pageClass + '-transitioning')
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
            this.blocks.push(block)
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
        console.debug('\t📯 Page DOM changed…')

        // Update lazy load if init.
        this.updateLazyload()

        // Create new blocks
        this.blockElements = this.container.querySelectorAll(`.${this.kernel.options.pageBlockClass}`)
        this.blockLength = this.blockElements.length

        for (let blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {
            let blockElement = this.blockElements[blockIndex]

            if (!this.getBlockById(blockElement.id)) {
                try {
                    let block = await this.initSingleBlock(this.blockElements[blockIndex])
                    this.blocks.push(block)
                    block.onPageReady()
                } catch (e) {
                    console.info(e.message)
                }
            }
        }
    }

    /**
     * @param {HTMLElement} blockElement
     * @return {AbstractBlock}
     */
    async initSingleBlock (blockElement) {
        let type = blockElement.getAttribute(this.kernel.options.objectTypeAttr)
        let blockInstance = await this.kernel.classFactory.getBlockInstance(this, blockElement, type)

        if (!blockInstance) {
            return new AbstractBlock(this, blockElement, type)
        }

        return blockInstance
    }

    /**
     * Get a page block instance from its `id`.
     *
     * @param  {String} id
     * @return {AbstractBlock|null}
     */
    getBlockById (id) {
        const index = this.getBlockIndexById(id)
        if (this.blocks[index]) {
            return this.blocks[index]
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
        for (let i in this.blocks) {
            if (this.blocks.hasOwnProperty(i)) {
                if (this.blocks[i] &&
                    this.blocks[i].id &&
                    this.blocks[i].id === id) {
                    return i
                }
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
        for (let i in this.blocks) {
            if (this.blocks.hasOwnProperty(i)) {
                if (this.blocks[i] &&
                    this.blocks[i].type &&
                    this.blocks[i].type === type) {
                    return i
                }
            }
        }

        return null
    }

    /**
     * @abstract
     */
    onResize () {

    }

    /**
     * Called before init lazyload images.
     */
    beforeLazyload () {}

    /**
     * After image src switched.
     *
     * @abstract
     * @param {HTMLImageElement} element
     */
    onLazyImageSet (element) {
        console.debug('\t🖼 «' + element.id + '» set')
    }

    /**
     * After lazyload image loaded.
     *
     * @abstract
     * @param {HTMLImageElement} element
     */
    onLazyImageLoad (element) {
        console.debug('\t🖼 «' + element.id + '» load')
    }

    /**
     * Before lazyload.
     *
     * @abstract
     */
    onLazyImageProcessed (index) {
        console.debug('\t🖼 Lazy load processed')
    }
}
