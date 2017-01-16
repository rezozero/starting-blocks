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
import log from "loglevel/dist/loglevel";
import waitForImages from "jquery.waitforimages/dist/jquery.waitforimages";
import $ from "jquery";
import debounce from "./utils/debounce";

/**
 * Base class for creating block implementations.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 *
 * @abstract
 */
export default class AbstractBlock
{
    /**
     * Abstract block constructor.
     *
     * It‘s better to extend this class by using `init` method instead
     * of extending `constructor`.
     *
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
        this.name = (this.$cont.length) ? this.$cont[0].getAttribute('data-node-name') : '';
        this.onResizeDebounce = debounce(this.onResize.bind(this), 50, false);

        log.debug('\t✳️ #'+this.id + '\t' + type);

        this.init();
        this.initEvents();
    }

    /**
     * Basic members initialization for children classes.
     * Do not search for page blocks here, use `onPageReady` method instead
     *
     * @abstract
     */
    init() {

    }

    /**
     * Bind load and resize events for this specific block.
     *
     * Do not forget to call `super.initEvents();` while extending this method.
     *
     * @abstract
     */
    initEvents(){
        if (this.$cont.find('img').length) {
            this.$cont.waitForImages({
                finished: this.onLoad.bind(this),
                waitForAll: true
            });
        } else {
            this.onLoad();
        }

        this.page.router.$window.on('resize', this.onResizeDebounce);
    }

    /*
     * Destroy current block.
     *
     * Do not forget to call `super.destroy();` while extending this method.
     */
    destroy() {
        log.debug('\t🗑 #'+this.id);
        this.destroyEvents();
    }

    /*
     * Unbind event block events.
     *
     * Make sure you’ve used binded methods to be able to
     * `off` them correctly.
     *
     * Do not forget to call `super.destroyEvents();` while extending this method.
     *
     * @abstract
     */
    destroyEvents(){
        this.page.router.$window.off('resize', this.onResizeDebounce);
    }

    /**
     * @abstract
     */
    onResize() {

    }

    /**
     * @abstract
     */
    onLoad() {

    }

    /**
     * Called once all page blocks have been created.
     *
     * @abstract
     */
    onPageReady() {

    }
}
