# Page-block Framework
## REZO ZERO

- Maxime Bérard
- Ambroise Maupate

## Spec

- ES6

## Usage

```js
var $body = $('body');
var nodeType = $body[0].getAttribute('data-node-type');
var dataHome = $body[0].getAttribute('data-is-home');
var bodyId = $body[0].id;
var isHome = (dataHome == '1') ? true : false;

var router = new Router(
    {
        homeHasClass: false,
        ajaxEnabled: true,
    },
    {
        'page' : 'Page',
        'basicblock' : 'BasicBlock',
        'mapblock' : 'MapBlock'
    },
    baseUrl
);

router.initEvents();
router.boot(nodeType, bodyId, 'static', isHome);
```