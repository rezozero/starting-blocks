
/*
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
 * @file BigTransition.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import { AbstractTransition } from 'starting-blocks'
import { TweenMax } from 'gsap'

/**
 * Fade Transition class example. Fade Out / Fade In content.
 *
 * @extends {AbstractTransition}
 */
export default class FadeTransition extends AbstractTransition {
    constructor () {
        super()
        this.$el = document.getElementById('big-transition')
        this.$verticals = [...document.getElementById('big-transition-vertical').querySelectorAll('div')]
        this.$horizontals = [...document.getElementById('big-transition-horizontal').querySelectorAll('div')]
    }

    /**
     * Entry point of the animation
     * Automatically called on init()
     */
    start () {
        // Wait new content and the end of fadeOut animation
        // this.newPageLoading is a Promise which is resolved when the new content is loaded
        Promise.all([this.newPageLoading, this.startAnim()])
        // then fadeIn the new content
            .then(this.endAnim.bind(this))
    }

    /**
     * Fade out the old content.
     * @returns {Promise}
     */
    startAnim () {
        return new Promise((resolve) => {
            TweenMax.to(this.oldPage.$cont, 0.75, {
                alpha: 0
            })

            TweenMax.set(this.$el, {
                autoAlpha: 1,
                onComplete: () => {
                    TweenMax.staggerTo(this.$horizontals, 0.5, {
                        scaleX: 1
                    }, 0.1)

                    TweenMax.staggerTo(this.$verticals.reverse(), 0.5, {
                        scaleY: 1
                    }, 0.1, resolve)
                }
            })
        })
    }

    /**
     * Fade in the new content
     */
    endAnim () {
        // Add display: none on the old container
        this.oldPage.$cont.hide()

        // Prepare new content css properties for the fade animation
        this.newPage.$cont.css({
            visibility: 'visible',
            opacity: 0
        })

        // IMPORTANT Call this method just after set visibility to visible
        this.newPage.checkLazyload()

        // Scroll to the top
        document.body.scrollTop = 0

        TweenMax.to(this.newPage.$cont, 0.75, {
            alpha: 1
        })

        TweenMax.staggerTo(this.$horizontals, 0.5, {
            scaleX: 0
        }, 0.1)

        TweenMax.staggerTo(this.$verticals, 0.5, {
            scaleY: 0
        }, 0.1, () => {
            TweenMax.set(this.$el, {
                autoAlpha: 0
            })

            this.done()
        })
    }
}
