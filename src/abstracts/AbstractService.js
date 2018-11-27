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
        this.container = container
        this.serviceName = serviceName

        console.debug(`${serviceName} awake`)
        this.checkDependencies(dependencies)
    }

    init () {}

    hasService (serviceName) {
        return this.container.hasOwnProperty(serviceName)
    }

    checkDependencies (dependencies = []) {
        for (const serviceName of dependencies) {
            if (!this.hasService(serviceName)) {
                throw new DependencyNotFulfilledException(this.serviceName, serviceName)
            }
        }
    }

    getService (serviceName) {
        if (!this.hasService(serviceName)) {
            throw new UnknownServiceException(serviceName)
        }

        return this.container[serviceName]
    }
}
