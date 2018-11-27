/**
 * @file Lazyload.js
 * @author Adrien Scholaert
 */

import AbstractBootableService from '../abstracts/AbstractBootableService'
import 'lazysizes'

export default class Lazyload extends AbstractBootableService {
    constructor (container) {
        super(container, 'LazyLoad')
    }
}
