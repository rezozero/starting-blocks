/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file abstract-block.js
 * @author Ambroise Maupate
 */
class AbstractBlock {
    constructor(page, id, type) {
        this.page = page;
        this.id = id;
        this.type = type;

        this.init();
        this.initEvents();
    }

    init(){
        this.$cont = $('#' + this.id);
    }

    initEvents(){
        this.$cont.waitForImages({
            finished: $.proxy(this.onLoad, this),
            waitForAll: true
        });

        $(window).on('resize', debounce($.proxy(this.onResize, this), 50, false));
    }

    destroy() {
        this.destroyEvents();
    }

    destroyEvents(){
        $(window).off('resize', debounce($.proxy(this.onResize, this), 50, false));
    }

    onResize() {

    }

    /**
     * onMapsReady.
     *
     * This method must be dispatched by Base.initMaps callback
     * method.
     */
    onMapsReady(){

    }
}

export {AbstractBlock};