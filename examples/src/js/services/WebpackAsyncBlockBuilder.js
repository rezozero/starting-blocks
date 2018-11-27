/*
 * Copyright © 2017, Rezo Zero
 *
 * @file WebpackAsyncBlockBuilder.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import { AbstractBlockBuilder } from 'starting-blocks'

export default class WebpackAsyncBlockBuilder extends AbstractBlockBuilder {
    // Dynamic import
    async getBlockInstance (nodeTypeName) {
        try {
            const Block = await this.getModule(nodeTypeName)

            if (!this.hasService(nodeTypeName)) {
                this.container.$register({
                    $name: nodeTypeName,
                    $type: 'instanceFactory',
                    $value: c => {
                        return new Block(c)
                    }
                })
            }

            return this.getService(nodeTypeName).instance()
        } catch (e) {
            console.error(e.message)
            return null
        }
    }

    async getModule (nodeTypeName) {
        return import(`../blocks/${nodeTypeName}` /* webpackChunkName: "block-" */)
            .then(block => {
                return block.default
            })
    }
}
