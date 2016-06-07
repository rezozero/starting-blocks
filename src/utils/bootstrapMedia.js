/**
 * Copyright REZO ZERO 2016
 *
 *
 *
 * @file bootstrapMedia.js
 * @copyright REZO ZERO 2016
 * @author Ambroise Maupate
 */
import {Utils} from "utils/utils";

/**
 * Static class to get bootstrap breakpoints.
 */
export class BootstrapMedia {
    static isMinSM() {
        const size = Utils.getViewportSize();

        if (size.width >= 768) {
            return true;
        } else {
            return false;
        }
    }

    static isMinMD() {
        const size = Utils.getViewportSize();

        if (size.width >= 992) {
            return true;
        } else {
            return false;
        }
    }

    static isMinLG() {
        const size = Utils.getViewportSize();

        if (size.width >= 1200) {
            return true;
        } else {
            return false;
        }
    }

    static isMinXL() {
        const size = Utils.getViewportSize();

        if (size.width >= 1920) {
            return true;
        } else {
            return false;
        }
    }
}
