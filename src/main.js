import Page from "pages/page";
import polyfills from "utils/polyfills";
import Router from "router";
import GraphicLoader from "graphicLoader";
import Nav from "nav";
import $ from "jquery";

/*
 * Declare polyfills
 */
polyfills();

/*
 * Begin main app ---
 */
let $body = $('body');
let nodeType = $body[0].getAttribute('data-node-type') || 'page';
let dataHome = $body[0].getAttribute('data-is-home');
let bodyId = $body[0].id;
let isHome = (dataHome == '1') ? true : false;

let router = new Router(
    {
        homeHasClass: false,
        ajaxEnabled: true,
    },
    {
        /*
         * Routes are nodeType corresponding to
         * ES6 modules
         */
        'page' : Page,
    },
    // temp namespace is defined in your index.html
    temp.baseUrl,
    new GraphicLoader(),
    new Nav()
);
router.initEvents();
router.boot($('.page-content').eq(0), 'static', isHome);

