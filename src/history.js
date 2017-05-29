export default class History {
    constructor () {
        this.statesStack = []
        this.currentHistoryIndex = 0
    }

    initEvents () {
    }

    pushState (state) {
        this.statesStack.push(state)
        this.currentHistoryIndex = this.statesStack.length - 1
    }

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
