# Changelog

## Version 4.0.0: 2018-02-08

- Big refactoring of all classes
- No more need to bind manually all **links** in Pages, Blocks or Nav, everything is handled by *Pjax* class
- Removed all Router constructor arguments except for `options` array
- `AbstractNav` has been removed, do not extend it anymore.
- Starting-blocks wrapper default ID is now `sb-wrapper`, you can change it in your `Router` options (i.e. `ajaxWrapperId: 'main-container'`)
- *jquery*, *loglevel* and *jquery.waitforimages* are declared external. You should provide them manually as file or as CDN in your project.
- *Pjax* is now using native `window.fetch` methods to perform XHR requests. Make sure to use necessary polyfills. **If window.fetch is not supported, ajax will be disabled.**
