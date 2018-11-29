# Starting blocks

Starting Blocks is a framework for ajax page, transitions and blocks written in vanilla JS, 
made by [Rezo Zero](https://www.rezo-zero.com/).

[![npm](https://img.shields.io/npm/l/starting-blocks.svg)](https://www.npmjs.com/package/starting-blocks)
[![npm](https://img.shields.io/npm/v/starting-blocks.svg)](https://www.npmjs.com/package/starting-blocks)
[![Build Status](https://travis-ci.org/rezozero/starting-blocks.svg?branch=master)](https://travis-ci.org/rezozero/starting-blocks)
![64kB size](https://img.shields.io/badge/Size-64kB-green.svg)

- [Adrien Scholaert](https://github.com/Gouterman)
- [Ambroise Maupate](https://github.com/ambroisemaupate)
- [Quentin Neyraud](https://github.com/quentinneyraud)
- [Maxime Bérard](https://github.com/maximeberard)

## Features

- Pjax : ajax + push state
- Transition manager : enhance your website with page transitions
- Blocks : dynamic interactive sections (map, slideshow, canvas...)

And more...

- Image lazy loader
- In view detection
- Splash screen
- Prefetch
- Cache

## Install with Yarn or NPM

```shell
yarn add starting-blocks
```

```shell
npm install starting-blocks --save
```

## Usage

*Starting Blocks* is bundled with *NPM* in order to use *ES6* `import` syntax.
We highly recommend to use a module bundler and to write your code in es6 syntax. If you use a module bundler like
**Webpack**, it will be able to remove dead code (when a *Starting Blocks* service is not use), 
just use the *curly brace* syntax.

Minimal configuration :
```js
import StartingBlocks from 'starting-blocks'

// Instantiate starting blocks
const startingBlocks = new StartingBlocks({
    // ...options
})

// Boot
startingBlocks.boot()
```

## Services

*Starting Blocks* use dependency injection
You can use or provide some services to enhance your website :

| Service name | Init type | Ready to use | Dependencies | Description
| --- | --- | --- | --- | --- |
| `Pjax` | `bootableProvider` | true | `History` | Enable ajax navigation with push state
| `History` | `provider` | true | | | Helps to keep track of the navigation
| `Prefetch` | `bootableProvider` | true | `Pjax` | Prefetch links on mouse enter (useful with `Pjax`)
| `CacheProvider` | `provider` | true |  | Cache ajax requests (useful with `Pjax`)
| `Lazyload` | `bootableProvider` | true |  | Lazy load images
| `Splashscreen` | `bootableProvider` | false | | Add a splash screen for the first init
| `TransitionFactory` | `bootableProvider` | false |  | Manage your page transitions

#### Pjax

```js
import StartingBlocks, { History, Pjax } from 'starting-blocks'

// ...Instantiate starting blocks

// Add service
startingBlocks.provider('History', History)
startingBlocks.bootableProvider('Pjax', Pjax)

// ...Boot
```

**Warning :** don't forget to structure your DOM and to add specific data attributes, see [this section](#a-js-router-made-to-work-with-html-partial-responses)

#### Lazyload

#### Splashscreen

#### TransitionFactory

## A JS router made to work with HTML partial responses

This ES6 javascript router has been designed to handle as well complete HTML responses as
*partial* HTML responses to lighten backend process and bandwidth.
One of the most recurrent variable or member: `rootElement` is always referring to the current page’ main-section.
This is the DOM section which is extracted at the end of each complete AJAX requests. When it detects that AJAX
response is *partial* it directly initialize `rootElement` with the whole response data. Every new AJAX response will
be appended in the `#ajax-container` HTML section in order to smooth transitions between pages.

When `Pjax` service is used and `window.fetch` is supported, **all links inside document body** are listened to load pages asynchronously and make transitions.

To declare a partial DOM section as the `rootElement` you must add some classes and
data to your HTML tags.

```html
<div id="page-content-home"
     class="page-content page-content-ajax"
     data-node-type="HomePage"
     data-node-name="home"
     data-is-home="1"
     data-meta-title="Home page">
</div>
```

- `id` *attribute* is obviously mandatory as it will be used to update your navigation and some other parts of your website. **Make sure that your ID is not equals to your `data-node-name`.**
- `page-content` *class* is essential in order to extract your DOM section during AJAX request. You can customize this class name in options (`pageClass: "page-content"`).
- `data-node-type` *attribute* will be used to *route* your section to the corresponding JS class (in this example: HomePage.js). **Every route class must extends the `AbstractPage` class**. Then you have to declare your routes in the your *Starting Blocks* instance via `instanceFactory` method.
- `data-node-name` is used to name your page object **and to rename body class and ID after it.**
- `data-is-home` 0 or 1
- `data-meta-title` *attribute* will be used to change your new page *title* (`document.title`), it can be used in other cases such as some social network modules which require a clean page-title.

You’ll find `index.html` and `page1.html` examples files. You can even test them
by spawning a simple server with `npm run serve` command.
Then go to your favorite browser and type `http://localhost:8080`.

### Router dependencies

A Router needs:

- an options object in order to override default configuration with important parameters such as:
    - a `ClassFactory` object to link all `data-node-type` value to their *ES6* classes (you must import each class you’ll declare in your routes). You‘ll have to redefine a `ClassFactory` for each project you begin with *Starting Blocks*.
    - a `GraphicLoader` or extending class instance in order to trigger `show` or `hide` during AJAX requests.
    - a `TransitionFactory` object to link all `data-transition` value to their *ES6* classes.

You can look at the `example/src/app.js` file to see an instantiation example with few parameters.

### Router options

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| ajaxEnabled | boolean | true | |
| pageClass | string | 'page-content' | |
| ajaxWrapperId | string | 'sb-wrapper' | |
| objectTypeAttr | string | 'data-node-type' | |
| noAjaxLinkClass | string | 'no-ajax-link' | |
| noPrefetchLinkClass | string | 'no-prefetch' | |
| pageBlockClass | string | '.page-block' | (with point) |
| lazyloadEnabled | boolean | false | |
| workerEnabled | boolean | false | |
| prefetchEnabled | boolean | true | |
| lazyloadSrcAttr | string | 'data-src' | |
| lazyloadClass | string | 'lazyload' | |
| lazyloadSrcSetAttr | string | 'data-srcset' | |
| lazyloadThreshold | number | 300 | Lazyload treshold |
| lazyloadThrottle | number | 150 | Duration of lazyload throttle |
| useCache | boolean | true | |
| classFactory | ClassFactory | ClassFactory | |
| graphicLoader | GraphicLoader | GraphicLoader | |
| transitionFactory | TransitionFactory | TransitionFactory | |

### Pages overridable methods

| Method | Description |
| --- | --- |
| `onLoad` | Called when all images and page are loaded. |
| `showEnded` | After show animation ended. |
| `onResize` | On viewport resize, this method is debounced. |
| `beforeLazyload` | Called before init lazyload images. |
| `onLazyImageSet` | After a lazyloaded image src switched. |
| `onLazyImageLoad` | After a lazyloaded image loaded. |
| `onLazyImageProcessed` | Before lazyload. |

### Block overridable methods

| Method | Description |
| --- | --- |
| `onLoad` | Called when all block images are loaded. |
| `onResize` | On viewport resize, this method is debounced. |
| `onPageReady` | Called once all page blocks have been created. |

### Events

| Const name | Event name | Description |
| --- | --- | --- |
| `BEFORE_PAGE_LOAD` | `SB_BEFORE_PAGE_LOAD` | Before Router initialize XHR request to load new page. |
| `AFTER_PAGE_LOAD` | `SB_AFTER_PAGE_LOAD` | After `window.fetch` XHR request succeeded. |
| `AFTER_DOM_APPENDED` | `SB_AFTER_DOM_APPENDED` | After Router appended new page DOM to `ajaxWrapperId`. |
| `AFTER_PAGE_BOOT` | `SB_AFTER_PAGE_BOOT` | After Router create new page instance. |
| `BEFORE_PAGE_SHOW` | `SB_BEFORE_PAGE_SHOW` | Before page begins to show, right after assets are loaded (images). |
| `AFTER_PAGE_SHOW` | `SB_AFTER_PAGE_SHOW` | After page showed. |
| `BEFORE_PAGE_HIDE` | `SB_BEFORE_PAGE_HIDE` | Before page begins to hide. *Be careful, this event must be triggered manually if hide() method is overriden.* |
| `AFTER_PAGE_HIDE` | `SB_AFTER_PAGE_HIDE` | After page hiding animation. *Be careful, this event must be triggered manually if hide() method is overriden.* |

⚠️ For those who use 2.1.7, we prefix events to avoid possible conflict with other libraries.

### Transitions

When AJAX navigation is enabled, transitions are used to manage animations between pages.

To manage transitions, you can set `data-transition` attribute with a name on each link.

```html
<a href="/contact" data-transition="fade">Contact</a>
```

Then, create a **TransitionFactory** class and pass it to the **Router** instance.
In this class, implement `getTransition (previousState, state, direction = null)` method.
This method is called on each transition and give you access to state informations :

- `previousState` and `state`
    - **transitionName** : `data-transition` attributes of the clicked link
    - **context** : equal to `"history"`, `"link"`

Example:
```javascript
// src/factories/TransitionFactory.js

import DefaultTransition from './transitions/DefaultTransition';
import FadeTransition from './transitions/FadeTransition';

export default class TransitionFactory {
    getTransition (previousState, state) {
        let transition = null

        switch (state.transitionName) {
            case 'fade':
                transition = new FadeTransition()
                break
            default:
                transition = new DefaultTransition()
                break
        }

        return transition
    }
}
```

To create a new transition you need to create a new class extending `AbstractTransition`. Implement `start()` method and use Promises to manages your animations.
⚠️ You have to wait for `this.newPageLoading` promise resolution to make sure the new page is accessible.
Then, you have access to old and new Page instances.

Example with fade animation:

```javascript
// src/transitions/FadeTransition.js

import AbstractTransition from '../AbstractTransition'

/**
 * Fade Transition class example. Fade Out / Fade In content.
 */
export default class FadeTransition extends AbstractTransition {
    /**
     * Entry point of the animation
     * Automatically called on init()
     */
    start () {
        // Wait new content and the end of fadeOut animation
        // this.newPageLoading is a Promise which is resolved when the new content is loaded
        Promise.all([this.newPageLoading, this.fadeOut()])
            // then fadeIn the new content
            .then(this.fadeIn.bind(this))
    }

    /**
     * Fade out the old content.
     * @returns {Promise}
     */
    fadeOut () {
        return new Promise((resolve) => {
            this.oldPage.$cont.animate({
                opacity: 0
            }, 400, 'swing', resolve)
        })
    }

    /**
     * Fade in the new content
     */
    fadeIn () {
        // Add display: none on the old container
        this.oldPage.$cont.hide()

        // Prepare new content css properties for the fade animation
        this.newPage.$cont.css({
            visibility: 'visible',
            opacity: 0
        })

        // fadeIn the new content container
        this.newPage.$cont.animate({ opacity: 1 }, 400, () => {
            document.body.scrollTop = 0
            // IMPORTANT: Call this method at the end
            this.done()
        })
    }
}
```

## Docs

To generate documentation, you’ll at least NodeJS v4.4 and to install ESDoc.

```bash
npm run doc;
```

Documentation will be available in `doc/` folder.

## Naming conventions

We drop jQuery in Starting-blocks v5 and change variables names and use some conventions.
We suffix every `DOMElement` variable with `Element`, `Container`, `Elements` or `Containers`.

Examples:
```js
let mainContainer = document.getElementById('main-container')
let imageContainer = document.getElementById('image-container')
let imageElements = imageContainer.querySelectorAll('.image')
```

## Improving Starting blocks

To work locally on *Starting blocks*, we provided some HTML example files.

- Install dependencies: `yarn`.
- Type `npm run dev` to improve Starting blocks locally.
- Type `npm run build` to optimize project in one file as: `main.js`.
- Type `npm run demo` to build demo project in `examples/` folder.

### Compatibility

Don't forget to use some polyfill for 

### Demo

To launch the example you need to change the `examples/srv/js/config/config.example.js` file with your own information.
