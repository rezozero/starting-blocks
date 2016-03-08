require.config({
    baseUrl: './dist',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        waitForImages: './../bower_components/waitForImages/dist/jquery.waitforimages.min',
        TweenLite: "./../bower_components/gsap/src/minified/TweenMax.min",
    }
});

require([
    'jquery',
    'router',
    'pages/page'
], function($, Router, Page) {
    var $body = $('body');
    var nodeType = $body[0].getAttribute('data-node-type') || 'page';
    var dataHome = $body[0].getAttribute('data-is-home');
    var bodyId = $body[0].id;
    var isHome = (dataHome == '1') ? true : false;

    var routerObj = new Router.default(
        {
            homeHasClass: false,
            ajaxEnabled: true,
        },
        {
            /*
             * Routes are nodeType corresponding to
             * ES6 modules
             */
            'page' : Page.default,
        },
        // temp namespace is defined in your index.html
        temp.baseUrl
    );
    routerObj.initEvents();
    routerObj.boot($('.page-content').eq(0), 'static', isHome);
});
