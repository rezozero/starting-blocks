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
 */
import log from 'loglevel'
import $ from 'jquery'
import Lazyload from 'vanilla-lazyload'
import debounce from './utils/debounce'
import Events from './Events'
import 'jquery.waitforimages'
import {
    BEFORE_PAGE_SHOW,
    AFTER_PAGE_SHOW,
    BEFORE_PAGE_HIDE,
    AFTER_PAGE_HIDE
} from './EventTypes'

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
     * @param  {jQuery}  $cont
     * @param  {String}  context
     * @param  {String}  type
     * @param  {Boolean} isHome
     *
     * @constructor
     */
    constructor (router, $cont, context, type, isHome) {
        type = type || 'page'

        if (!$cont) {
            throw new Error('AbstractPage need a $cont (JQuery) to be defined.')
        }
        if (!router) {
            throw new Error('AbstractPage need a Router instance to be defined.')
        }
        /**
         * @type {Router}
         */
        this.router = router
        /**
         * @type {jQuery}
         */
        this.$cont = $cont
        /**
         * @type {String}
         */
        this.id = $cont[0].id
        /**
         * @type {String}
         */
        this.context = context
        /**
         * @type {String}
         */
        this.type = type
        /**
         * @type {Boolean}
         */
        this.isHome = isHome
        /**
         * @type {Lazyload|null}
         */
        this.lazyload = null

        if (this.$cont[0].getAttribute('data-is-home') === '1') {
            this.isHome = true
        }

        /**
         * AbstractBlock collection.
         *
         * @type {AbstractBlock[]}
         */
        this.blocks = []

        /**
         * @type {String}
         */
        this.name = (this.$cont.length) ? this.$cont[0].getAttribute('data-node-name') : ''

        this.onResizeDebounce = debounce(this.onResize.bind(this), 50, false)

        log.debug('✳️ #' + this.id + ' %c[' + type + '] [' + this.context + ']', 'color:grey')

        this.init()
        this.initEvents()
    }

    /**
     * Initialize page.
     *
     * You should always extends this method in your child implementations instead
     * of extending page constructor.
     */
    init () {
        /**
         * All links which will be binded for Ajax requests.
         *
         * @type {jQuery}
         */
        this.$link = this.$cont.find('a').not('[target="_blank"]').not('[href="#"]')
        this.bindedLinkClick = this.router.onLinkClick.bind(this.router)
        this.bindedUpdateBlocks = this.updateBlocks.bind(this)

        // Add target blank on external link
        if (this.$link.length) {
            this.externalLinkTarget(this.$link, this.router.baseUrl)
            this.$link = this.$cont.find('a').not('[target="_blank"]').not('[href="#"]')
        }
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
            this.initBlocks()
        }

        // --- Context --- //
        if (this.router.options.ajaxEnabled) {
            if (this.context === 'ajax') {
                this.initAjax()
            }
        }
        // --- Lazyload --- //
        if (this.router.options.lazyloadEnabled) {
            this.beforeLazyload()
            this.lazyload = new Lazyload({
                threshold: this.router.options.lazyloadThreshold,
                throttle: this.router.options.lazyloadThrottle,
                elements_selector: '.' + this.router.options.lazyloadClass,
                data_src: this.router.options.lazyloadSrcAttr.replace('data-', ''),
                data_srcset: this.router.options.lazyloadSrcSetAttr.replace('data-', ''),
                callback_set: this.onLazyImageSet.bind(this),
                callback_load: this.onLazyImageLoad.bind(this),
                callback_processed: this.onLazyImageProcessed.bind(this)
            })
        }
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
     * Such as waitForImages and link click if you enabled Ajax navigation.
     */
    initEvents () {
        if (this.$cont.find('img').length) {
            this.$cont.waitForImages({
                finished: this.onLoad.bind(this),
                waitForAll: true
            })
        } else {
            this.onLoad()
        }

        if (this.$link.length && this.router.options.ajaxEnabled) {
            this.$link.on('click', this.bindedLinkClick)
        }

        this.router.$window.on('resize', this.onResizeDebounce)
        this.domObserver = new window.MutationObserver(this.bindedUpdateBlocks)
        this.domObserver.observe(this.$cont.get(0), {
            childList: true,
            attributes: false,
            characterData: false,
            subtree: true
        })
    }

    /**
     *
     */
    destroyEvents () {
        this.$link.off('click', this.bindedLinkClick)
        this.router.$window.off('resize', this.onResizeDebounce)
        this.domObserver.disconnect()
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
        this.router.nav.update(this)

        Events.commit(BEFORE_PAGE_SHOW, this)
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
    }

    /**
     * @deprecated Use onShowEnded
     */
    showEnded () {
        this.onShowEnded()
    }
    /**
     * After show animation has played.
     */
    onShowEnded () {
        this.router.transition = false
        this.$cont.removeClass(this.router.options.pageClass + '-ajax')
        this.$cont.removeClass(this.router.options.pageClass + '-transitioning')

        Events.commit(AFTER_PAGE_SHOW, this)
    }

    /**
     * @param {Function} onHidden
     */
    hide (onHidden) {
        Events.commit(BEFORE_PAGE_HIDE, this)
        log.debug('◀️ #' + this.id)
        this.$cont[0].style.opacity = '0'
        if (typeof onHidden !== 'undefined') onHidden()

        Events.commit(AFTER_PAGE_HIDE, this)
    }

    initAjax () {
        this.$cont.addClass(this.router.options.pageClass + '-transitioning')
    }

    /**
     * Initialize page blocks on page.
     */
    initBlocks () {
        for (let blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {
            let block = this.initSingleBlock(this.$blocks.eq(blockIndex))
            /*
             * Prevent undefined blocks to be appended to block collection.
             */
            if (block) {
                this.blocks.push(block)
            }
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
    updateBlocks () {
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

        this.$blocks.each((blockIndex, el) => {
            let block = this.getBlockById($(el).attr('id'))
            if (block === null) {
                let block = this.initSingleBlock(this.$blocks.eq(blockIndex))
                /*
                 * Prevent undefined blocks to be appended to block collection.
                 */
                if (block) {
                    this.blocks.push(block)
                    block.onPageReady()
                }
            }
        })
    }

    /**
     * @param {jQuery} $singleBlock
     * @return {AbstractBlock}
     */
    initSingleBlock ($singleBlock) {
        let type = $singleBlock[0].getAttribute(this.router.options.objectTypeAttr)

        return this.router.classFactory.getBlockInstance(type, this, $singleBlock)
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
            if (this.blocks[i] &&
                this.blocks[i].id &&
                this.blocks[i].id === id) {
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
        for (let i in this.blocks) {
            if (this.blocks[i] &&
                this.blocks[i].type &&
                this.blocks[i].type === type) {
                return i
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
     *
     * @abstract
     */
    beforeLazyload () {

    }

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

    /**
     * Add target blank to external links.
     *
     * @param {jQuery} $links
     * @param {String} baseUrl
     */
    externalLinkTarget ($links, baseUrl) {
        const linksLength = $links.length
        let abstractBaseUrl = baseUrl.split('://')

        abstractBaseUrl = abstractBaseUrl[1]

        for (let linkIndex = 0; linkIndex < linksLength; linkIndex++) {
            const link = $links[linkIndex]
            /*
             * Use RAW href data not to automatically
             * get protocol and domain in string
             */
            const linkString = link.getAttribute('href')
            if (linkString.indexOf(abstractBaseUrl) === -1 &&
               linkString.indexOf('javascript') === -1 &&
               linkString.indexOf('mailto:') === -1 &&
               linkString.charAt(0) !== '/' &&
               linkString.charAt(0) !== '#') {
                $links[linkIndex].target = '_blank'
            }
        }
    }
}
