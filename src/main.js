import $ from "jquery";
import log from "loglevel";
import {polyfills} from "utils/polyfills";
import {Router} from "router";
import {GraphicLoader} from "graphicLoader";
import {AbstractNav} from "abstract-nav";
import {ClassFactory} from "class-factory";

/*
 * Declare polyfills
 */
polyfills();

log.setLevel(0);
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
        ajaxEnabled: false,
        preBoot: () => { log.debug('--- preboot'); },
        postLoad: () => { log.debug('--- postLoad'); },
        preLoad: () => { log.debug('--- preLoad'); },
        onDestroy: () => { log.debug('--- onDestroy'); },
        prePushState: () => { log.debug('--- prePushState'); }
    },
    new ClassFactory(),
    // temp namespace is defined in your index.html
    temp.baseUrl,
    new GraphicLoader(),
    new AbstractNav()
);
router.initEvents();
router.boot($('.page-content').eq(0), 'static', isHome);

