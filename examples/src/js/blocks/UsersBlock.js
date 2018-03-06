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

import { AbstractBlock } from 'starting-blocks'
import * as Api from '../api/Api'
import * as Utils from '../utils/utils'

export default class UsersBlock extends AbstractBlock {
    async init () {
        super.init()

        // Elements
        this.avatarContainer = this.container.querySelectorAll('.avatar-cont')[0]
        this.contributorsListingContainer = this.container.querySelectorAll('.usersblock__contributors-list')[0]

        // Values
        this.data = null
        this.owner = null
        this.contributors = []
        this.initialUrl = 'https://api.github.com/repos/rezozero/starting-blocks'

        // Init request
        this.data = await Api.getData(this.initialUrl)
        this.fillData(this.data)
    }

    initEvents () {
        return super.initEvents()
    }

    destroy () {
        return super.destroy()
    }

    destroyEvents () {
        return super.destroyEvents()
    }

    async fillData () {
        if (!this.data) return

        this.contributors = await Api.getData(this.data.contributors_url)
        this.owner = this.data.owner

        this.setAvatar()
        this.setContributors()
    }

    setContributors () {
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
                </div>`

            this.contributorsListingContainer.insertAdjacentHTML('afterbegin', tpl)
        }

        this.page.updateLazyload()
    }

    async setAvatar () {
        if (!this.owner.avatar_url) return
        const img = await Utils.loadImage(this.owner.avatar_url)
        img.classList.add('img-thumbnail')
        this.avatarContainer.appendChild(img)
    }

    onResize () {
        return super.onResize()
    }

    onLoad () {
        return super.onLoad()
    }

    onPageReady () {
        return super.onPageReady()
    }
}
