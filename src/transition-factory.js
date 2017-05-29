import DefaultTransition from './default-transition'
import FadeTransition from './fade-transition'

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

        switch (state.transitionName) {
            case 'fade':
                return new FadeTransition()
                break
            default:
                return new DefaultTransition()
                break
        }
    }
}
