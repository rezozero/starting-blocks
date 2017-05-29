import DefaultTransition from './default-transition'
import FadeTransition from './fade-transition'

export default class TransitionFactory {
    getTransition (previousState, state) {
        console.log(previousState, state)
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
