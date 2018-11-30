/*
 * Copyright © 2017, Rezo Zero
 *
 * @file Splashscreen.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import { AbstractSplashscreen, Dispatcher, EventTypes } from 'starting-blocks'
import { TweenMax, Power3 } from 'gsap'

export default class Splashscreen extends AbstractSplashscreen {
    constructor (container) {
        super(container, 'Splashscreen')

        // Elements
        this.rootElement = document.getElementById('splashscreen')
        this.innerEl = this.rootElement.querySelector('.splashscreen-inner')
        this.bgEl = this.rootElement.querySelector('.splashscreen-bg')

        // Values
        this.minimalDuration = 2000 // ms
        this.minimalDurationPromise = new Promise(resolve => {
            window.setTimeout(() => {
                resolve()
            }, this.minimalDuration)
        })
    }

    hide () {
        return Promise
            .all([this.minimalDurationPromise])
            .then(() => this.launchHideAnimation())
    }

    launchHideAnimation () {
        return new Promise(resolve => {
            Dispatcher.commit(EventTypes.START_SPLASHSCREEN_HIDE)

            TweenMax.to(this.innerEl, 0.5, {
                alpha: 0
            })

            TweenMax.to(this.rootElement, 1.2, {
                yPercent: 100,
                ease: Power3.easeInOut,
                onComplete: () => {
                    TweenMax.set(this.rootElement, {
                        display: 'none'
                    })

                    resolve()
                }
            })
        })
    }
}
