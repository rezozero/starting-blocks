/**
 * Copyright REZO ZERO 2016
 *
 *
 *
 * @file bootstrapMedia.js
 * @copyright REZO ZERO 2016
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

import Utils from './Utils'

/**
 * Static class to get bootstrap breakpoints.
 */
export default class BootstrapMedia {
    constructor () {
        // Values
        this.viewportSize = null
        this.breakpoints = {
            xs: 480,
            sm: 768,
            md: 992,
            lg: 1200,
            xl: 1920
        }

        // Binded methods
        this.setValues = this.setValues.bind(this)

        // Init
        this.init()
    }

    init () {
        window.addEventListener('resize', this.setValues)
        this.setValues()
    }

    setValues () {
        this.viewportSize = Utils.getViewportSize()
    }

    resize () {
        this.setValues()
    }

    isMin (breakpoint) {
        if (!this.breakpoints[breakpoint]) {
            const errorMessage = `Breakpoint '${breakpoint}' do not exist`
            console.error(errorMessage)
            throw new Error(errorMessage)
        }

        return this.viewportSize.width >= this.breakpoints[breakpoint]
    }
}
