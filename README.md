# Starting blocks
## A page transition and blocks ES6 framework by REZO ZERO

- [Maxime Bérard](https://github.com/maximeberard)
- [Ambroise Maupate](https://github.com/ambroisemaupate)
- [Quentin Neyraud](https://github.com/quentinneyraud)
- [Adrien Scholaert](https://github.com/Gouterman)

## Spec

- *Gulp* (for development)
- *jQuery* 2.2.4
- *jquery.waitforimages* (for dispatching *onLoad* events to pages and blocks)
- *vanilla-lazyload* (for optional automatic image lazyloading)
- *ismobilejs*
- *debounce* (http://davidwalsh.name/javascript-debounce-function)
- *loglevel*
- Native *window.Promise*. Make sure to use a polyfill for [Internet Explorer 9 - 11](https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.0/es6-promise.js)
- Native *window.MutationObserver*. Make sure to use a polyfill for [Internet Explorer 10](https://cdnjs.cloudflare.com/ajax/libs/MutationObserver.js/0.3.2/mutationobserver.min.js)

## Usage with NPM

```shell
# Install dependencies that are NOT bundled
# with starting-blocks
npm install jquery.waitforimages --save
npm install jquery --save
npm install loglevel --save
npm install ismobilejs --save

# Install starting-blocks
npm install starting-blocks --save
```

Before using *Starting Blocks* in your own project as a dependency you’ll need and to **create your own** `main.js` file
and your `ClassFactory.js` according to your website pages and blocks. Any other router dependencies can be
customize such as `AbstractNav` to fit your own navigation needs.

*Starting Blocks* requires *jQuery* as we do not provide it in our bundle.

### CommonJS2 syntax with ES6

*Starting Blocks* is bundled with *NPM* in order to use *ES6* `import` syntax.
You won’t need to know where each class is stored, just use the *curly brace* syntax.
This bundle is already compiled in ES5, so you don’t need to setup Babel into your *node_modules* folder.

```js
import {AbstractNav, ClassFactory, Router, GraphicLoader, TransitionFactory} from "starting-blocks"

const router = new Router(
    {
        homeHasClass: false,
        ajaxEnabled: false,
        useCache: true,
        lazyloadEnabled: true
    },
    new ClassFactory(),
    location.origin,
    new GraphicLoader(),
    new AbstractNav(),
    new TransitionFactory()
)
router.initEvents()
router.boot($('.page-content').eq(0), 'static', isHome)
```


## A JS router made to work with HTML partial responses

This ES6 javascript router has been designed to handle as well complete HTML responses as
*partial* HTML responses to lighten backend process and bandwidth.
One of the most recurrent variable or member: `$cont` is always referring to the current page’ main-section.
This is the DOM section which is extracted at the end of each complete AJAX requests. When it detects that AJAX
response is *partial* it directly initialize `$cont` with the whole response data. Every new AJAX response will
be appended in the `#ajax-container` HTML section in order to smooth transitions between pages.

When `ajaxEnabled` is set to true, only links **inside** page-container are binded to load pages asynchronously and make transitions. If you want to bind links in a global navigation which **is not inside page-container**, you must extend `AbstractNav` class with your own. See our `ExampleNav` class that bind a simple nav links. Pay attention that your nav won’t be updated between page changes, and it will be your job to update links.

To declare a partial DOM section as the `$cont` you must add some classes and
data to your HTML tags.

```html
<div id="page-content-home"
     class="page-content page-content-ajax"
     data-node-type="page"
     data-node-name="home"
     data-is-home="1"
     data-meta-title="Home page">
</div>
```
- `id` *attribute* is obviously mandatory as it will be used to update your navigation and some other parts of your website. **Make sure that your ID is not equals to your `data-node-name`.**
- `page-content` *class* is essential in order to extract your DOM section during AJAX request. You can customize this class name in your `Router` options (`pageClass: "page-content"`).
- `data-node-type` *attribute* will be used to *route* your section to the corresponding JS class (in this example: page.js). **Every route class must extends the `AbstractPage` class**. Then you have to declare your routes in the `Router` construction (`'page' : Page`).
- `data-node-name` is used to name your page object **and to rename body ID after it.**
- `data-is-home`
- `data-meta-title` *attribute* will be used to change your new page *title* (`document.title`), it can be used in other cases such as some social network modules which require a clean page-title.

You’ll find `index.html` and `page1.html` examples files. You can even test them
by spawning a simple server with `php -S localhost:8888` command (You must have at least *PHP 5.5*).
Then go to your favorite browser and type `http://localhost:8888`.

### Router dependencies

A Router needs:

- an options object in order to override default configuration
- a `ClassFactory` object to link all `data-node-type` value to their *ES6* classes (you must import each class you’ll declare in your routes). You‘ll have to redefine a `ClassFactory` for each project you begin with *Starting Blocks*.
- a `GraphicLoader` or extending class instance in order to trigger `show` or `hide` during AJAX requests.
- a `Nav` or extending class instance to update your website navigation after AJAX requests.
- a `TransitionFactory` object to link all `data-transition` value to their *ES6* classes. 

You can look at the `src/main.js` file to see an instantiation example with few parameters.

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
| `AFTER_PAGE_LOAD` | `SB_AFTER_PAGE_LOAD` | After Router XHR request succeded. |
| `AFTER_DOM_APPENDED` | `SB_AFTER_DOM_APPENDED` | After Router appended new page DOM to page-container. |
| `AFTER_PAGE_BOOT` | `SB_AFTER_PAGE_BOOT` | After Router create new page instance. |
| `BEFORE_PAGE_SHOW` | `SB_BEFORE_PAGE_SHOW` | Before page begins to show, right after assets are loaded (images). |
| `AFTER_PAGE_SHOW` | `SB_AFTER_PAGE_SHOW` | After page showed. |
| `BEFORE_PAGE_HIDE` | `SB_BEFORE_PAGE_HIDE` | Before page begins to hide. *Be careful, this event must be triggered manually if hide() method is overriden.* |
| `AFTER_PAGE_HIDE` | `SB_AFTER_PAGE_HIDE` | After page hidind animation. *Be careful, this event must be triggered manually if hide() method is overriden.* |

⚠️ For those who use 2.1.7, we prefix events to avoid possible conflict with other libraries.

### Caching responses

By default, the router will use a JS object cache to store and fetch AJAX responses once they’ve been
successful. You can disable this feature with `useCache` router option.

**Be careful, this cache is global and cannot be disabled for special pages.**

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
	- **context** : equal to `"history"`, `"link"` or `"nav"` 
- `direction` : equal to `"back"` or `"forward"` on navigator buttons click (only when `context` equals to `"history"`)

Example: 
```javascript
// src/TransitionFactory.js

import DefaultTransition from './transitions/DefaultTransition';
import FadeTransition from './transitions/FadeTransition';
  
export default class TransitionFactory {
    getTransition (previousState, state, direction = null) {
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
⚠️ You have to wait for `this.newContainerLoading` promise resolution to make sure the new content is accessible.

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
        // this.newContainerLoading is a Promise which is resolved when the new content is loaded
        Promise.all([this.newContainerLoading, this.fadeOut()])
            // then fadeIn the new content
            .then(this.fadeIn.bind(this))
    }

    /**
     * Fade out the old content.
     * @returns {Promise}
     */
    fadeOut () {
        return new Promise((resolve) => {
            this.oldContainer.animate({
                opacity: 0
            }, 400, 'swing', resolve)
        })
    }

    /**
     * Fade in the new content
     */
    fadeIn () {
        // Add display: none on the old container
        this.oldContainer.hide()

        // Prepare new content css properties for the fade animation
        this.newContainer.css({
            visibility : 'visible',
            opacity : 0
        })

        // fadeIn the new content container
        this.newContainer.animate({opacity: 1}, 400, () => {
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

## Improving Starting blocks

To work locally on *Starting blocks*, we provided some HTML example files.

- Install dependencies: `npm install`.
- Type `npm run dev` to improve Starting blocks locally.
- Type `npm run build` to optimize project in one file as: `bundle.js`.
