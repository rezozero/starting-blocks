# Starting blocks
## A page transition and blocks ES6 framework by REZO ZERO

- Maxime Bérard
- Ambroise Maupate

## Spec

- *Gulp* (for development)
- *CommonJS 2* module syntax
- *jQuery* 2.2.4
- *jquery.waitforimages* (for dispatching *onLoad* events to pages and blocks)
- *vanilla-lazyload* (for optional automatic image lazyloading)
- *ismobilejs*
- *debounce* (http://davidwalsh.name/javascript-debounce-function)
- *loglevel*

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
and your `class-factory.js` according to your website pages and blocks. Any other router dependencies can be
customize such as `AbstractNav` to fit your own navigation needs.

*Starting Blocks* requires *jQuery* as we do not provide it in our bundle.

### CommonJS2 syntax with ES6

*Starting Blocks* is bundled with *NPM* in order to use *ES6* `import` syntax.
You won’t need to know where each class is stored, just use the *curly brace* syntax.
This bundle is already compiled in ES5, so you don’t need to setup Babel into your *node_modules* folder.

```js
import {AbstractNav, ClassFactory, Router, GraphicLoader} from "starting-blocks";

const router = new Router(
    {
        homeHasClass: false,
        ajaxEnabled: false,
        useCache: true,
        lazyloadEnabled: true,
    },
    new ClassFactory(),
    location.origin,
    new GraphicLoader(),
    new AbstractNav()
);
router.initEvents();
router.boot($('.page-content').eq(0), 'static', isHome);
```


## A JS router made to work with HTML partial responses

This ES6 javascript router has been designed to handle as well complete HTML responses as
*partial* HTML responses to lighten backend process and bandwidth.
One of the most recurrent variable or member: `$cont` is always referring to the current page’ main-section.
This is the DOM section which is extracted at the end of each complete AJAX requests. When it detects that AJAX
response is *partial* it directly initialize `$cont` with the whole response data. Every new AJAX response will
be appended in the `#ajax-container` HTML section in order to smooth transitions between pages.

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
- `id` *attribute* is obviously mandatory as it will be used to update your navigation and some other parts of your website.
- `page-content` *class* is essential in order to extract your DOM section during AJAX request. You can customize this class name in your `Router` options (`pageClass: "page-content"`).
- `data-node-type` *attribute* will be used to *route* your section to the corresponding JS class (in this example: page.js). **Every route class must extends the `AbstractPage` class**. Then you have to declare your routes in the `Router` construction (`'page' : Page`).
- `data-node-name`
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

You can look at the `src/main.js` file to see an instantiation example with few parameters.

### Caching responses

By default, the router will use a JS object cache to store and fetch AJAX responses once they’ve been
successful. You can disable this feature with `useCache` router option.

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
