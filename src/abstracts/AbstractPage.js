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

import * as log from 'loglevel'
import $ from 'jquery'
import Lazyload from 'vanilla-lazyload'
import debounce from '../utils/debounce'
import Dispatcher from '../dispatcher/Dispatcher'
import {
    BEFORE_PAGE_SHOW,
    AFTER_PAGE_SHOW,
    BEFORE_PAGE_HIDE,
    AFTER_PAGE_HIDE
} from '../types/EventTypes'
import AbstractBlock from './AbstractBlock'

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
     * @param  {Router}  router
     * @param  {HTMLElement}  container
     * @param  {String}  context
     * @param  {String}  type
     *
     * @constructor
     */
    constructor (router, container, context, type) {
        type = type || 'page'

        if (!container) {
            throw new Error('AbstractPage need a container (HTMLElement) to be defined.')
        }

        if (!router) {
            throw new Error('AbstractPage need a Router instance to be defined.')
        }

        /**
         * Router
         *
         * @type {Router}
         */
        this.router = router

        /**
         * Container element (Jquery)
         *
         * @type {jQuery}
         */
        this.$cont = $(container)

        if (!this.$cont) {
            throw new Error(`AbstractPage: container not found!`)
        }

        /**
         * Page id
         *
         * @type {String}
         */
        this.id = this.$cont.attr('id')

        if (!this.$cont) {
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
         * @type {Boolean}
         */
        this.isHome = false

        if (this.$cont.attr('data-is-home') === '1') {
            this.isHome = true
        }

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
        this.name = (this.$cont.length) ? this.$cont.attr('data-node-name') : ''
        this.metaTitle = (this.$cont.length) ? this.$cont.attr('data-meta-title') : ''

        // Binded methods
        this.onResize = this.onResize.bind(this)
        this.onResizeDebounce = debounce(this.onResize, 50, false)
        this.bindedUpdateBlocks = debounce(this.updateBlocks.bind(this), 50, false)
        this.onLoad = this.onLoad.bind(this)
        this.onLazyImageSet = this.onLazyImageSet.bind(this)
        this.onLazyImageLoad = this.onLazyImageLoad.bind(this)
        this.onLazyImageProcessed = this.onLazyImageProcessed.bind(this)

        // Debug
        log.debug('✳️ #' + this.id + ' %c[' + type + '] [' + this.context + ']', 'color:grey')
    }

    /**
     * Initialize page.
     *
     * You should always extends this method in your child implementations instead
     * of extending page constructor.
     */
    async init () {
        /**
         * jQuery blocks collection.
         *
         * @type {jQuery}
         */
        this.$blocks = this.$cont.find(this.router.options.pageBlockClass)
        /**
         * @type {Number}
         */
        this.blockLength = this.$blocks.length
        if (this.blockLength) {
            await this.initBlocks()
        }

        // Context
        if (this.router.options.ajaxEnabled && this.context === 'ajax') {
            this.initAjax()
        }

        // Lazyload
        if (this.router.options.lazyloadEnabled) {
            this.initLazyload()
        }

        this.initEvents()
    }

    /**
     * Destroy current page and all its blocks.
     */
    destroy () {
        log.debug('🗑 #' + this.id)
        this.$cont.remove()
        this.destroyEvents()

        /*
         * Do not remove name class on body if destroyed page is the same as current one.
         */
        if (this.router.page !== null && this.router.page.name !== this.name) {
            this.router.$body.removeClass(this.name)
        }

        /*
         * Do not remove type class on body if destroyed page is the same as current one.
         */
        if (this.router.page !== null && this.router.page.type !== this.type) {
            this.router.$body.removeClass(this.type)
        }

        // --- Blocks --- //
        if (this.blocks !== null) {
            for (let blockIndex in this.blocks) {
                this.blocks[blockIndex].destroy()
            }
        }
        /*
         * Remove Lazyload instance and listeners
         */
        if (this.lazyload !== null) {
            this.lazyload.destroy()
        }
    }

    /**
     * Initialize basic events.
     *
     * Such as waitForImages.
     */
    initEvents () {
        if (this.$cont.find('img').length) {
            this.$cont.waitForImages({
                finished: this.onLoad,
                waitForAll: true
            })
        } else {
            this.onLoad()
        }

        window.addEventListener('resize', this.onResizeDebounce)

        this.domObserver = new window.MutationObserver(this.bindedUpdateBlocks)
        this.domObserver.observe(this.$cont.get(0), {
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
        this.lazyload = new Lazyload({
            threshold: this.router.options.lazyloadThreshold,
            throttle: this.router.options.lazyloadThrottle,
            elements_selector: '.' + this.router.options.lazyloadClass,
            data_src: this.router.options.lazyloadSrcAttr.replace('data-', ''),
            data_srcset: this.router.options.lazyloadSrcSetAttr.replace('data-', ''),
            callback_set: this.onLazyImageSet,
            callback_load: this.onLazyImageLoad,
            callback_processed: this.onLazyImageProcessed
        })
    }

    checkLazyload () {
        if (this.lazyload) {
            this.lazyload.update()
        }
    }

    /**
     * @private
     */
    onLoad () {
        /**
         * Date when onLoad was triggered.
         * @type {Date}
         */
        this.loadDate = new Date()
        /**
         * Duration between router loaded page and when onLoad was triggered.
         * @type {Date}
         */
        this.loadDuration = this.loadDate - this.router.loadBeginDate

        Dispatcher.commit(BEFORE_PAGE_SHOW, this)
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
        log.debug('▶️ #' + this.id)
        this.$cont[0].style.opacity = '1'
        if (typeof onShow !== 'undefined') onShow()
        this.$cont.removeClass(this.router.options.pageClass + '-transitioning')
        Dispatcher.commit(AFTER_PAGE_SHOW, this)
    }

    /**
     * @param {Function} onHidden
     */
    hide (onHidden) {
        Dispatcher.commit(BEFORE_PAGE_HIDE, this)
        log.debug('◀️ #' + this.id)
        this.$cont[0].style.opacity = '0'
        if (typeof onHidden !== 'undefined') onHidden()
        Dispatcher.commit(AFTER_PAGE_HIDE, this)
    }

    initAjax () {
        this.$cont.addClass(this.router.options.pageClass + '-transitioning')
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
            let block = await this.initSingleBlock(this.$blocks.eq(blockIndex))

            /*
             * Prevent undefined blocks to be appended to block collection.
             */
            this.blocks.push(block)
        }

        /*
         * Notify all blocks that page init is over.
         */
        for (let i = this.blocks.length - 1; i >= 0; i--) {
            if (typeof this.blocks[i].onPageReady === 'function') this.blocks[i].onPageReady()
        }
    }

    /**
     * Append new blocks which were not present at init.
     */
    async updateBlocks () {
        log.debug('\t📯 Page DOM changed…')

        /*
         * Update Lazyload if init.
         */
        if (this.lazyload) {
            this.lazyload.update()
        }

        /*
         * Create new blocks
         */
        this.$blocks = this.$cont.find(this.router.options.pageBlockClass)
        this.blockLength = this.$blocks.length

        for (let blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {
            let $block = this.$blocks[blockIndex]

            if (!this.getBlockById($block.id)) {
                try {
                    let block = await this.initSingleBlock(this.$blocks.eq(blockIndex))
                    this.blocks.push(block)
                    block.onPageReady()
                } catch (e) {
                    log.info(e.message)
                }
            }
        }
    }

    /**
     * @param {jQuery} $singleBlock
     * @return {AbstractBlock}
     */
    async initSingleBlock ($singleBlock) {
        let type = $singleBlock[0].getAttribute(this.router.options.objectTypeAttr)
        let blockInstance = await this.router.classFactory.getBlockInstance(this, $singleBlock, type)

        if (!blockInstance) {
            return new AbstractBlock(this, $singleBlock, type)
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
        log.debug('\t🖼 «' + element.id + '» set')
    }

    /**
     * After lazyload image loaded.
     *
     * @abstract
     * @param {HTMLImageElement} element
     */
    onLazyImageLoad (element) {
        log.debug('\t🖼 «' + element.id + '» load')
    }

    /**
     * Before lazyload.
     *
     * @abstract
     */
    onLazyImageProcessed (index) {
        log.debug('\t🖼 Lazy load processed')
    }
}
