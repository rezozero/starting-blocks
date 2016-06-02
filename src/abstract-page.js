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
import TweenLite from "TweenLite";
import waitForImages from "waitForImages";
import $ from "jquery";
import {debounce} from "utils/debounce";
import {AbstractBlock} from "abstract-block";
import {Router} from "router";

export class AbstractPage {
    /**
     * @param  {Router}  router
     * @param  {String}  $cont
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
        if (!(router instanceof Router)) {
            throw "'router' must be an instance of Router.";
        }

        this.router = router;
        this.$cont = $cont;
        this.id = $cont[0].id;
        this.context = context;
        this.type = type;
        this.isHome = isHome;
        this.onResizeDebounce = debounce(this.onResize.bind(this), 50, false);

        console.log('>> New page : ' + type + ' - ' + this.id);

        this.init();
        this.initEvents();
    }

    init() {
        this.$link = this.$cont.find('a').not('[target="_blank"]');

        // Add target blank on external link
        if(this.$link.length){
            this.externalLinkTarget(this.$link, this.router.baseUrl);
            this.$link = this.$cont.find('a').not('[target="_blank"]');
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

    destroy() {
        console.log('destroy:' + this.id);
        this.$cont.remove();
        this.destroyEvents();
        // --- Blocks --- //
        if (this.blocks !== null) {
            for (var blockIndex in this.blocks) {
                this.blocks[blockIndex].destroy();
            }
        }
    }

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
            this.$link.on('click', this.router.onLinkClick.bind(this.router));
        }

        window.addEventListener('resize', this.onResizeDebounce);
    }

    destroyEvents() {
        this.$link.off('click', this.router.onLinkClick.bind(this.router));

        window.removeEventListener('resize', this.onResizeDebounce);
    }

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
                $('body').get(0).id = history.state.nodeName;
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

    show(onShow) {
        console.log('>>>> Show ----');
        // Animate
        var tween = TweenLite.to(this.$cont, 0.6, {'opacity':1, onComplete: () => {
            this.router.transition = false;
            if (typeof onShow !== 'undefined') {
                onShow();
            }
        }});
    }

    showEnded() {
        console.log('---- Show >>>>');
        this.$cont.removeClass(this.router.options.pageClass + '-ajax');
        this.$cont.removeClass(this.router.options.pageClass + '-transitioning');
    }

    hide(onHidden) {
        console.log('hiding:' + this.id);
        TweenLite.to(this.$cont, 0.6, {opacity:0, onComplete:onHidden});
    }

    initAjax() {
        this.$cont.addClass(this.router.options.pageClass + '-transitioning');
    }

    initBlocks() {

        for(let blockIndex = 0; blockIndex < this.blockLength; blockIndex++) {

            let type = this.$blocks[blockIndex].getAttribute('data-node-type'),
                id = this.$blocks[blockIndex].id;

            if (this.router.routes[type] !== "undefined") {
                this.blocks[blockIndex] = new this.router.routes[type](this, this.$blocks.eq(blockIndex), type);
            } else {
                this.blocks[blockIndex] = new AbstractBlock(this, this.$blocks.eq(blockIndex), type);
            }
        }
    }

    onResize(){
        // console.log('resize :' + this.id);
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
            // console.log(link.href);
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
