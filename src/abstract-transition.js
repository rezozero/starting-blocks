import Utils from './utils/utils';
import log from "loglevel";

export default class AbstractTransition {
    constructor() {
        this.oldContainer = undefined;
        this.newContainer = undefined;
        this.newContainerLoading = undefined;
    }

    init(oldContainer, newContainer) {
        this.oldContainer = oldContainer;
        this._newContainerPromise = newContainer;

        this.deferred = Utils.deferred();
        this.newContainerReady = Utils.deferred();
        this.newContainerLoading = this.newContainerReady.promise;

        this.start();

        this._newContainerPromise.then(newContainer => {
            this.newContainer = newContainer;
            this.newContainerReady.resolve();
        });

        return this.deferred.promise;
    }

    done() {
        this.newContainer.css('visibility', 'visible');
        this.deferred.resolve();
    }

    start() {}
};
