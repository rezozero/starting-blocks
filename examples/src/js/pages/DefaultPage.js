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
 * @file Page.js
 * @author Ambroise Maupate
 */

import { AbstractPage } from 'starting-blocks'

/**
 * Some example "page".
 *
 * @extends {AbstractPage}
 * @private
 */
export default class DefaultPage extends AbstractPage {
    init () {
        super.init()

        /**
         * @type {HTMLElement}
         */
        this.duplicateButtonElement = this.container.querySelectorAll('a.duplicate-last')[0]

        // Binded methods
        this.onButtonClick = this.onButtonClick.bind(this)
    }

    initEvents () {
        super.initEvents()

        if (this.duplicateButtonElement) {
            this.duplicateButtonElement.addEventListener('click', this.onButtonClick)
        }
    }

    destroyEvents () {
        super.destroyEvents()

        if (this.duplicateButtonElement) {
            this.duplicateButtonElement.removeEventListener('click', this.onButtonClick)
        }
    }

    onButtonClick (e) {
        e.preventDefault()
        let newBlockElement = this.blockElements[this.blockElements.length - 1].cloneNode(true)
        newBlockElement.setAttribute('id', `block-${this.blockElements.length + 1}`)
        this.container.appendChild(newBlockElement)
        return false
    }

    onLazyImageProcessed (index) {
        super.onLazyImageProcessed(index)
    }

    onResize () {
        super.onResize()
    }

    onLazyImageSet (element) {
        super.onLazyImageSet(element)
    }

    onLazyImageLoad (element) {
        super.onLazyImageLoad(element)
    }
}
