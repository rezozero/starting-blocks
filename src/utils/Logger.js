/*
 * Copyright © 2017, Rezo Zero
 *
 * @file debug.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

export function log (...args) {
    if (window.startingBlocksDebugLevel === 1) {
        console.log('[SB]', ...args)
    }
}

export function debug (message, color = '') {
    if (window.startingBlocksDebugLevel === 1) {
        console.debug(`%c[SB] %c${message}`, 'color:#749f73', 'color:debug', color)
    }
}

export function info (...args) {
    if (window.startingBlocksDebugLevel === 1) {
        console.info('[SB]', ...args)
    }
}

export function warn (...args) {
    if (window.startingBlocksDebugLevel === 1) {
        console.warn('[SB]', ...args)
    }
}

export function error (...args) {
    if (window.startingBlocksDebugLevel === 1) {
        console.error('[SB]', ...args)
    }
}
