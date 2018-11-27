/*
 * Copyright © 2017, Rezo Zero
 *
 * @file BlockBuilder.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import AbstractBlockBuilder from '../abstracts/AbstractBlockBuilder'

export default class BlockBuilder extends AbstractBlockBuilder {
    constructor (container) {
        super(container, 'BlockBuilder')
    }

    /**
     * Returns an `AbstractBlock` child class instance
     * according to the nodeTypeName or an AbstractBlock as default.
     *
     * Comment out the default case if you don’t want a default block to be instantiated
     * for each block.
     *
     * @param  {String} blockType
     * @return {AbstractBlock}
     */
    async getBlockInstance (blockType) {
        if (this.hasService(blockType)) {
            return this.getService(blockType)
        }

        return null
    }
}
