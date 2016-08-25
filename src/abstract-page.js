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
 * @file abstract-page.js
 * @author Ambroise Maupate
 */
import log from "loglevel";
import TweenMax from "TweenMax";
import waitForImages from "waitForImages";
import $ from "jquery";
import Lazyload from 'Lazyload';
import {debounce} from "utils/debounce";

export class AbstractPage {
    /**
     * @param  {Router}  router
     * @param  {jQuery}  $cont
     * @param  {String}  context
     * @param  {String}  type
     * @param  {Boolean} isHome
     */
    constructor(router, $cont, context, type, isHome) {
        type = type || 'page';

        if (!$cont) {
            throw "AbstractPage need a $cont (JQuery) to be defined.";
        }
        if (!router) {
            throw "AbstractPage need a Router instance to be defined.";
        }
        /**
         *
         * @type {Router}
         */
        this.router = router;
        /**
         *
         * @type {jQuery}
         */
        this.$cont = $cont;
        /**
         * @type {String}
         */
        this.id = $cont[0].id;
        /**
         * @type {String}
         */
        this.context = context;
        /**
         * @type {String}
         */
        this.type = type;
        /**
         * @type {Boolean}
         */
        this.isHome = isHome;
        /**
         * @type {Lazyload}
         */
        this.lazyload = null;

        if(this.$cont[0].getAttribute('data-is-home') == '1'){
            this.isHome = true;
        }

        this.name = (this.$cont.length) ? this.$cont[0].getAttribute('data-node-name') : '';

        this.onResizeDebounce = debounce(this.onResize.bind(this), 50, false);

        log.debug('✳️ #' + this.id + '\t' + type);

        this.init();
        this.initEvents();
    }

    /**
     * Initialize page.
     *
     * You should always extends this method in your child implementations instead
     * of extending page constructor.
     */
    init() {
        this.$link = this.$cont.find('a').not('[target="_blank"]');
        this.bindedLinkClick = this.router.onLinkClick.bind(this.router);

        // Add target blank on external link
        if(this.$link.length){
            this.externalLinkTarget(this.$link, this.router.baseUrl);
            this.$link = this.$cont.find('a').not('[target="_blank"]');
        }

        // --- Lazyload --- //
        if (this.router.options.lazyloadEnabled) {
            setTimeout(() => {
                this.beforeLazyload();
                this.lazyload = new Lazyload({
                    elements_selector: '.'+this.router.options.lazyloadClass,
                    data_src: this.router.options.lazyloadSrcAttr.replace('data-', ''),
                    data_srcset: this.router.options.lazyloadSrcSetAttr.replace('data-', ''),
                    callback_set: this.onLazyImageSet.bind(this),
                    callback_load: this.onLazyImageLoad.bind(this),
                    callback_processed: this.onLazyImageProcessed.bind(this)
                });
            }, 0);
        }

        // --- Blocks --- //
        this.blocks = [];
        this.$blocks = this.$cont.find(this.router.options.pageBlockClass);
        this.blockLength = this.$blocks.length;
        if(this.blockLength) {
            this.initBlocks();
        }

        // --- Context --- //
        if(this.context == 'static' && this.router.ajaxEnabled) {
            this.router.pushFirstState(this.isHome);
        } else if(this.context == 'ajax'){
            this.initAjax();
        }
    }

    /**
     * Destroy current page and all its blocks.
     */
    destroy() {
        log.debug('🗑 #' + this.id);
        this.$cont.remove();
        this.destroyEvents();
        // --- Blocks --- //
        if (this.blocks !== null) {
            for (var blockIndex in this.blocks) {
                this.blocks[blockIndex].destroy();
            }
        }
        /*
         * Remove Lazyload instance and listeners
         */
        if (null !== this.lazyload) {
            this.lazyload.destroy();
        }
    }

    /**
     * Initialize basic events.
     *
     * Such as waitForImages and link click if you enabled Ajax navigation.
     */
    initEvents() {
        if (this.$cont.find('img').length) {
            this.$cont.waitForImages({
                finished: this.onLoad.bind(this),
                waitForAll: true
            });
        } else {
            this.onLoad();
        }

        if(this.$link.length && this.router.options.ajaxEnabled) {
            this.$link.on('click', this.bindedLinkClick);
        }

        this.router.$window.on('resize', this.onResizeDebounce);
    }

    /**
     *
     */
    destroyEvents() {
        this.$link.off('click', this.bindedLinkClick);
        this.router.$window.off('resize', this.onResizeDebounce);
    }

