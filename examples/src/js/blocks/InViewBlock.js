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
        super(container, 'InViewBlock')

        // Prepare values
        this.imgs = []
        this.direction = 'right'
        this.xPercent = 30

        this.observerOptions = {
            ...this.observerOptions,
            threshold: 0.1
        }
    }

    init () {
        super.init()

        if (this.rootElement.hasAttribute('data-direction')) {
            this.direction = this.rootElement.getAttribute('data-direction')
        }

        if (this.direction === 'left') {
            this.xPercent = -this.xPercent
        }

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
            alpha: 1,
            delay: 0.15,
            ease: Power4.easeOut
        })
    }

    offScreen () {
        TweenMax.set(this.rootElement, {
            xPercent: this.xPercent,
            alpha: 0
        })
    }
}
