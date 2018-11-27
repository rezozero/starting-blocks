/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractInViewBlock.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import AbstractBlock from './AbstractBlock'

export default class AbstractInViewBlock extends AbstractBlock {
    constructor (container, blockName = 'AbstractInViewBlock') {
        super(container, blockName)

        // Values
        this.observer = null
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        }

        // Bind method
        this.onIntersectionCallback = this.onIntersectionCallback.bind(this)
    }

    init () {
        super.init()

        // Create an observer
        this.observer = new window.IntersectionObserver(this.onIntersectionCallback, this.observerOptions)

        // Add block rootElement in the observer
        this.observer.observe(this.rootElement)
    }

    destroyEvents () {
        super.destroyEvents()
        this.unobserve()
    }

    onIntersectionCallback (entries) {
        for (const entry of entries) {
            if (entry.intersectionRatio > 0) {
                this.onScreen(entry)
            } else {
                this.offScreen(entry)
            }
        }
    }

    onScreen (entry) {}

    offScreen (entry) {}

    unobserve () {
        this.observer.unobserve(this.rootElement)
    }
}
