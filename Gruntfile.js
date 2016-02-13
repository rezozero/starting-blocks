module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        "babel": {
            options: {
                sourceMap: true,
                presets: ["es2015"],
                plugins: ['transform-es2015-modules-amd']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js'],
                    dest: 'dist'
                }]
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'src/*.js',
                'src/*/*.js',
                '!dist/*.js',
            ],
            options: {
                esversion: 6,
                '-W008': true // decimal point
            }
        },
        requirejs: {
            compile: {
                options: {
                    optimize: "uglify",
                    baseUrl: "./dist",
                    name: "../bootstrap",
                    out: "build/build.min.js",
                    paths: {
                        jquery: '../bower_components/jquery/dist/jquery.min',
                        waitForImages: '../bower_components/waitForImages/dist/jquery.waitforimages.min',
                        TweenLite: "../bower_components/gsap/src/minified/TweenLite.min",
                    }
                }
            }
        }
    });

    grunt.registerTask("default", ["jshint", "babel"]);
    grunt.registerTask("build", ["jshint", "babel", "requirejs"]);
};
