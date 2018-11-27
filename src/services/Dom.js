/**
 * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
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
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file Dom.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import AbstractService from '../abstracts/AbstractService'

/**
 * Class that is going to deal with DOM parsing/manipulation.
 */
export default class Dom extends AbstractService {
    /**
     * Constructor.
     *
     * @param {object} container
     */
    constructor (container) {
        super(container, 'Dom')

        /**
         * Full HTML String of the current page.
         * By default is the innerHTML of the initial loaded page.
         *
         * Each time a new page is loaded, the value is the response of the ajax call.
         *
         * @type {String}
         * @default
         */
        this.currentHTML = document.documentElement.innerHTML
    }

    /**
     * Parse the responseText obtained from the ajax call.
     *
     * @param  {String} responseText
     * @return {HTMLElement}
     */
    parseResponse (responseText) {
        this.currentHTML = responseText

        const wrapper = document.createElement('div')
        wrapper.innerHTML = responseText

        return this.getContainer(wrapper)
    }

    /**
     * Get the main wrapper by the ID `wrapperId`.
     *
     * @return {HTMLElement} element
     */
    getWrapper () {
        const wrapper = document.getElementById(this.getService('Config').wrapperId)

        if (!wrapper) {
            throw new Error('Starting Blocks: Wrapper not found!')
        }

        return wrapper
    }

    /**
     * Return node type.
     *
     * @param container
     * @returns {string}
     */
    getNodeType (container) {
        return container.getAttribute(this.getService('Config').objectTypeAttr)
    }

    /**
     * Get the container on the current DOM,
     * or from an HTMLElement passed via argument.
     *
     * @param  {HTMLElement|null} element
     * @return {HTMLElement}
     */
    getContainer (element = null) {
        if (!element) { element = document.body }

        if (!element) {
            throw new Error('Starting Blocks: DOM not ready!')
        }

        const container = this.parseContainer(element)

        if (!container) {
            throw new Error(`Starting Blocks: container not found! Did you use at least
            one dom element with ".${this.getService('Config').pageClass}" class and "data-node-type" attribute?`)
        }

        return container
    }

    /**
     * Put the container on the page.
     *
     * @param  {HTMLElement} element
     */
    putContainer (element) {
        element.style.visibility = 'hidden'
        const wrapper = this.getWrapper()
        wrapper.appendChild(element)
    }

    /**
     * Get container selector.
     *
     * @param  {HTMLElement} element
     * @return {HTMLElement} element
     */
    parseContainer (element) {
        return element.querySelector(`.${this.getService('Config').pageClass}[data-node-type]`)
    }

    /**
     * Update body attributes.
     *
     * @param {AbstractPage} page
     */
    updateBodyAttributes (page) {
        // Change body class and id
        if (page.name) {
            document.body.id = page.name
            document.body.classList.add(page.name)
        }

        document.body.classList.add(page.type)

        if (page.isHome) {
            document.body.setAttribute('data-is-home', '1')
        } else {
            document.body.setAttribute('data-is-home', '0')
        }
    }

    /**
     * Update page title.
     *
     * @param {AbstractPage} page
     */
    updatePageTitle (page) {
        if (page.metaTitle) {
            document.title = page.metaTitle
        }
    }
}
