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
- Blocks : dynamic interactive sections (map, slideshow, ajax forms, canvas...)

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
import HomePage from './pages/HomePage'
import UsersBlock from './blocks/UsersBlock'

// Instantiate starting blocks
const startingBlocks = new StartingBlocks({
    // ...options
})

// Register pages
// The service name need to map with the data-node-type attribute (see DOM Structure section)
startingBlocks.instanceFactory('HomePage', c => {
    return new HomePage(c)
})

// Register blocks
// The service name need to map with the data-node-type attribute (see DOM Structure section)
startingBlocks.instanceFactory('UsersBlock', c => {
    return new UsersBlock(c)
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

⚠️ Don't forget to structure your DOM and to add specific data attributes, see [DOM structure section](#dom-structure)

#### Lazyload

Automatic lazy loader for images. We used [lazysizes](https://github.com/aFarkas/lazysizes).
Include the service and add `lazyload` class to your image elements.

```js
import StartingBlocks, { Lazyload } from 'starting-blocks'

// ...Instantiate starting blocks
startingBlocks.bootableProvider('Lazyload', Lazyload)
// ...Boot
```

#### Splashscreen

We implemented a `Splashscreen` service that is used at the first init.
Create your own class and extends our `AbstractSplashscreen`.

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

When AJAX navigation is enabled, transitions can be used to manage animations between pages.
To manage transitions, you can set `data-transition` attribute with a name on each link :
```html
<a href="/contact" data-transition="fade">Contact</a>
```

Then, create a **TransitionFactory** class and pass it to **Starting Blocks** as a service.
In this class, implement `getTransition (previousState, state)` method.
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
        switch (state.transitionName) {
            case 'fade':
                return new FadeTransition()
            default:
                return new DefaultTransition()
        }
    }
}
```

How to add it as a service :
```js
import TransitionFactory from '../factories/TransitionFactory'

// ...Instantiate starting blocks

// Add service
startingBlocks.provider('TransitionFactory', TransitionFactory)

// ...Boot
```

To create a new transition you need to create a new class extending `AbstractTransition`. Implement `start()` method and use Promises to manages your animations.
⚠️ You have to wait for `this.newPageLoading` promise resolution to make sure the new page is accessible.
Then, you have access to old and new Page instances.

Example with fade animation (we used TweeLite from [gsap](https://github.com/greensock/GreenSock-JS) for this example):

```javascript
// src/transitions/FadeTransition.js
import AbstractTransition from '../AbstractTransition'
import { TweenLite } from 'gsap'

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

This ES6 javascript framework has been designed to handle as well complete HTML responses as
*partial* HTML responses to lighten backend process and bandwidth.
One of the most recurrent variable or member: `rootElement` is always referring to the current page main-section.
This is the DOM section which is extracted at the end of each complete AJAX requests. When it detects that AJAX
response is *partial* it directly initialize `rootElement` with the whole response data. Every new AJAX response will
be appended in the `#sb-wrapper` HTML section in order to smooth transitions between pages.

When `Pjax` service is used and `window.fetch` is supported, **all links inside document body** are listened to load pages asynchronously and make transitions.

To declare a partial DOM section as the `rootElement` you must add some classes and
data to your HTML tags.

```html
<div id="page-content-home"
     class="page-content"
     data-node-type="HomePage"
     data-node-name="home"
     data-is-home="1"
     data-meta-title="Home page">
</div>
```

- `id` *attribute* is obviously mandatory as it will be used to update your navigation and some other parts of your website. **Make sure that your ID is not equals to your `data-node-name`.**
- `page-content` *class* is essential in order to extract your DOM section during AJAX request. You can customize this class name in options (`pageClass: "page-content"`).
- `data-node-type` *attribute* will be used to map your section to the corresponding JS class (in this example: HomePage.js). **Every class must extends the `AbstractPage` or `AbstractBlock` class**. Then you have to declare your pages and blocks in your *Starting Blocks* instance via `instanceFactory` method.
- `data-node-name` is used to name your page object **and to rename body class and ID after it.**
- `data-is-home` 0 or 1
- `data-meta-title` *attribute* will be used to change your new page *title* (`document.title`), it can be used in other cases such as some social network modules which require a clean page-title.

You’ll find `index.html` and `page1.html` examples files. You can even test them
by spawning a simple server with `npm run serve` command.
Then go to your favorite browser and type `http://localhost:8080`.

## Page

Each custom page need to extends our `AbstractPage` class and to be register as a service in your *Starting Blocks* instance.
Be careful that `data-node-type` attribute match with your service declaration.
By default *Starting Blocks* will instantiate the `DefaultPage` class.

**Best practice** : Create your own `DefaultPage` with your commons features then override the default 
service and use it as base for your future pages :

```js
import { AbstractPage } from 'starting-blocks'

export default class CustomDefaultPage extends AbstractPage {
    //... commons methods
}

// Custom page example
export default class HomePage extends CustomDefaultPage {
    //... home page custom methods
}
``` 

```js
import CustomDefaultPage from './pages/CustomDefaultPage'

// ...Instantiate starting blocks

// Add service
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

A block is an interactive section of your website. For example, it can be a Slideshow, an ajax form, a map...
*Starting blocks* automatically map those interactive sections with custom js class.
Like custom page, create your own class extending our `AbstractBlock` or `AbstractInViewBlock` class then add them as service.
`data-node-type` attribute and service name must match.

#### Common block overridable methods
| Method | Description |
| --- | --- |
| `onResize` | On viewport resize, this method is debounced. |
| `onPageReady` | Called once all page blocks have been created. |

#### In view block overrivable methods
| Method | Description |
| --- | --- |
| `onIntersectionCallback` | Called when in view block state changed (in or out). |
| `onScreen` | Called when block is in the viewport. |
| `offScreen` | Called when block is out of the viewport. |

## Options

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

⚠️ For those who use 2.1.7, we prefix events to avoid possible conflict with other libraries.

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

## Compatibility

*Starting Blocks* use native `Promise`, `fetch`, `IntersectionObserver` and `MutationObserver`
Don't forget to use some polyfills for old browsers.

## Demo

To launch the example you need to change the `examples/srv/js/config/config.example.js` file with your own information.

## Go further with Starting Blocks

Dynamically lazy load your blocks with a custom `BlockBuilder` (you need to use *webpack*).
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

Then override the default `PageBuilder` service :
```js
// Custom block builder (dynamic import)
startingBlocks.provider('BlockBuilder', WebpackAsyncBlockBuilder)
```