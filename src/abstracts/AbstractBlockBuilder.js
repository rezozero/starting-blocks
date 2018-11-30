/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractBlockBuilder.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import AbstractService from './AbstractService'

export default class AbstractBlockBuilder extends AbstractService {
    /**
     * Returns an `AbstractBlock` child class instance
     * according to the nodeTypeName or an AbstractBlock as default.
     *
     * Comment out the default case if you don’t want a default block to be instantiated
     * for each block.
     *
     * @param  {String} blockType
     * @return {AbstractBlock|null}
     */
    async getBlockInstance (blockType) { return null }
}
