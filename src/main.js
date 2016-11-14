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
const dataHome = $body[0].getAttribute('data-is-home');
const isHome = (dataHome == '1') ? true : false;

const router = new Router(
    {
        homeHasClass: false,
        ajaxEnabled: true,
        useCache: true,
        lazyloadEnabled: true,
        /*
         * Do not use Arrow function
         * these will be bind to the router before their use.
         */
        preBoot: function(){ log.debug('ℹ️ preboot'); },
        postLoad: function(){ log.debug('ℹ️ postLoad'); },
        preLoad: function(){ log.debug('ℹ️ preLoad'); },
        onDestroy: function(){ log.debug('ℹ️ onDestroy'); },
        prePushState: function(){ log.debug('ℹ️ prePushState'); }
    },
    new ClassFactory(),
    // temp namespace is defined in your index.html
    temp.baseUrl,
    new GraphicLoader(),
    new AbstractNav()
);
router.initEvents();
router.boot($('.page-content').eq(0), 'static', isHome);

