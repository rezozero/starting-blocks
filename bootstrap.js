requirejs.config({
    baseUrl: './dist',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        TweenMax: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min",
        TweenLite: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min",
        //Draggable: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/utils/Draggable.min",
        //CSSPlugin: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min",
        isMobile: "./../bower_components/isMobile/isMobile.min",
        Lazyload: './../bower_components/vanilla-lazyload/dist/lazyload',
        waitForImages: './../bower_components/waitForImages/dist/jquery.waitforimages.min',
        loglevel: "./../bower_components/loglevel/dist/loglevel.min",
    }
});

require(['main']);
