/*
 * Copyright © 2017, Rezo Zero
 *
 * @file InViewBlock.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import { AbstractInViewBlock } from 'starting-blocks'
import { TweenMax, Power4 } from 'gsap'

export default class InViewBlock extends AbstractInViewBlock {
    constructor (container) {
        super(container)

        // Prepare values
        this.imgs = []
    }

    init () {
        super.init()

        // Find elements
        this.imgs = [...this.rootElement.querySelectorAll('img')]
    }

    initEvents () {
        super.initEvents()

        for (const img of this.imgs) {
            img.addEventListener('load', () => {
                console.log('img loaded')
            })
        }
    }

    onScreen (entry) {
        TweenMax.to(this.rootElement, 1.5, {
            xPercent: 0,
            delay: 0.15,
            ease: Power4.easeOut
        })
    }

    offScreen () {
        TweenMax.set(this.rootElement, {
            xPercent: 30
        })
    }
}
