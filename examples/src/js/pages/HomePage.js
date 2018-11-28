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
 * @file Home.js
 * @author Ambroise Maupate
 */

import { AbstractPage, EventTypes } from 'starting-blocks'
import { TweenMax, Power3 } from 'gsap'

/**
 * Some example "home" page.
 *
 * @extends {AbstractPage}
 * @class
 */
export default class HomePage extends AbstractPage {
    constructor (container) {
        super(container, 'HomePage')

        // Elements
        this.elements = []

        // Bind methods
        this.prepareShow = this.prepareShow.bind(this)
        this.show = this.show.bind(this)
    }

    async init () {
        await super.init()

        this.elements = [...this.rootElement.querySelectorAll('.bg-white')]
    }

    initEvents () {
        super.initEvents()

        window.addEventListener(EventTypes.BEFORE_SPLASHSCREEN_HIDE, this.prepareShow)
        window.addEventListener(EventTypes.START_SPLASHSCREEN_HIDE, this.show)
    }

    destroyEvents () {
        super.destroyEvents()

        window.removeEventListener(EventTypes.BEFORE_SPLASHSCREEN_HIDE, this.prepareShow)
        window.removeEventListener(EventTypes.START_SPLASHSCREEN_HIDE, this.show)
    }

    prepareShow () {
        TweenMax.set(this.elements, {
            alpha: 0,
            y: 200
        })
    }

    show () {
        TweenMax.staggerTo(this.elements, 1.2, {
            alpha: 1,
            delay: 0.2,
            ease: Power3.easeOut,
            y: 0
        }, 0.2)
    }
}
