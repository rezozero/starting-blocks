(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["block-2"],{

/***/ "./examples/src/js/api/Api.js":
/*!************************************!*\
  !*** ./examples/src/js/api/Api.js ***!
  \************************************/
/*! exports provided: getData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/config */ "./examples/src/js/config/config.js");


/*
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
 * @file Api.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

async function getData(sourceUrl, params = {}) {
  const url = new URL(sourceUrl);

  const mergedParams = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, params, {
    access_token: _config_config__WEBPACK_IMPORTED_MODULE_1__["default"].token
  });

  Object.keys(mergedParams).forEach(key => url.searchParams.append(key, mergedParams[key]));
  const result = await window.fetch(url.toString());
  const json = await result.json();
  return json;
}

/***/ }),

/***/ "./examples/src/js/blocks/UsersBlock.js":
/*!**********************************************!*\
  !*** ./examples/src/js/blocks/UsersBlock.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UsersBlock; });
/* harmony import */ var starting_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! starting-blocks */ "./dist/main.esm.js");
/* harmony import */ var _api_Api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/Api */ "./examples/src/js/api/Api.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ "./examples/src/js/utils/utils.js");
/*
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
 * @file UsersBlock.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */



class UsersBlock extends starting_blocks__WEBPACK_IMPORTED_MODULE_0__["AbstractBlock"] {
  async init() {
    super.init(); // Elements

    this.avatarContainer = this.container.querySelectorAll('.avatar-cont')[0];
    this.contributorsListingContainer = this.container.querySelectorAll('.usersblock__contributors-list')[0]; // Values

    this.data = null;
    this.owner = null;
    this.contributors = [];
    this.initialUrl = 'https://api.github.com/repos/rezozero/starting-blocks'; // Init request

    this.data = await _api_Api__WEBPACK_IMPORTED_MODULE_1__["getData"](this.initialUrl);
    this.fillData(this.data);
  }

  initEvents() {
    return super.initEvents();
  }

  destroy() {
    return super.destroy();
  }

  destroyEvents() {
    return super.destroyEvents();
  }

  async fillData() {
    if (!this.data) return;
    this.contributors = await _api_Api__WEBPACK_IMPORTED_MODULE_1__["getData"](this.data.contributors_url);
    this.owner = this.data.owner;
    this.setAvatar();
    this.setContributors();
  }

  setContributors() {
    for (let contributor of this.contributors) {
      const tpl = `
                <div class="col">
                    <div class="media text-muted pt-3">
                        <img data-src="${contributor.avatar_url}" alt="@${contributor.login}"
                             class="mr-2 rounded lazyload" style="width: 64px; height: 64px;"
                             src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_161c2d21760%20text%20%7B%20fill%3A%23e83e8c%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_161c2d21760%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23e83e8c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2212.3046875%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                             data-holder-rendered="true">
                        <div class="media-body">
                            <h6 class="mt-0">@${contributor.login}</h6>
                            <p class="media-body pb-3 mb-0 small lh-125 border-gray">
                                Contributions: ${contributor.contributions}<br>
                                <a href="${contributor.html_url}" target="_blank">See more</a>
                            </p>
                        </div>
                    </div>
                </div>`;
      this.contributorsListingContainer.insertAdjacentHTML('afterbegin', tpl);
    }

    this.page.updateLazyload();
  }

  async setAvatar() {
    if (!this.owner.avatar_url) return;
    const img = await _utils_utils__WEBPACK_IMPORTED_MODULE_2__["loadImage"](this.owner.avatar_url);
    img.classList.add('img-thumbnail');
    this.avatarContainer.appendChild(img);
  }

  onResize() {
    return super.onResize();
  }

  onLoad() {
    return super.onLoad();
  }

  onPageReady() {
    return super.onPageReady();
  }

}

/***/ }),

/***/ "./examples/src/js/config/config.js":
/*!******************************************!*\
  !*** ./examples/src/js/config/config.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
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
 * @file config.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  token: '754e1aa9e2f39ea8d234a2f51002362310b058c2'
});

/***/ }),

/***/ "./examples/src/js/utils/utils.js":
/*!****************************************!*\
  !*** ./examples/src/js/utils/utils.js ***!
  \****************************************/
/*! exports provided: loadImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
/*
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
 * @file utils.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
function loadImage(url) {
  return new Promise(resolve => {
    const imageElement = new window.Image();
    imageElement.addEventListener('load', () => {
      resolve(imageElement);
    });
    imageElement.src = url;
  });
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectSpread.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectSpread.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ })

}]);