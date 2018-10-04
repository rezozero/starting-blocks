webpackJsonp([1],{

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _startingBlocks = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Permission is hereby granted, free of charge, to any person obtaining a copy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of this software and associated documentation files (the "Software"), to deal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * in the Software without restriction, including without limitation the rights
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * copies of the Software, and to permit persons to whom the Software is furnished
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * to do so, subject to the following conditions:
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Except as contained in this notice, the name of the ROADIZ shall not
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * be used in advertising or otherwise to promote the sale, use or other dealings
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file DefaultBlock.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Adrien Scholaert <adrien@rezo-zero.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DefaultBlock = function (_AbstractBlock) {
    _inherits(DefaultBlock, _AbstractBlock);

    function DefaultBlock() {
        _classCallCheck(this, DefaultBlock);

        return _possibleConstructorReturn(this, (DefaultBlock.__proto__ || Object.getPrototypeOf(DefaultBlock)).apply(this, arguments));
    }

    _createClass(DefaultBlock, [{
        key: 'init',
        value: function init() {
            return _get(DefaultBlock.prototype.__proto__ || Object.getPrototypeOf(DefaultBlock.prototype), 'init', this).call(this);
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            return _get(DefaultBlock.prototype.__proto__ || Object.getPrototypeOf(DefaultBlock.prototype), 'initEvents', this).call(this);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            return _get(DefaultBlock.prototype.__proto__ || Object.getPrototypeOf(DefaultBlock.prototype), 'destroy', this).call(this);
        }
    }, {
        key: 'destroyEvents',
        value: function destroyEvents() {
            return _get(DefaultBlock.prototype.__proto__ || Object.getPrototypeOf(DefaultBlock.prototype), 'destroyEvents', this).call(this);
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            return _get(DefaultBlock.prototype.__proto__ || Object.getPrototypeOf(DefaultBlock.prototype), 'onResize', this).call(this);
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            return _get(DefaultBlock.prototype.__proto__ || Object.getPrototypeOf(DefaultBlock.prototype), 'onLoad', this).call(this);
        }
    }, {
        key: 'onPageReady',
        value: function onPageReady() {
            return _get(DefaultBlock.prototype.__proto__ || Object.getPrototypeOf(DefaultBlock.prototype), 'onPageReady', this).call(this);
        }
    }]);

    return DefaultBlock;
}(_startingBlocks.AbstractBlock);

exports.default = DefaultBlock;

/***/ })

});