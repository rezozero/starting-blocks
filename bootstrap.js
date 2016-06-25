requirejs.config({
    baseUrl: './dist',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        waitForImages: './../bower_components/waitForImages/dist/jquery.waitforimages.min',
        //TweenMax: "./../bower_components/gsap/src/minified/TweenMax.min",
        TweenMax: "//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenMax.min",
        loglevel: "./../bower_components/loglevel/dist/loglevel.min",
    }
});

require(['main']);
