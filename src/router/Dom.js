export default class Dom {
    constructor ({ dataNamespace = 'namespace', wrapperId = 'sb-wrapper', containerClass = 'page-content' } = {}) {
        /**
         * The name of the data attribute on the container
         *
         * @type {String}
         * @default
         */
        this.dataNamespace = dataNamespace

        /**
         * Id of the main wrapper
         *
         * @type {String}
         * @default
         */
        this.wrapperId = wrapperId

        /**
         * Class name used to identify the containers
         *
         * @type {String}
         * @default
         */
        this.containerClass = containerClass

        /**
         * Full HTML String of the current page.
         * By default is the innerHTML of the initial loaded page.
         *
         * Each time a new page is loaded, the value is the response of the ajax call.
         *
         * @type {String}
         */
        this.currentHTML = document.documentElement.innerHTML
    }

    /**
     * Parse the responseText obtained from the ajax call
     *
     * @private
     * @param  {String} responseText
     * @return {HTMLElement}
     */
    parseResponse (responseText) {
        this.currentHTML = responseText

        const wrapper = document.createElement('div')
        wrapper.innerHTML = responseText

        const titleEl = wrapper.querySelector('title')

        if (titleEl) { document.title = titleEl.textContent }

        return this.getContainer(wrapper)
    }

    /**
     * Get the main wrapper by the ID `wrapperId`
     *
     * @return {HTMLElement} element
     */
    getWrapper () {
        const wrapper = document.getElementById(this.wrapperId)

        if (!wrapper) { throw new Error('Starting Blocks: Wrapper not found!') }

        return wrapper
    }

    /**
     * Get the container on the current DOM,
     * or from an HTMLElement passed via argument
     *
     * @private
     * @param  {HTMLElement} element
     * @return {HTMLElement}
     */
    getContainer (element) {
        if (!element) { element = document.body }

        if (!element) { throw new Error('Starting Blocks: DOM not ready!') }

        const container = this.parseContainer(element)

        if (!container) { throw new Error('Starting Blocks: no container found') }

        return container
    }

    /**
     * Get the namespace of the container
     *
     * @private
     * @param  {HTMLElement} element
     * @return {String}
     */
    getNamespace (element) {
        if (!element) {
            return null
        }

        return element.getAttribute(`data-${this.dataNamespace}`)
    }

    /**
     * Put the container on the page
     *
     * @private
     * @param  {HTMLElement} element
     */
    putContainer (element) {
        element.style.visibility = 'hidden'

        const wrapper = this.getWrapper()
        wrapper.appendChild(element)
    }

    /**
     * Get container selector
     *
     * @private
     * @param  {HTMLElement} element
     * @return {HTMLElement} element
     */
    parseContainer (element) {
        return element.querySelector(`.${this.containerClass}`)
    }
}
