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
 * @file StatesStack.js
 * @author Quentin Neyraud
 * @author Adrien Scholaert
 */

/**
 * StatesStack manager.
 */
export default class StatesStack {
    /**
     * Create a new StatesStack manager
     */
    constructor () {
        this.stack = []
        this.currentStackIndex = 0
    }

    /**
     * push the new state to the stack
     * @param {State} state
     */
    push (state) {
        this.stack.push(state)
        this.currentStackIndex = this.stack.length - 1
    }

    /**
     * Get navigation direction on pop state events
     * @param {State} currentState
     * @returns {string}
     */
    getDirection (currentState) {
        const newStackIndex = this.stack.findIndex(state => state.uid === currentState.uid)
        let direction = 'forward'

        if (newStackIndex - this.currentStackIndex < 0) {
            direction = 'back'
        }

        this.currentStackIndex = newStackIndex
        return direction
    }
}
