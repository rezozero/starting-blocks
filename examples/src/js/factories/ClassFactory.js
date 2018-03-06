/*
 * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
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
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file ClassFactory.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import * as log from 'loglevel'
import DefaultPage from '../pages/DefaultPage'
import HomePage from '../pages/HomePage'

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
        case 'home':
            log.debug('Create new home')
            return new HomePage(router, container, context, nodeType)
        default:
            log.info(`"${nodeType}" has no defined route, using Page.`)
            return new DefaultPage(router, container, context, nodeType)
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
    async getBlockInstance (page, container, nodeType) {
        // Standard import
        // switch (nodeTypeName) {
        // case 'UsersBlock':
        //     return new UsersBlock(page, $cont, nodeTypeName)
        // }

        // Dynamic import
        try {
            const Block = await this.getModule(nodeType)
            return new Block(page, container, nodeType)
        } catch (e) {
            console.error(e.message)
        }
    }

    async getModule (moduleName) {
        return import(`../blocks/${moduleName}` /* webpackChunkName: "block-" */)
            .then(block => {
                return block.default
            })
    }
}
