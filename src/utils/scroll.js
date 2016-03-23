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
 * @file scroll.js
 * @author Ambroise Maupate
 */
export class Scroll {

    static _preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    static _keydown(e) {
        // left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        let keys = [37, 38, 39, 40, 33, 34, 35];
        for (let i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                Scroll._preventDefault(e);
                return;
            }
        }
    }

    static _wheel(e) {
        Scroll._preventDefault(e);
    }

    /**
     * Disable scroll.
     *
     * @return {void}
     */
    static disable() {
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', Scroll._wheel, false);
        }
        window.onmousewheel = document.onmousewheel = Scroll._wheel;
        document.onkeydown = Scroll._keydown;
    }

    /**
     * Enable scroll again.
     *
     * @return {void}
     */
    static enable() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', Scroll._wheel, false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }
}
