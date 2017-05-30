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
 * @file fade-transition.js
 * @author Quentin Neyraud
 * @author Adrien Scholaert
 */
import AbstractTransition from '../abstract-transition'

/**
 * Fade Transition class example. Fade Out / Fade In content.
 */
export default class FadeTransition extends AbstractTransition {
    constructor () {
        super()
    }

    start () {
        Promise.all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this))
    }

    fadeIn () {
        this.oldContainer.hide()
        this.newContainer.css({
            visibility : 'visible',
            opacity : 0
        });

        this.newContainer.animate({ opacity: 1 }, 400, () => {
            document.body.scrollTop = 0
            this.done()
        });
    }

    fadeOut () {
        return new Promise((resolve) => {
            this.oldContainer.animate({
                opacity: 0
            }, 400, 'swing', resolve);
        })
    }
}
