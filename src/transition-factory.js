import DefaultTransition from './default-transition'
import FadeTransition from './fade-transition'

export default class TransitionFactory {

    /**
     * Get Transition
     *
     * @param {Object} previousState
     * @param {Object} state
     * @param {String} direction ('back' or 'forward')
     * @returns {FadeTransition}
     */
    getTransition (previousState, state, direction = null) {
        if (previousState && previousState.context === 'history') {
            if (previousState.transitionName === 'fade') {
                return new FadeTransition()
            }
        }

        switch (state.transitionName) {
            case 'fade':
                return new FadeTransition()
                break
            default:
                return new FadeTransition()
                break
        }
    }
}
