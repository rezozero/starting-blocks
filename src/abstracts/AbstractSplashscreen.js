/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractSplashscreen.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import AbstractBootableService from './AbstractBootableService'

export default class AbstractSplashscreen extends AbstractBootableService {
    constructor (container, serviceName = 'AbstractSplashscreen') {
        super(container, serviceName)

        this.splashscreenHidden = false
    }

    hide () {
        return Promise.resolve()
    }
}
