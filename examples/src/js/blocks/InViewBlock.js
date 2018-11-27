/*
 * Copyright © 2017, Rezo Zero
 *
 * @file InViewBlock.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import { AbstractInViewBlock } from 'starting-blocks'
import { TweenMax, Power4 } from 'gsap'

export default class InViewBlock extends AbstractInViewBlock {
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
