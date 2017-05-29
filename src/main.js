import $ from "jquery";
import log from "loglevel";
import polyfills from "./utils/polyfills";
import Router from "./router";
import GraphicLoader from "./graphicLoader";
import ClassFactory from "./class-factory";
import ExampleNav from "./example-nav";
import TransitionFactory from './transition-factory'

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

if (!location.origin)
    location.origin = location.protocol + "//" + location.host;

const router = new Router(
    {
        homeHasClass: false,
        ajaxEnabled: true,
        useCache: true,
        lazyloadEnabled: true,
    },
    new ClassFactory(),
    // temp namespace is defined in your index.html
    location.origin,
    new GraphicLoader(),
    new ExampleNav(),
    new TransitionFactory()
);
router.initEvents();
router.boot($('.page-content').eq(0), 'static', isHome);

