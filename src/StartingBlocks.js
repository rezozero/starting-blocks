/*
 * Copyright © 2017, Rezo Zero
 *
 * @file StartingBlocks.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
import Bottle from 'bottlejs'
import PageBuilder from './services/PageBuilder'
import BlockBuilder from './services/BlockBuilder'
import Dom from './services/Dom'
import DefaultPage from './pages/DefaultPage'

/**
 * @namespace
 * @type {Object} defaults                      - Default config
 * @property {String} defaults.wrapperId        - Id of the main wrapper
 * @property {String} defaults.pageBlockClass
 * @property {String} defaults.pageClass        - Class name used to identify the containers
 * @property {String} defaults.objectTypeAttr   - The data attribute name to find the node type
 * @property {String} defaults.noAjaxLinkClass
 * @property {String} defaults.noPrefetchClass  - Class name used to ignore prefetch on links.
 * @const
 * @default
 */
const CONFIG = {
    defaults: {
        wrapperId: 'sb-wrapper',
        pageBlockClass: 'page-block',
        pageClass: 'page-content',
        objectTypeAttr: 'data-node-type',
        noAjaxLinkClass: 'no-ajax-link',
        noPrefetchClass: 'no-prefetch',
        debug: 0
    }
}

export default class StartingBlocks {
    constructor (config = {}) {
        this.bottle = new Bottle()
        this.bootables = []

        this.bottle.value('Config', {
            ...CONFIG.defaults,
            ...config
        })

        window.startingBlocksDebugLevel = this.bottle.container.Config.debug

        this.provider('Dom', Dom)
        this.provider('BlockBuilder', BlockBuilder)
        this.instanceFactory('DefaultPage', c => {
            return new DefaultPage(c)
        })
    }

    provider (id, ClassName, ...args) {
        if (!id || !ClassName) {
            throw new Error('A parameter is missing')
        }

        this.bottle.provider(id, function () {
            this.$get = container => {
                return new ClassName(container, ...args)
            }
        })
    }

    factory (id, f) {
        this.bottle.factory(id, f)
    }

    instanceFactory (id, f) {
        this.bottle.instanceFactory(id, f)
    }

    bootableProvider (id, ClassName, ...args) {
        this.provider(id, ClassName, ...args)
        this.bootables.push(id)
    }

    boot () {
        this.bootableProvider('PageBuilder', PageBuilder)

        for (const serviceName of this.bootables) {
            if (this.bottle.container.hasOwnProperty(serviceName)) {
                this.bottle.container[serviceName].boot()
            }
        }
    }
}
