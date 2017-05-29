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
export default class State {
    /**
     *
     * @param {Router} router
     * @param {HTMLElement} link
     * @param {Object} options Extends state options.
     */
    constructor(router, link, options) {
        /**
         * Keep custom informations such as:
         *
         * | Options        | Defaults         |
         * | -------------- | ---------------- |
         * | `previousType` | "page" |
         * | `previousName` | "home" |
         * | `navLinkClass` | "nav-link" |
         * | `previousHref` | `window.location.href` |
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

        /**
         * @type {String}
         */
        this.title = window.document.title;
        /**
         * @type {String}
         */
        this.href = window.location.href;
        /**
         * @type {String}
         */
        this.nodeName = '';
        /**
         * @type {Number}
         */
        this.index = 0;

        this.uid = Math.round(Math.random() * 1000)

        /**
         * @type {String}
         */
        this.nodeType = 'page';
        /**
         * History change context:
         *
         * - `nav`
         * - `link`
         * - `history`
         *
         * @type {String}
         */
        this.context = 'history';
        /**
         * @type {Boolean}
         */
        this.isHome = false;
        /**
         * @type {String}
         */
        this.transitionName = null

        if (null !== link) {
            this.context = (link.className.indexOf(this.options.navLinkClass) >= 0) ? 'nav' : 'link';
            const dataHome = link.getAttribute('data-is-home');
            this.isHome = (dataHome == '1') ? (true) : (false);

            this.title = link.getAttribute('data-title');
            if(this.title === '') this.title = link.innerHTML;

            this.nodeType = link.getAttribute(router.options.ajaxLinkTypeAttr);
            if (this.nodeType === null || this.nodeType === '') {
                let objectTypeAttr = link.getAttribute(router.options.objectTypeAttr);
                if (objectTypeAttr !== null && objectTypeAttr !== '') this.nodeType = objectTypeAttr;
            }

            this.nodeName = link.getAttribute('data-node-name');
            this.index = Number(link.getAttribute('data-index'));
            this.href = link.href;

            this.transitionName = link.getAttribute('data-transition');
        }


        /**
         * @type {String}
         */
        this.transition = this.options.previousType + '_to_' + this.nodeType;
    }

    /**
     * Update
     * @param  {AbstractPage} page
     * @return {this}
     */
    update(page) {
        this.transition = this.options.previousType+'_to_'+page.type;
        this.nodeName = page.name;
        this.isHome = page.isHome;
        this.nodeType = page.type;
    }
}
