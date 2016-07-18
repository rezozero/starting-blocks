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
 * @file class-factory.js
 * @author Ambroise Maupate
 */
import log from "loglevel";
import {Page} from "pages/page";
import {Home} from "pages/home";
import {AbstractBlock} from "abstract-block";

/**
 * This class need to be redefined for each of your projects.
 */
export class ClassFactory
{
    /**
     * Returns an AbstractPage child class instance
     * according to the nodeTypeName or an AbstractPage as default.
     *
     * @param  {String}  nodeTypeName
     * @param  {Router}  router
     * @param  {jQuery}  $cont
     * @param  {String}  context
     * @param  {String}  nodeType
     * @param  {Boolean} isHome
     * @return {AbstractPage}
     */
    getPageInstance(nodeTypeName, router, $cont, context, nodeType, isHome) {
        switch(nodeTypeName){
            case 'home':
                log.debug('Create new home');
                return new Home(router, $cont, context, nodeType, isHome);
            default:
                log.info('"' + nodeTypeName + '" has no defined route, using Page.');
                return new Page(router, $cont, context, nodeType, isHome);
        }
    }

    /**
     * Returns an AbstractBlock child class instance
     * according to the nodeTypeName or an AbstractBlock as default.
     *
     * Comment out the default case if you don’t want a default block to be instantiated
     * for each block.
     *
     * @param  {String}  nodeTypeName
     * @param  {AbstractPage} page
     * @param  {jQuery}  $cont
     * @return {AbstractBlock}
     */
    getBlockInstance(nodeTypeName, page, $cont) {
        switch(nodeTypeName){
            /*case 'map-block':
                return new MapBlock(page, $cont, nodeTypeName);*/
            default:
                log.info('\t"' + nodeTypeName + '" has no defined route, using AbstractBlock.');
                return new AbstractBlock(page, $cont, nodeTypeName);
        }
    }
}
