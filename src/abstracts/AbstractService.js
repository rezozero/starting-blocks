/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractService.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import UnknownServiceException from '../errors/UnknownServiceException'
import DependencyNotFulfilledException from '../errors/DependencyNotFulfilledException'

export default class AbstractService {
    constructor (container = {}, serviceName = 'AbstractService', dependencies = ['Config']) {
        this._container = container
        this._serviceName = serviceName

        this.checkDependencies(dependencies)
    }

    init () {}

    hasService (serviceName) {
        return this._container.hasOwnProperty(serviceName)
    }

    checkDependencies (dependencies = []) {
        for (const serviceName of dependencies) {
            if (!this.hasService(serviceName)) {
                throw new DependencyNotFulfilledException(this._serviceName, serviceName)
            }
        }
    }

    getService (serviceName) {
        if (!this.hasService(serviceName)) {
            throw new UnknownServiceException(serviceName)
        }

        return this._container[serviceName]
    }

    get serviceName () {
        return this._serviceName
    }

    set serviceName (value) {
        this._serviceName = value
    }

    get container () {
        return this._container
    }

    set container (value) {
        this._container = value
    }
}
