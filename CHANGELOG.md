# Changelog

## Version 4.2.0: 2018-03-06

- Change `classFactory.getBlockInstance()` method parameters order (`page, $cont, nodeType`). Make sure to update your `classFactory` file
- You can now switch `classFactory.getBlockInstance()` to `async` and dynamically load your modules with `import('yourModule').then()`, see example for more details.
- Optional web worker feature to load pages content. Add `workerEnabled` router option to true to enable

## Version 4.1.0: 2018-02-20

- Change `classFactory.getPageInstance()` method parameters order and removed `isHome` parameter
- Added new `data` object parameter in history `add` method if you want to manually add specific data

## Version 4.0.0: 2018-02-08

- Big refactoring of all classes
- No more need to bind manually all **links** in Pages, Blocks or Nav, everything is handled by *Pjax* class
- Removed all Router constructor arguments except for `options` array
- `AbstractNav` has been removed, do not extend it anymore.
- Starting-blocks wrapper default ID is now `sb-wrapper`, you can change it in your `Router` options (i.e. `ajaxWrapperId: 'main-container'`)
- *jquery*, *loglevel* and *jquery.waitforimages* are declared external. You should provide them manually as file or as CDN in your project.
- *Pjax* is now using native `window.fetch` methods to perform XHR requests. Make sure to use necessary polyfills. **If window.fetch is not supported, ajax will be disabled.**
