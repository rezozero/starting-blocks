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
 * @file state.js
 * @author Ambroise Maupate
 */
import $ from "jquery";

/**
 * State object is meant to carry informations during HTML5 History changes.
 */
export class State {
    /**
     *
     * @param {Router} router
     * @param {String} link
     * @param {Object} options Extends state options.
     */
    constructor(router, link, options) {
        /**
         * Keep custom informations such as:
         *
         * - `previousType`: Default `"page"`
         * - `previousName`: Default `"home"`
         * - `navLinkClass`: Default `"nav-link"`
         * - `previousHref`: Default `window.location.href`
         *
         * @type {Object}
         */
        this.options = {
            previousType: "page",
            previousName: "home",
            navLinkClass: "nav-link",
            previousHref: window.location.href
        };

        if (options !== null) {
            this.options = $.extend(this.options, options);
        }

        const context = (link.className.indexOf(this.options.navLinkClass) >= 0) ? 'nav' : 'link';
        const dataHome = link.getAttribute('data-is-home');
        const isHome = (dataHome == '1') ? (true) : (false);

        let title = link.getAttribute('data-title');
        if(title === '') title = link.innerHTML;

        let nodeType = link.getAttribute(router.options.ajaxLinkTypeAttr);
        if(nodeType === null || nodeType === ''){
            let objectTypeAttr = link.getAttribute(router.options.objectTypeAttr);
            if(objectTypeAttr !== null && objectTypeAttr !== '') nodeType = objectTypeAttr;
            else nodeType = "page";
        }

        /**
         * @type {String}
         */
        this.title = title;
        /**
         * @type {String}
         */
        this.href = link.href;
        /**
         * @type {String}
         */
        this.nodeType = nodeType;
        /**
         * @type {String}
         */
        this.nodeName = link.getAttribute('data-node-name');
        /**
         * @type {Number}
         */
        this.index = Number(link.getAttribute('data-index'));
        /**
         * @type {String}
         */
        this.transition = this.options.previousType+'_to_'+nodeType;
        /**
         * History change context:
         *
         * - `nav`
         * - `link`
         *
         * @type {String}
         */
        this.context = context;
        /**
         * @type {Boolean}
         */
        this.isHome = isHome;

        console.log('STATE');
        console.log(this);
    }

    /**
     * Update
     * @param  {AbstractPage} page
     * @return {this}      
     */
    update(page){
        this.transition = this.options.previousType+'_to_'+page.type;
        this.nodeName = page.name;
        this.isHome = page.isHome;
        this.nodeType = page.type;

        if(history.replaceState){
            history.replaceState(this, document.title, window.location.href);
        }
    }
}
