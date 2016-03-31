import $ from "jquery";
import {polyfills} from "utils/polyfills";
import {Router} from "router";
import {GraphicLoader} from "graphicLoader";
import {AbstractNav} from "abstract-nav";
import {Page} from "pages/page";

/*
 * Declare polyfills
 */
polyfills();

/*
 * Begin main app ---
 */
const $body = $('body');
const nodeType = $body[0].getAttribute('data-node-type') || 'page';
const dataHome = $body[0].getAttribute('data-is-home');
const bodyId = $body[0].id;
const isHome = (dataHome == '1') ? true : false;

const router = new Router(
    {
        homeHasClass: false,
        ajaxEnabled: true,
        preBoot: () => { console.log('--- preboot'); },
        postLoad: () => { console.log('--- postLoad'); },
        preLoad: () => { console.log('--- preLoad'); },
        onDestroy: () => { console.log('--- onDestroy'); },
        prePushState: () => { console.log('--- prePushState'); },
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
    new AbstractNav()
);
router.initEvents();
router.boot($('.page-content').eq(0), 'static', isHome);

