/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractTransitionFactory.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import AbstractService from './AbstractService'

/**
 * Abstract Transition mapper class.
 *
 * This class maps your `data-transition` with your *ES6* classes.
 *
 * **You must define your own ClassFactory for each of your projects.**.
 * @abstract
 */
export default class AbstractTransitionFactory extends AbstractService {
    /**
     * Get Transition
     *
     * @param {Object} previousState
     * @param {Object} state
     * @returns {AbstractTransition}
     * @abstract
     */
    getTransition (previousState, state) {}
}
