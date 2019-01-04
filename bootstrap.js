requirejs.config({
    baseUrl: './dist',
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        isMobile: "./../bower_components/isMobile/isMobile.min",
        Lazyload: './../bower_components/vanilla-lazyload/dist/lazyload',
        waitForImages: './../bower_components/waitForImages/dist/jquery.waitforimages.min',
        loglevel: "./../bower_components/loglevel/dist/loglevel.min",
    }
});

require(['main']);
