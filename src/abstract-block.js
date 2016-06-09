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
import log from "loglevel";
import waitForImages from "waitForImages";
import $ from "jquery";
import {debounce} from "utils/debounce";

export class AbstractBlock
{
    /**
     * @param  {AbstractPage} page
     * @param  {String} id
     * @param  {String} type
     */
    constructor(page, $cont, type) {
        type = type || 'block';

        this.page = page;
        this.$cont = $cont;
        this.id = $cont[0].id;
        this.type = type;
        this.onResizeDebounce = debounce(this.onResize.bind(this), 50, false);

        log.debug('    + New block : ' + type + ' - #'+this.id);

        this.init();
        this.initEvents();
    }

    /**
     *
     */
    init() {

    }

    /**
     *
     */
    initEvents(){
        this.$cont.waitForImages({
            finished: this.onLoad.bind(this),
            waitForAll: true
        });

        window.addEventListener('resize', this.onResizeDebounce);
    }

    destroy() {
        this.destroyEvents();
    }

    destroyEvents(){
        window.removeEventListener('resize', this.onResizeDebounce);
    }

    onResize() {

    }

    onLoad() {

    }

    /**
     * onMapsReady.
     *
     * This method must be dispatched by Base.initMaps callback
     * method.
     * @deprecated Use directly AMD modules to load Maps external library.
     */
    onMapsReady(){

    }
}
