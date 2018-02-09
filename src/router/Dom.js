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

/**
 * Class that is going to deal with DOM parsing/manipulation.
 */
export default class Dom {
    /**
     * Constructor.
     *
     * @param {jQuery} $body
     * @param {String} wrapperId
     * @param {String} objectTypeAttr
     * @param {String} pageClass
     */
    constructor ($body, {
        wrapperId = 'sb-wrapper',
        objectTypeAttr = 'data-node-type',
        pageClass = 'page-content'
    } = {}) {
        /**
         * Id of the main wrapper
         *
         * @type {String}
         * @default
         */
        this.wrapperId = wrapperId

        /**
         * The data attribute name to find the node type
         *
         * @type {string}
         * @default
         */
        this.objectTypeAttr = objectTypeAttr

        /**
         * Class name used to identify the containers
         *
         * @type {String}
         * @default
         */
        this.pageClass = pageClass

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

        /**
         * Body jquery element
         *
         * @type {jQuery}
         * @default
         */
        this.$body = $body
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
        const wrapper = document.getElementById(this.wrapperId)

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
        const nodeType = container.getAttribute(this.objectTypeAttr)

        if (!nodeType) {
            throw new Error(`Starting Blocks: Node Type not found!`)
        }

        return nodeType
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
            throw new Error('Starting Blocks: no container found')
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
        return element.querySelector(`.${this.pageClass}`)
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
            this.$body.addClass(page.name)
        }

        this.$body.addClass(page.type)
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
