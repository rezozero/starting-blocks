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
paths for each JS file you’ll need and to **create your own** `bootstrap.js` and `main.js`
files. Some of this lib files will be located in `bower_components` folder and so they
won’t be available anymore from your project path. Solution is to add them to your
*RequireJS* paths configuration:

You’ll need to adapt this path array in your `bootstrap.js` file **and** in your
`requirejs` *Gulp* task to build a minified version.

```js
var paths = {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
    waitForImages: '/themes/PITheme/static/bower_components/waitForImages/dist/jquery.waitforimages.min',
    TweenLite: "/themes/PITheme/static/bower_components/gsap/src/minified/TweenMax.min",
    // Include current page-block sources from their location in bower_components
    // if you are using bower to fetch this lib.
    "state": "/themes/PITheme/static/bower_components/pageblock/dist/state",
    "router": "/themes/PITheme/static/bower_components/pageblock/dist/router",
    "graphicLoader": "/themes/PITheme/static/bower_components/pageblock/dist/graphicLoader",
    "nav": "/themes/PITheme/static/bower_components/pageblock/dist/nav",
    "abstract-page": "/themes/PITheme/static/bower_components/pageblock/dist/abstract-page",
    "abstract-block": "/themes/PITheme/static/bower_components/pageblock/dist/abstract-block",
    // Utils functions and classes
    "utils/utils": "/themes/PITheme/static/bower_components/pageblock/dist/utils/utils",
    "utils/gaTrackErrors": "/themes/PITheme/static/bower_components/pageblock/dist/utils/gaTrackErrors",
    "utils/debounce": "/themes/PITheme/static/bower_components/pageblock/dist/utils/debounce",
    "utils/bootstrapMedia": "/themes/PITheme/static/bower_components/pageblock/dist/utils/bootstrapMedia",
    "utils/polyfills": "/themes/PITheme/static/bower_components/pageblock/dist/utils/polyfills",
    // If you want to use example Page and Home classes in your project
    "pages/page": "/themes/PITheme/static/bower_components/pageblock/dist/pages/page"
    "pages/home": "/themes/PITheme/static/bower_components/pageblock/dist/pages/home"
    // Then your own project vendor libs
    // …
};
```
Then configure your `baseUrl` to build full path to get your script:

```js
// On a static website where dist folder is at server root
baseUrl: '/dist'

// If your dist folder is in a Roadiz theme
// (and your Roadiz site is at server root)
baseUrl: '/themes/PITheme/static/dist'
```
