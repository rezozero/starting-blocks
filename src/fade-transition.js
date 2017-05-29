import AbstractTransition from './abstract-transition'

export default class FadeTransition extends AbstractTransition {
    constructor () {
        super()
    }

    start () {
        Promise.all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this))
    }

    fadeIn () {
        this.oldContainer.hide()
        this.newContainer.css({
            visibility : 'visible',
            opacity : 0
        });

        this.newContainer.animate({ opacity: 1 }, 400, () => {
            document.body.scrollTop = 0
            this.done()
        });
    }

    fadeOut () {
        return new Promise((resolve) => {
            this.oldContainer.animate({
                opacity: 0
            }, 400, 'swing', resolve);
        })
    }
}
