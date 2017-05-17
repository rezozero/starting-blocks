/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file event-types.js
 * @author Ambroise Maupate
 */

/**
 * Before Router initialize XHR request to load new page.
 *
 * @type {String}
 */
export const BEFORE_PAGE_LOAD = 'BEFORE_PAGE_LOAD';

/**
 * After Router XHR request succeded.
 *
 * @type {String}
 */
export const AFTER_PAGE_LOAD = 'AFTER_PAGE_LOAD';


/**
 * After Router appended new page DOM to page-container.
 *
 * @type {String}
 */
export const AFTER_DOM_APPENDED = 'AFTER_DOM_APPENDED';

/**
 * After Router create new page instance.
 *
 * @type {String}
 */
export const AFTER_PAGE_BOOT = 'AFTER_PAGE_BOOT';

/**
 * Before page begins to show, right after assets are loaded (images).
 *
 * @type {String}
 */
export const BEFORE_PAGE_SHOW = 'BEFORE_PAGE_SHOW';

/**
 * After page showed.
 *
 * @type {String}
 */
export const AFTER_PAGE_SHOW = 'AFTER_PAGE_SHOW';

/**
 * Before page begins to hide.
 * Be careful, this must be triggered manually if hide() method is overriden.
 *
 * @type {String}
 */
export const BEFORE_PAGE_HIDE = 'BEFORE_PAGE_HIDE';

/**
 * After page hidind animation.
 * Be careful, this must be triggered manually if hide() method is overriden.
 *
 * @type {String}
 */
export const AFTER_PAGE_HIDE = 'AFTER_PAGE_HIDE';

