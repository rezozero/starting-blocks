# Starting Blocks

*Starting Blocks* is a framework for ajax page, transitions and blocks written in vanilla JS, 
made by [Rezo Zero](https://www.rezo-zero.com/).

[![npm](https://img.shields.io/npm/l/starting-blocks.svg)](https://www.npmjs.com/package/starting-blocks)
[![npm](https://img.shields.io/npm/v/starting-blocks.svg)](https://www.npmjs.com/package/starting-blocks)
[![Build Status](https://travis-ci.org/rezozero/starting-blocks.svg?branch=master)](https://travis-ci.org/rezozero/starting-blocks)

* [Features](#features)
* [Install with Yarn or NPM](#install-with-yarn-or-npm)
* [Usage](#usage)
* [Services](#services)
  - [Pjax](#pjax)
  - [Lazyload](#lazyload)
  - [Splashscreen](#splashscreen)
  - [TransitionFactory](#transitionfactory)
* [DOM structure](#dom-structure)
* [Page](#page)
  - [Page overridable methods](#page-overridable-methods)
* [Block](#block)
  - [Common block overridable methods](#common-block-overridable-methods)
  - [In view block overrivable methods](#in-view-block-overrivable-methods)
* [Options](#options)
* [Events](#events)
* [Docs](#docs)
* [Naming conventions](#naming-conventions)
* [Improving Starting Blocks](#improving-starting-blocks)
* [Compatibility](#compatibility)
* [Demo](#demo)
* [Go further with Starting Blocks](#go-further-with-starting-blocks)
* [Contributors](#contributors)

## Features

- *Pjax* : fetch pages and handling `History` state
- *Transition manager* : enhance your website with custom page transitions
- *Page/Blocks* pattern : build dynamic and interactive sections (map, slideshow, Ajax forms, canvas…)

And more...

- Image lazy-loader
- In view detection
- Splashscreen 
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

*Starting Blocks* is bundled with *NPM* in order to use native *ES6* `import` syntax.
We highly recommend to use a module bundler and to write your code in *ES6* syntax. If you use a bundler like
***Webpack***, it will be able to remove *dead code* (i.e. when a *Starting Blocks* service is not used) if you use *curly brace* syntax.

Minimal configuration :

```js
import StartingBlocks from 'starting-blocks'
import HomePage from './pages/HomePage'
import UsersBlock from './blocks/UsersBlock'

// Create a new Starting Blocks instance
const startingBlocks = new StartingBlocks({
    // ...options
})

// For each page or block sections: you must map the service name 
// with the data-node-type attribute (see DOM Structure section).
// «c» parameter stands for Starting-Blocks service container

// Register page services factory
startingBlocks.instanceFactory('HomePage', c => {
    return new HomePage(c)
})

// Register block services factory
startingBlocks.instanceFactory('UsersBlock', c => {
    return new UsersBlock(c)
})

// 🚀 Boot the whole thing
startingBlocks.boot()
```

## Services

*Starting Blocks* use a dependency injection container to delegate object creation and handle dependencies.
You can use or provide these standard services to enhance your website :

| Service name | Init type | Ready to use | Dependencies | Description
| --- | --- | --- | --- | --- |
| `Pjax` | `bootableProvider` | true | `History` | Enable Ajax navigation on all your website internal links
| `History` | `provider` | true | | | Helps to keep track of the navigation state
| `Prefetch` | `bootableProvider` | true | `Pjax` | Prefetch links on mouse enter (useful with `Pjax`)
| `CacheProvider` | `provider` | true |  | Cache ajax requests (useful with `Pjax`)
| `Lazyload` | `bootableProvider` | true |  | Handles lazyloaded images
| `Splashscreen` | `bootableProvider` | false | | Add a splash screen for the first init
| `TransitionFactory` | `bootableProvider` | false |  | Instantiate page transitions objects according to your *Pjax* context

#### Pjax

```js
import StartingBlocks, { History, Pjax } from 'starting-blocks'

// ...Instantiate starting blocks

// Add service
startingBlocks.provider('History', History)
startingBlocks.bootableProvider('Pjax', Pjax)

// ...Boot
```

⚠️ Don't forget to prepare your DOM adding specific *data attributes* and required *classes*, see [DOM structure section](#dom-structure)

#### Lazyload

Automatic lazy-loader for images. We use the well-known *[lazysizes](https://github.com/aFarkas/lazysizes)* library.
Include the service and add `lazyload` class to your image elements and change your `src` attributes to `data-src`. Read *lazysizes* documentation for further usage.

```js
import StartingBlocks, { Lazyload } from 'starting-blocks'

// ...Instantiate starting blocks
startingBlocks.bootableProvider('Lazyload', Lazyload)
// ...Boot
```

#### Splashscreen

We implemented a *Splashscreen* service that is triggered at the first website launch.
Create your own class that extends our `AbstractSplashscreen`:

```js
import { AbstractSplashscreen, Dispatcher, EventTypes } from 'starting-blocks'

export default class Splashscreen extends AbstractSplashscreen {
    constructor (container) {
        super(container, 'Splashscreen')
        //... custom values
    }

    // You need to override this method
    hide () {
        return new Promise(resolve => {
            // custom logic, animations...
            resolve()
        })
    }
}
```

```js
import Splashscreen from './Splashscreen'

// ...Instantiate starting blocks

// Add service
startingBlocks.bootableProvider('Splashscreen', Splashscreen)

// ...Boot
```

#### TransitionFactory

When AJAX navigation is enabled, transitions are triggered to manage animations between pages.
To choose a custom transition, you can set `data-transition` attribute with a transition name on each link:
```html
<a href="/contact" data-transition="fade">Contact</a>
```

Then, create a `TransitionFactory` class and register it into **Starting Blocks** as a service.
In this class, you must implement `getTransition (previousState, state)` method.
This method will be called on each transition and will give you access to `history` state informations:

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
        switch (state.transitionName) {
            case 'fade':
                return new FadeTransition()
            default:
                return new DefaultTransition()
        }
    }
}
```

How to register your Transition factory service?

```js
import TransitionFactory from '../factories/TransitionFactory'

// ...Instantiate starting blocks

// Add service
startingBlocks.provider('TransitionFactory', TransitionFactory)

// ...Boot
```

To create a new transition you need to write a new class extending our `AbstractTransition` boilerplate. Implement `start()` method and use `Promises` to manage your animation timeline.
⚠️ Be careful, you have to wait for `this.newPageLoading` Promise resolution to make sure the new page DOM is ready.
Then, you have access to old and new `Page` instances.

Example with *fade* animation (we use *TweenLite* from [gsap](https://github.com/greensock/GreenSock-JS) for this example):

```javascript
// src/transitions/FadeTransition.js
import AbstractTransition from '../AbstractTransition'
import { TweenLite } from 'gsap'

/**
 * Fade Transition example. Fade Out / Fade In between old and new pages.
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
        return new Promise(resolve => {
            TweenLite.to(this.oldPage.rootElement, 0.4, {
                alpha: 0,
                onComplete: resolve
            })
        })
    }

    /**
     * Fade in the new content
     */
    fadeIn () {
       // Add display: none on the old container
       this.oldPage.rootElement.style.display = 'none'

       // Prepare new content css properties for the fade animation
       this.newPage.rootElement.style.visibility = 'visible'
       this.newPage.rootElement.style.opacity = '0'
        
        // Scroll to the top
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        // fadeIn the new content container
        TweenLite.to(this.newPage.rootElement, 0.4, {
            autoAlpha: 1,
            onComplete: () => {
                // IMPORTANT: Call this method at the end
                this.done()
            }
        })
    }
}
```

## DOM structure

This ES6 javascript framework has been designed to handle either complete HTML responses or
*partial* HTML responses to lighten backend process and bandwidth.
One of the most useful Page and Block property is `rootElement` that will always refer to the current page/block main-section. 

**In a page context,** `rootElement` is the DOM element which is extracted at the end of each completed AJAX requests. 
When it detects that HTTP response is *partial*, it initializes `rootElement` using the whole response content. Every new DOM content will be appended to the `#sb-wrapper` HTML section in order to enable cross-transitions between old and new content.

**In a block context,** `rootElement` will store the DOM element with `[data-node-type]` attribute.

When `Pjax` service is used and `window.fetch` supported, **all links inside document body** are listened to fetch pages asynchronously and make transitions.

To declare a partial DOM section as the `rootElement` you must add some classes and
data to your HTML tags.

```html
<!-- Page (HomePage.js) -->
<div id="page-content-home"
     class="page-content"
     data-node-type="HomePage"
     data-node-name="home"
     data-is-home="1"
     data-meta-title="Home page">
    
    <!-- Block (GalleryBlock.js)  -->
    <div id="home-page-gallery"
         class="page-block"
         data-node-type="GalleryBlock">
        <img src="https://media.giphy.com/media/6LBVNUvqzY3tu/giphy.gif" alt="Display me…">
    </div>
</div>
```

- `id` *attribute* is obviously mandatory as it will be used to update your navigation and some other parts of your website. **Make sure that your ID is not the same as to your `data-node-name`.**
- `page-content` *class* is essential in order to extract your DOM element during AJAX request. You can customize this class name in [`StartingBlock` options](#options) (`pageClass: "page-content"`).
- `data-node-type` *attribute* will be used to map your element to the matching JS class (in this example: `HomePage.js`). **Every class must extend the `AbstractPage` or `AbstractBlock` class**. Then you have to declare your pages and blocks services in your *Starting Blocks* instance via `instanceFactory` method.
- `data-node-name` is used to name your page object **and to rename body class and ID after it.**
- `data-is-home`: 0 or 1
- `data-meta-title` *attribute* will be used to change your new page *title* (`document.title`), it can be used in other cases such as some social network modules which require a clean page-title.

You’ll find `index.html` and `page1.html` examples files. You can even test them
by spawning a simple server with `npm run serve` command.
Then go to your favorite browser and type `http://localhost:8080`.

## Page

Each custom page needs to extend our `AbstractPage` class to be registered as a service in your *Starting Blocks* instance.
Be careful that `data-node-type` attribute matches with your service declaration.
By default *Starting Blocks* will instantiate the `DefaultPage` class if no `data-node-type` attribute is found.

**Best practice** : Create your own `DefaultPage` with your common features then override the default 
service to use it as a common base for your custom pages :

```js
import { AbstractPage } from 'starting-blocks'

export default class CustomDefaultPage extends AbstractPage {
    //... common methods
}

// Custom page example
export default class HomePage extends CustomDefaultPage {
    //... home page custom methods
}
``` 

```js
import CustomDefaultPage from './pages/CustomDefaultPage'

// ...Instantiate starting blocks

// Override the DefaultPage service with your own
startingBlocks.instanceFactory('DefaultPage', c => {
    return new CustomDefaultPage(c)
})
// ...Boot
``` 

#### Page overridable methods

| Method | Description |
| --- | --- |
| `onResize` | On viewport resize, this method is debounced. |

## Block

A block is a section of your page. It can be a `Slideshow`, an ajax form, a map...
*Starting Blocks* automatically maps those DOM elements with a custom ES6 class in the same way the future [`CustomElementRegistry`](https://developer.mozilla.org/fr/docs/Web/API/CustomElementRegistry) will perform.
Create your own class extending our `AbstractBlock` or `AbstractInViewBlock` then register them as a service.
`data-node-type` attribute content and your service name must match.

#### Common block overridable methods in AbstractBlock

| Method | Description |
| --- | --- |
| `onResize` | On viewport resize, this method is *debounced* of 50ms. |
| `onPageReady` | Triggered once all page blocks have been created. |

#### In-view block overridable methods in AbstractInViewBlock

| Method | Description |
| --- | --- |
| `onIntersectionCallback` | Triggered when in view block state changed (in or out). |
| `onScreen` | Called when block is **in** the viewport. |
| `offScreen` | Called when block is **out** of the viewport. |

`AbstractInViewBlock` extends `AbstractBlock` and thus implements each of its methods too.

## Options

You can pass some options when instantiating `StartingBlocks` object:

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| wrapperId | string | 'sb-wrapper' |
| pageBlockClass | string | 'page-block' |
| pageClass | string | 'page-content' |
| objectTypeAttr | string | 'data-node-type' |
| noAjaxLinkClass | string | 'no-ajax-link' |
| noPrefetchClass | string | 'no-prefetch' |

## Events

| Const name | Event name | Description |
| --- | --- | --- |
| `BEFORE_PAGE_LOAD` | `SB_BEFORE_PAGE_LOAD` | Before Router initialize XHR request to load new page. |
| `AFTER_PAGE_LOAD` | `SB_AFTER_PAGE_LOAD` | After `window.fetch` XHR request succeeded. |
| `AFTER_DOM_APPENDED` | `SB_AFTER_DOM_APPENDED` | After Router appended new page DOM to `wrapperId`. |
| `AFTER_PAGE_BOOT` | `SB_AFTER_PAGE_BOOT` | After Router create new page instance. |
| `CONTAINER_READY` | `SB_CONTAINER_READY` |  |
| `TRANSITION_START` | `SB_TRANSITION_START` | |
| `TRANSITION_COMPLETE` | `SB_TRANSITION_COMPLETE` | |
| `BEFORE_SPLASHSCREEN_HIDE` | `SB_BEFORE_SPLASHSCREEN_HIDE` | |
| `AFTER_SPLASHSCREEN_HIDE` | `SB_AFTER_SPLASHSCREEN_HIDE` | |

## Docs

To generate documentation, you’ll at least NodeJS v4.4 and to install ESDoc.

```bash
npm run doc;
```

Documentation will be available in `doc/` folder.

## Naming conventions

We dropped *jQuery* in Starting-blocks v5 and we changed several variables names.
We suffixed every `DOMElement` variable with `Element`, `Container`, `Elements` or `Containers`.

Examples:

```js
let mainContainer = document.getElementById('main-container')
let imageContainer = document.getElementById('image-container')
let imageElements = imageContainer.querySelectorAll('.image')
```

## Improving Starting Blocks

To work locally on *Starting Blocks*, you’ll find some HTML files in `examples/` folder.

- Install dependencies: `yarn`.
- Type `npm run dev` to improve *Starting Blocks* locally.
- Type `npm run build` to optimize project in one file as: `main.js`.
- Type `npm run demo` to build demo project in `examples/` folder.

## Compatibility

*Starting Blocks* use native `Promise`, `fetch`, `IntersectionObserver` and `MutationObserver` browser features.
**Don't forget to use some polyfills for old browsers.**

## Demo

To launch the example you need to change the `examples/srv/js/config/config.example.js` file with your own informations.

## Go further with Starting Blocks

If you use *Webpack* you will be able to dynamically lazy-load your blocks with a custom `BlockBuilder`.
Create a custom *BlockBuilder* and override the default one:

```js
import { AbstractBlockBuilder } from 'starting-blocks'

export default class WebpackAsyncBlockBuilder extends AbstractBlockBuilder {
    // Dynamic import
    async getBlockInstance (nodeTypeName) {
        try {
            const Block = await this.getModule(nodeTypeName)

            if (!this.hasService(nodeTypeName)) {
                this.container.$register({
                    $name: nodeTypeName,
                    $type: 'instanceFactory',
                    $value: c => {
                        return new Block(c)
                    }
                })
            }

            return this.getService(nodeTypeName).instance()
        } catch (e) {
            console.error(e.message)
            return null
        }
    }

    async getModule (nodeTypeName) {
        return import(`../blocks/${nodeTypeName}` /* webpackChunkName: "block-" */)
            .then(block => {
                return block.default
            })
    }
}
```

Then override the default `PageBuilder` service:

```js
// Custom block builder (dynamic import)
startingBlocks.provider('BlockBuilder', WebpackAsyncBlockBuilder)
```

## Contributors

- [Adrien Scholaert](https://github.com/Gouterman)
- [Ambroise Maupate](https://github.com/ambroisemaupate)
- [Quentin Neyraud](https://github.com/quentinneyraud)
- [Maxime Bérard](https://github.com/maximeberard)
