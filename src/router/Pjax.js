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
 * @file Pjax.js
 * @author Adrien Scholaert
 */

import Utils from '../utils/Utils'

/**
 * Pjax is a static object with main function
 * @type {Object}
 */
export default class Pjax {
    constructor (history, dom, cache, transitionFactory, { ignoreClassLink = 'no-ajax-link' } = {}) {
        this.history = history
        this.dom = dom
        this.cache = cache
        this.transitionFactory = transitionFactory

        /**
         * Indicate wether or not use the cache
         *
         * @type {Boolean}
         * @default
         */
        this.cacheEnabled = true

        /**
         * Class name used to ignore links
         *
         * @type {String}
         * @default
         */
        this.ignoreClassLink = ignoreClassLink

        /**
         * Latest HTMLElement clicked
         *
         * @type {HTMLElement}
         */
        this.lastElementClicked = null

        /**
         * Indicate if there is an animation in progress
         *
         * @readOnly
         * @type {Boolean}
         */
        this.transitionProgress = false
    }

    /**
     * Init the events
     *
     * @private
     */
    init () {
        const container = this.dom.getContainer()
        const wrapper = this.dom.getWrapper()

        wrapper.setAttribute('aria-live', 'polite')

        this.history.add(
            this.getCurrentUrl(),
            this.dom.getNamespace(container)
        )

        this.bindEvents()
    }

    /**
     * Attach the eventlisteners
     *
     * @private
     */
    bindEvents () {
        this.onLinkClick = this.onLinkClick.bind(this)
        this.onStateChange = this.onStateChange.bind(this)

        document.addEventListener('click', this.onLinkClick)
        window.addEventListener('popstate', this.onStateChange)
    }

    /**
     * Return the currentURL cleaned
     *
     * @return {String} currentUrl
     */
    getCurrentUrl () {
        // TODO, clean from what? currenturl do not takes hash..
        return Utils.cleanLink(
            Utils.getCurrentUrl()
        )
    }

    /**
     * Change the URL with pushstate and trigger the state change
     *
     * @param {String} url
     */
    goTo (url) {
        window.history.pushState(null, null, url)
        this.onStateChange()
    }

    /**
     * Force the browser to go to a certain url
     *
     * @param {String} url
     * @private
     */
    forceGoTo (url) {
        window.location = url
    }

    /**
     * Load an url, will start an ajax request or load from the cache
     *
     * @private
     * @param  {String} url
     * @return {Promise}
     */
    load (url) {
        const deferred = Utils.deferred()

        let request = this.cache.get(url)

        if (!request) {
            request = Utils.request(url)
            this.cache.set(url, request)
        }

        request.then(data => {
            const container = this.dom.parseResponse(data)

            this.dom.putContainer(container)

            if (!this.cacheEnabled) { this.cache.reset() }

            deferred.resolve(container)
        })
            .catch(() => {
                this.forceGoTo(url)
                deferred.reject()
            })

        return deferred.promise
    }

    /**
     * Get the .href parameter out of an element
     * and handle special cases (like xlink:href)
     *
     * @private
     * @param  {HTMLElement} el
     * @return {String} href
     */
    getHref (el) {
        if (!el) {
            return undefined
        }

        if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
            return el.getAttribute('xlink:href')
        }

        if (typeof el.href === 'string') {
            return el.href
        }

        return undefined
    }

    /**
     * Callback called from click event
     *
     * @private
     * @param {MouseEvent} evt
     */
    onLinkClick (evt) {
        /**
         * @type {HTMLElement}
         */
        let el = evt.target

        // Go up in the nodelist until we
        // find something with an href
        while (el && !this.getHref(el)) {
            el = el.parentNode
        }

        if (this.preventCheck(evt, el)) {
            evt.stopPropagation()
            evt.preventDefault()

            this.lastElementClicked = el
            this.linkHash = el.hash.split('#')[1]

            const href = this.getHref(el)
            this.goTo(href)
        }
    }

    /**
     * Determine if the link should be followed
     *
     * @param  {MouseEvent} evt
     * @param  {HTMLElement} element
     * @return {Boolean}
     */
    preventCheck (evt, element) {
        if (!window.history.pushState) { return false }

        const href = this.getHref(element)

        // User
        if (!element || !href) { return false }

        // Middle click, cmd click, and ctrl click
        if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) { return false }

        // Ignore target with _blank target
        if (element.target && element.target === '_blank') { return false }

        // Check if it's the same domain
        if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) { return false }

        // Check if the port is the same
        if (Utils.getPort() !== Utils.getPort(element.port)) { return false }

        // Ignore case when a hash is being tacked on the current URL
        // if (href.indexOf('#') > -1)
        //   return false;

        // Ignore case where there is download attribute
        if (element.getAttribute && typeof element.getAttribute('download') === 'string') { return false }

        // In case you're trying to load the same page
        if (Utils.cleanLink(href) === Utils.cleanLink(window.location.href)) { return false }

        if (element.classList.contains(this.ignoreClassLink)) { return false }

        return true
    }

    /**
     * Return a transition object
     *
     * @param  {object} prev historyManager
     * @param  {object} current historyManager
     * @return {AbstractTransition} Transition object
     */
    getTransition (prev, current) {
        return this.transitionFactory.getTransition(prev, current)
    }

    /**
     * Method called after a 'popstate' or from .goTo()
     *
     * @private
     */
    onStateChange () {
        const newUrl = this.getCurrentUrl()

        if (this.transitionProgress) { this.forceGoTo(newUrl) }

        if (this.history.currentStatus().url === newUrl) { return false }

        this.history.add(newUrl)

        const newContainer = this.load(newUrl)
        const transition = this.getTransition(
            this.history.prevStatus(),
            this.history.currentStatus()
        )

        this.transitionProgress = true

        const transitionInstance = transition.init(
            this.dom.getContainer(),
            newContainer
        )

        newContainer.then(
            this.onNewContainerLoaded.bind(this)
        )

        transitionInstance.then(
            this.onTransitionEnd.bind(this)
        )
    }

    /**
     * Function called as soon the new container is ready
     *
     * @private
     * @param {HTMLElement} container
     */
    onNewContainerLoaded (container) {
        const currentStatus = this.history.currentStatus()
        currentStatus.namespace = this.dom.getNamespace(container)
    }

    /**
     * Function called as soon the transition is finished
     *
     * @private
     */
    onTransitionEnd () {
        this.transitionProgress = false

        if (this.linkHash) {
            window.location.hash = ''
            window.location.hash = this.linkHash

            this.linkHash = null
        }
    }
}
