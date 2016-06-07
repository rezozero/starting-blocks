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

export class State {
    /**
     * 
     * @param {String} link
     * @param {Object} options
     */
    constructor(link, options) {
        this.options = {
            previousType: "page",
            navLinkClass: "nav-link",
        };

        if (options !== null) {
            this.options = $.extend(this.options, options);
        }

        const context = (link.className.indexOf(this.options.navLinkClass) >= 0) ? 'nav' : 'link';
        const dataHome = link.getAttribute('data-is-home');
        const isHome = (dataHome == '1') ? true : false;
        let title = link.getAttribute('data-title');
        let nodeType = link.getAttribute('data-node-type');

        if(title === '') title = link.innerHTML;
        if(nodeType === '') nodeType = "page";

        this.title = title;
        this.href = link.href;
        this.nodeType = nodeType;
        this.nodeName = link.getAttribute('data-node-name');
        this.index = Number(link.getAttribute('data-index'));
        this.transition = this.options.previousType+'_to_'+nodeType;
        this.context = context;
        this.isHome = isHome;
    }
}
