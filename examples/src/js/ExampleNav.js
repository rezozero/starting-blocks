/**
 * Copyright (c) 2018.
 * @file ExampleNav.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import {
    EventTypes
} from 'starting-blocks'

/**
 * An example nav which binds links for AJAX use.
 */
export default class ExampleNav {
    constructor () {
        /**
         * @type {HTMLElement | null}
         */
        this.container = document.getElementById('main-nav')

        /**
         * @type {Array<HTMLElement>}
         */
        this.linkElements = [...this.container.querySelectorAll('a')]

        // Binded methods
        this.onAfterPageBoot = this.onAfterPageBoot.bind(this)
    }

    init () {
        this.initEvents()
    }

    initEvents () {
        window.addEventListener(EventTypes.AFTER_PAGE_BOOT, this.onAfterPageBoot)
    }

    onAfterPageBoot () {
        // Remove all active class
        for (const linkElement of this.linkElements) {
            linkElement.classList.remove('active')

            if (linkElement.href === window.location.href) {
                linkElement.classList.add('active')
            }
        }
    }
}
