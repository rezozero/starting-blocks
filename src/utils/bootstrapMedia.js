/**
 * Copyright REZO ZERO 2016
 *
 *
 *
 * @file bootstrapMedia.js
 * @copyright REZO ZERO 2016
 * @author Ambroise Maupate
 */
import Utils from "utils/utils";

export default class BootstrapMedia {

    static isMediaMinSM() {
        var size = Utils.getViewportSize();

        if (size.width >= 768) {
            return true;
        } else {
            return false;
        }
    }

    static isMediaMinMD() {
        var size = Utils.getViewportSize();

        if (size.width >= 992) {
            return true;
        } else {
            return false;
        }
    }

    static isMediaMinLG() {
        var size = Utils.getViewportSize();

        if (size.width >= 1200) {
            return true;
        } else {
            return false;
        }
    }
}
