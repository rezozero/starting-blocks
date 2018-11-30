
/*
 * Copyright © 2017, Rezo Zero
 *
 * @file UnknownServiceException.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

export default class UnknownServiceException extends Error {
    constructor (id) {
        super(`Service "${id}" is not defined`)
        this.name = `UnknownServiceException`
    }
}
