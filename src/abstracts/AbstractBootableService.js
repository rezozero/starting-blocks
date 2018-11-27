/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractBootableService.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import AbstractService from './AbstractService'

export default class AbstractBootableService extends AbstractService {
    boot () {
        console.debug(`${this.serviceName} boot`)
    }
}
