/**
 * @file PageBuilder.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */

import Dispatcher from '../dispatcher/Dispatcher'
import {
    AFTER_PAGE_BOOT,
    BEFORE_SPLASHSCREEN_HIDE,
    AFTER_SPLASHSCREEN_HIDE
} from '../types/EventTypes'
import AbstractBootableService from '../abstracts/AbstractBootableService'

/**
 * PageBuilder.
 */
export default class PageBuilder extends AbstractBootableService {
    constructor (container) {
        super(container, 'PageBuilder', ['Dom'])

        if (!window.location.origin) {
            window.location.origin = window.location.protocol + '//' + window.location.host
        }

        /**
         * Page instance
         * @type {(AbstractPage|null)}
         */
        this.page = null

        // Bind methods
        this.buildPage = this.buildPage.bind(this)
    }

    boot () {
        super.boot()

        // Build first page with static context
        this.buildPage(this.getService('Dom').getContainer(), 'static')
    }

    /**
     * Build a new page instance.
     *
     * @param {HTMLElement} rootElement
     * @param {String} context
     * @returns {AbstractPage|null}
     */
    async buildPage (rootElement, context = 'ajax') {
        let nodeTypeName = this.getService('Dom').getNodeType(rootElement)

        if (this.hasService(nodeTypeName)) {
            this.page = this.getService(nodeTypeName).instance()
        } else {
            nodeTypeName = 'AbstractPage'
            this.page = this.getService('AbstractPage').instance()
        }

        // Set some values
        this.page.type = nodeTypeName
        this.page.context = context
        this.page.id = rootElement.id
        this.page.rootElement = rootElement
        this.page.name = rootElement.hasAttribute('data-node-name') ? rootElement.getAttribute('data-node-name') : ''
        this.page.metaTitle = rootElement.hasAttribute('data-meta-title') ? rootElement.getAttribute('data-meta-title') : ''
        this.page.isHome = rootElement.getAttribute('data-is-home') === '1'

        await this.page.init()

        // Dispatch an event to inform that the new page is ready
        Dispatcher.commit(AFTER_PAGE_BOOT, this.page)

        if (this.hasService('Splashscreen') && !this.getService('Splashscreen').splashscreenHidden) {
            Dispatcher.commit(BEFORE_SPLASHSCREEN_HIDE, this.page)

            this.getService('Splashscreen')
                .hide()
                .then(() => {
                    Dispatcher.commit(AFTER_SPLASHSCREEN_HIDE, this.page)
                    this.getService('Splashscreen').splashscreenHidden = true
                })
        }

        return this.page
    }
}
