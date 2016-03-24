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
 * @file nav.js
 * @author Ambroise Maupate
 */

/**
 * Interface for a navigation element.
 *
 * Any child implementations must implements
 * update method.
 */
export class Nav {

    constructor() {
        /**
         * Page DOM section.
         *
         * @type {jQuery}
         */
        this.$cont = null;
    }

    /**
     * Update navigation state against a DOM container.
     *
     * @param {JQuery object} $cont
     */
    update($cont) {
        if (!$cont) {
            throw "Nav update method needs a JQuery DOM object.";
        }
        this.$cont = $cont;

        // console.log('[Nav] Updated for ' + this.$cont[0].id);
    }

    /**
     * Bind navigation against router.
     *
     * @param {Router} router
     */
    initEvents(router) {
        if (!router) {
            throw "Nav initEvents method needs a Router object.";
        }
        // console.log('Init nav events');
    }
}
