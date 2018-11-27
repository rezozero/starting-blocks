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
 * @file FadeTransition.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import TweenLite from 'gsap/TweenLite'
import { AbstractTransition } from 'starting-blocks'

/**
 * Fade Transition class example. Fade Out / Fade In content.
 *
 * @extends {AbstractTransition}
 */
export default class FadeTransition extends AbstractTransition {
    /**
     * Entry point of the animation
     * Automatically called on init()
     */
    start () {
        // Wait new content and the end of fadeOut animation
        // this.newPageLoading is a Promise which is resolved when the new content is loaded
        Promise.all([this.newPageLoading, this.fadeOut()])
            // then fadeIn the new content
            .then(this.fadeIn.bind(this))
    }

    /**
     * Fade out the old content.
     * @returns {Promise}
     */
    fadeOut () {
        return new Promise((resolve) => {
            TweenLite.to(this.oldPage.rootElement, 0.4, {
                alpha: 0,
                onComplete: resolve
            })
        })
    }

    /**
     * Fade in the new content
     */
    fadeIn () {
        // Add display: none on the old container
        this.oldPage.rootElement.style.display = 'none'

        // Prepare new content css properties for the fade animation
        this.newPage.rootElement.style.visibility = 'visible'
        this.newPage.rootElement.style.opacity = '0'

        // IMPORTANT Call this method just after set visibility to visible
        this.newPage.updateLazyload()

        // Scroll to the top
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        // fadeIn the new content container
        TweenLite.to(this.newPage.rootElement, 0.4, {
            alpha: 1,
            onComplete: () => {
                // IMPORTANT: Call this method at the end
                this.done()
            }
        })
    }
}
