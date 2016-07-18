requirejs.config({
    baseUrl: './dist',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        TweenMax: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/TweenMax.min",
        Lazyload: './../bower_components/vanilla-lazyload/dist/lazyload',
        waitForImages: './../bower_components/waitForImages/dist/jquery.waitforimages.min',
        loglevel: "./../bower_components/loglevel/dist/loglevel.min",
    }
});

require(['main']);
