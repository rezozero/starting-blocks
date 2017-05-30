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
 * @file TransitionFactory.js
 * @author Quentin Neyraud
 * @author Adrien Scholaert
 */
import DefaultTransition from './transitions/default-transition'
import FadeTransition from './transitions/fade-transition'

/**
 * Transition mapper class.
 *
 * This class maps your `data-transition` with your *ES6* classes.
 *
 * **You must define your own ClassFactory for each of your projects.**.
 */
export default class TransitionFactory {
    /**
     * Get Transition
     *
     * @param {Object} previousState
     * @param {Object} state
     * @param {String} direction ('back' or 'forward')
     * @returns {AbstractTransition}
     */
    getTransition (previousState, state, direction = null) {
        /**
         * You can customise transition logic with the previousState, the new state
         * and the direction (back or forward)
         *
         * Ex: when back button its pressed and the previous animation was a FadeTransition
         * we use the DefaultTransition
         */
        if (previousState && previousState.context === 'history' && direction) {
            if (previousState.transitionName === 'fade' && direction === 'back') {
                return new DefaultTransition()
            }
        }

        let transition

        switch (state.transitionName) {
        case 'fade':
            transition = new FadeTransition()
            break
        default:
            transition = new DefaultTransition()
            break
        }

        return transition
    }
}
