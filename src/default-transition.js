import AbstractTransition from './abstract-transition'

export default class DefaultTransition extends AbstractTransition {
    constructor () {
        super()
    }

    start () {
        Promise.all([this.newContainerLoading])
            .then(this.finish.bind(this))
    }

    finish () {
        document.body.scrollTop = 0
        this.done()
    }
}
