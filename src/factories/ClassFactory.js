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
 * @file ClassFactory.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

import * as log from 'loglevel'
import AbstractPage from '../abstracts/AbstractPage'

/**
 * Router mapper class.
 *
 * This class maps your `data-node-type` with your *ES6* classes.
 *
 * **You must define your own ClassFactory for each of your projects.**.
 */
export default class ClassFactory {
    /**
     * Returns an `AbstractPage` child class instance
     * according to the `nodeTypeName` or an `AbstractPage` as default.
     *
     * @param  {Router}  router
     * @param  {HTMLElement}  container
     * @param  {String}  context
     * @param  {String}  nodeType
     *
     * @return {AbstractPage}
     */
    getPageInstance (router, container, context, nodeType) {
        switch (nodeType) {
        default:
            log.info(`"${nodeType}" has no defined route, using Page.`)
            return new AbstractPage(router, container, context, nodeType)
        }
    }

    /**
     * Returns an `AbstractBlock` child class instance
     * according to the nodeTypeName or an AbstractBlock as default.
     *
     * Comment out the default case if you don’t want a default block to be instantiated
     * for each block.
     *
     * @param  {AbstractPage} page
     * @param  {HTMLElement} container
     * @param  {String} nodeType
     * @return {AbstractBlock}
     */
    getBlockInstance (page, container, nodeType) {}
}
