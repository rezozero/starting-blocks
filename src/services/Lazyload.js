/**
 * @file Lazyload.js
 * @author Adrien Scholaert
 */

import AbstractBootableService from '../abstracts/AbstractBootableService'
import 'lazysizes'
import { debug } from '../utils/Logger'

export default class Lazyload extends AbstractBootableService {
    constructor (container, serviceName = 'LazyLoad') {
        super(container, serviceName)

        debug(`☕️ ${serviceName} awake`)
    }
}
