/**
 * Copyright REZO ZERO 2016
 *
 *
 *
 * @file bootstrapMedia.js
 * @copyright REZO ZERO 2016
 * @author Ambroise Maupate
 */
import Utils from './Utils'

/**
 * Static class to get bootstrap breakpoints.
 */
export default class BootstrapMedia {
    /**
     * Test if viewport width in greater or equal than bootstrap XS breakpoint (480px).
     *
     * @return {Boolean}
     */
    static isMinXS () {
        const size = Utils.getViewportSize()
        return size.width >= 480
    }

    /**
     * Test if viewport width in greater or equal than bootstrap SM breakpoint (768px).
     *
     * @return {Boolean}
     */
    static isMinSM () {
        const size = Utils.getViewportSize()
        return size.width >= 768
    }

    /**
     * Test if viewport width in greater or equal than bootstrap MD breakpoint (992px).
     *
     * @return {Boolean}
     */
    static isMinMD () {
        const size = Utils.getViewportSize()
        return size.width >= 992
    }

    /**
     * Test if viewport width in greater or equal than bootstrap LG breakpoint (1200px).
     *
     * @return {Boolean}
     */
    static isMinLG () {
        const size = Utils.getViewportSize()
        return size.width >= 1200
    }

    /**
     * Test if viewport width in greater or equal than bootstrap XL breakpoint (1920px).
     *
     * @return {Boolean}
     */
    static isMinXL () {
        const size = Utils.getViewportSize()
        return size.width >= 1920
    }
}
