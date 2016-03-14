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

export class BootstrapMedia {
    static isMinSM() {
        var size = Utils.getViewportSize();

        if (size.width >= 768) {
            return true;
        } else {
            return false;
        }
    }

    static isMinMD() {
        var size = Utils.getViewportSize();

        if (size.width >= 992) {
            return true;
        } else {
            return false;
        }
    }

    static isMinLG() {
        var size = Utils.getViewportSize();

        if (size.width >= 1200) {
            return true;
        } else {
            return false;
        }
    }

    static isMinXL() {
        var size = Utils.getViewportSize();

        if (size.width >= 1920) {
            return true;
        } else {
            return false;
        }
    }
}
