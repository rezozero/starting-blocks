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
 * @file history.js
 * @author Ambroise Maupate
 */

/**
 * History manager.
 */
export default class History {
    /**
     * Create a new history manager
     */
    constructor () {
        this.statesStack = []
        this.currentHistoryIndex = 0
    }

    /**
     * push the new state to the history
     * @param {State} state
     */
    pushState (state) {
        this.statesStack.push(state)
        this.currentHistoryIndex = this.statesStack.length - 1
    }

    /**
     * Get history direction on pop state events
     * @param {State} currentState
     * @returns {string}
     */
    getDirection (currentState) {
        const newHistoryIndex = this.statesStack.findIndex(state => state.uid === currentState.uid)
        let direction = 'forward'

        if (newHistoryIndex - this.currentHistoryIndex < 0) {
            direction = 'back'
        }

        this.currentHistoryIndex = newHistoryIndex
        return direction
    }
}
