# Page-block Framework
## REZO ZERO

- Maxime Bérard
- Ambroise Maupate

## Spec

- ES6 (convert with Babel)
- jQuery 2.2.0
- waitForImages
- debounce
- RequireJS

## Usage

- Install `gulp-cli` if you do not have it yet `npm install -g gulp-cli`.
- Install dependencies: `npm install` and `bower install`.
- Type `gulp watch` to convert ES6 scripts to `dist/` folder in background.
- Type `gulp` to optimize project in one file in `build/` folder.

RequireJS bootstrap file :

```js
requirejs.config({
    baseUrl: './dist',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        waitForImages: './../bower_components/waitForImages/dist/jquery.waitforimages.min',
        TweenLite: "./../bower_components/gsap/src/minified/TweenMax.min",
    }
});

require(['main']);
```

## Use as vendor lib (bower)

Before using *pageblock* in your project as a dependency. You’ll need to declare
paths for each JS file you’ll need and to create your own `bootstrap.js` and `main.js`
files.

### Example paths

You’ll need to adapt this path array in your `bootstrap.js` file **AND** in your
requirejs *Gulp* task to build a minified version.

```js
var paths = {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
    waitForImages: './../bower_components/waitForImages/dist/jquery.waitforimages.min',
    TweenLite: "./../bower_components/gsap/src/minified/TweenMax.min",
    // Include current page-block sources from their location in bower_components
    // if you are using bower to fetch this lib.
    State: "./../bower_components/pageblock-framework/src/state",
    Router: "./../bower_components/pageblock-framework/src/router",
    Nav: "./../bower_components/pageblock-framework/src/nav",
    AbstractPage: "./../bower_components/pageblock-framework/src/abstract-page",
    AbstractBlock: "./../bower_components/pageblock-framework/src/abstract-block",
    // Utils functions and classes
    Utils: "./../bower_components/pageblock-framework/src/utils/utils",
    gaTrackErrors: "./../bower_components/pageblock-framework/src/utils/gaTrackErrors",
    debounce: "./../bower_components/pageblock-framework/src/utils/debounce",
    BootstrapMedia: "./../bower_components/pageblock-framework/src/utils/bootstrapMedia",
    // If you want to use example Page and Home classes in your project
    Page: "./../bower_components/pageblock-framework/src/pages/page",
    Home: "./../bower_components/pageblock-framework/src/pages/home",
    // Then your own project files
    // …
};
```
