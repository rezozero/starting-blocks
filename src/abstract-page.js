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
import {AbstractBlock} from "abstract-block.js";

class AbstractPage {
    /**
     *
     * @param  {Router}  router
     * @param  {String}  id
     * @param  {String}  context
     * @param  {String}  type
     * @param  {Boolean} isHome
     */
    constructor(router, id, context, type, isHome) {
        type = type || 'page';

        this.router = router;
        this.id = id;
        this.context = context;
        this.type = type;
        this.isHome = isHome;

        this.init();
        this.initEvents();
    }

    init() {
        this.loadDurationMin = 1200; // Time for animate loader
        this.$cont = $('#page-content-'+this.id).eq(0);

        if (this.$cont.length) {
            this.$link = this.$cont.find('a').not('[target="_blank"]');
        } else {
            this.$link = null;
        }
        // Add target blank on external link
        if(null !== this.$link && this.$link.length){
            this.externalLinkTarget(this.$link, this.router.baseUrl);
            this.$link = this.$cont.find('a').not('[target="_blank"]');
        }

        // --- Blocks --- //
        this.blocks = [];
        this.$block = this.$cont.find('.page-block');
        this.blockLength = this.$block.length;
        if(this.blockLength) {
            this.initBlocks();
        }

        // --- Context --- //
        if(this.context == 'static' &&
           this.router.ajaxEnabled) {
            this.router.pushFirstState(this.type, this.id, this.isHome);
        } else if(this.context == 'ajax'){
            this.initAjax();
        }
    }

    destroy() {
        this.$cont.remove();
        this.destroyEvents();
        // --- Blocks --- //
        if(this.blocks !== null){
            for(var blockIndex in this.blocks) {
                this.blocks[blockIndex].destroy();
            }
        }
    }

    initEvents() {
        if (this.$cont.find('img').length) {
            this.$cont.waitForImages({
                finished: $.proxy(this.onLoad, this),
                waitForAll: true
            });
        } else {
            this.onLoad();
        }

        if(this.$link !== null && this.router.options.ajaxEnabled) {
            this.$link.on('click', $.proxy(this.router.linkClick, this.router));
        }

        $(window).on('resize', debounce($.proxy(this.onResize, this), 100, false));
    }

    destroyEvents() {
        if(this.$link !== null && this.router.options.ajaxEnabled) {
            this.$link.off('click', $.proxy(this.router.linkClick, this.router));
        }

        $(window).off('resize', debounce($.proxy(this.onResize, this), 100, false));
    }

    onLoad(e){
        this.loadDate = new Date();
        this.loadDuration = this.loadDate - this.router.loadBeginDate;

        var delay = (this.loadDuration > this.loadDurationMin) ? 0 : this.loadDurationMin - this.loadDuration;

        // Hide loading
        setTimeout(function(){
            if(this.context == 'static'){
                // this.show();
            } else if(this.context == 'ajax'){
                // Update body id
                $('body').get(0).id = history.state.nodeName;
                // Hide formerPages - show
                if (this.router.formerPages.length > 0) {
                    var formerPage = this.router.formerPages[(this.router.formerPages.length - 1)],
                        formerPageDestroy = $.proxy(formerPage.destroy, formerPage);

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
                //console.log(this.router.formerPages);
                this.show($.proxy(this.showEnded, this));
            }
        }, delay);
    }

    show(onShow){
        // Animate
        TweenLite.to(this.$cont, 0.6, {opacity:1, onComplete: f => {
            this.router.transition = false;

            if (typeof onShow !== 'undefined') {
                onShow();
            }
        }});
    }

    showEnded() {
        if(this.context == 'ajax'){
            removeClass(this.$cont[0], 'page-content-ajax');
        }
    }

    hide(onHidden){
        TweenLite.to(this.$cont, 0.6, {opacity:0, onComplete:onHidden});
    }

    initAjax() {
        // --- Change title --- //
        if(this.$cont.length && this.$cont[0].getAttribute('data-meta-title') !== ''){
            var metaTitle = this.$cont[0].getAttribute('data-meta-title');
            if(metaTitle !== null && metaTitle !== '') document.title = metaTitle;
        }
    }

    initBlocks() {
        for(var blockIndex in this.blockLength) {
            var type = this.$block[blockIndex].getAttribute('data-node-type'),
                id = this.$block[blockIndex].id;

            if (typeof this.router.routes[type] !== "undefined") {
                this.blocks[blockIndex] = new window[this.router.routes[type]](this, id, type);
            } else {
                this.blocks[blockIndex] = new AbstractBlock(this, id, type);
            }
        }
    }

    onResize(){

    }

    /**
     * Add target blank to external links.
     *
     * @param  {[type]} $links
     * @param  {[type]} baseUrl
     */
    externalLinkTarget($links, baseUrl) {
        var linksLength = $links.length,
            abstractBaseUrl = baseUrl.split('://');

        abstractBaseUrl = abstractBaseUrl[1];

        for(var linkIndex = 0; linkIndex < linksLength; linkIndex++){
            var link = $links[linkIndex];
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

export {AbstractPage};