    /**
     * @param e
     * @private
     */
    onLoad(e) {
        this.loadDate = new Date();
        this.loadDuration = this.loadDate - this.router.loadBeginDate;
        this.router.nav.update(this);

        const delay = (this.loadDuration > this.router.options.minLoadDuration) ? 0 : this.router.options.minLoadDuration - this.loadDuration;

        // Hide loading
        setTimeout(() => {
            const onShowEnded = this.showEnded.bind(this);

            this.router.loader.hide();

            if(this.context == 'static'){
                this.show(onShowEnded);
            } else if(this.context == 'ajax'){
                // Update body id
                if(this.name !== '') document.body.id = this.name;
                // Hide formerPages - show
                if (this.router.formerPages.length > 0) {
                    const formerPage = this.router.formerPages[(this.router.formerPages.length - 1)];
                    const formerPageDestroy = formerPage.destroy.bind(formerPage);

                    /*
                     * Very important,
                     * DO NOT animate if there are more than 1 page
                     * in destroy queue!
                     */
                    if (this.router.formerPages.length > 1) {
                        formerPageDestroy();
                    } else {
                        formerPage.hide(formerPageDestroy);
                    }
                    this.router.formerPages.pop();
                }

                this.show(onShowEnded);
            }
        }, delay);
    }

    /**
     * @param {Function} onShow
     */
    show(onShow) {
        log.debug('▶️ #' + this.id);
        // Animate
        var tween = TweenLite.to(this.$cont, 0.6, {'opacity':1, onComplete: () => {
            this.router.transition = false;
            if (typeof onShow !== 'undefined') {
                onShow();
            }
        }});
    }

    /**
     *
     */
    showEnded() {
        this.$cont.removeClass(this.router.options.pageClass + '-ajax');
        this.$cont.removeClass(this.router.options.pageClass + '-transitioning');
    }

    /**
     * @param {Function} onHidden
     */
    hide(onHidden) {
        log.debug('◀️ #' + this.id);
        TweenLite.to(this.$cont, 0.6, {opacity:0, onComplete:onHidden});
    }

    initAjax() {
        this.$cont.addClass(this.router.options.pageClass + '-transitioning');
    }

    /**
     * @private
     */
    initBlocks() {
        for(let blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {
            let type = this.$blocks[blockIndex].getAttribute(this.router.options.objectTypeAttr),
                id = this.$blocks[blockIndex].id;

            let block = this.router.classFactory.getBlockInstance(type, this, this.$blocks.eq(blockIndex));
            /*
             * Prevent undefined blocks to be appended to block collection.
             */
            if (block) {
                this.blocks.push(block);
            }
        }
        /*
         * Notify all blocks that page init is over.
         */
        for (let i = this.blocks.length - 1; i >= 0; i--) {
            this.blocks[i].onPageReady();
        }
    }

    /**
     * @param  {String} id
     * @return {AbstractBlock|null}
     */
    getBlockById(id) {
        for (let i in this.blocks) {
            if (this.blocks[i] &&
                this.blocks[i].id &&
                this.blocks[i].id == id) {
                return this.blocks[i];
            }
        }
        return null;
    }

    /**
     *
     */
    onResize(){

    }

    /**
     * Called before init lazyload images.
     */
    beforeLazyload() {

    }

    /**
     * After image src switched.
     *
     * @param {HTMLImage} element
     */
    onLazyImageSet(element) {
        log.debug('\t🖼 «'+element.id+'» set');
    }

    /**
     * After lazyload image loaded.
     *
     * @param {HTMLImage} element
     */
    onLazyImageLoad(element) {
        log.debug('\t🖼 «'+element.id+'» load');
    }

    /**
     * Before lazyload.
     */
    onLazyImageProcessed(index) {
        log.debug('\t🖼 Lazy load processed');
    }

    /**
     * Add target blank to external links.
     *
     * @param  {JQuery} $links
     * @param  {String} baseUrl
     */
    externalLinkTarget($links, baseUrl) {
        const linksLength = $links.length;
        let abstractBaseUrl = baseUrl.split('://');

        abstractBaseUrl = abstractBaseUrl[1];

        for(let linkIndex = 0; linkIndex < linksLength; linkIndex++){
            const link = $links[linkIndex];
            if(link.href.indexOf(abstractBaseUrl) == -1 &&
               link.href.indexOf('javascript') == -1 &&
               link.href.indexOf('mailto:') == -1 &&
               link.href.charAt(0) != '/' &&
               link.href.charAt(0) != '#')
            {
                $links[linkIndex].target = '_blank';
            }
        }
    }
}
