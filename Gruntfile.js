module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        "babel": {
            options: {
                sourceMap: true,
                "presets": ["es2015"]
            },
            dist: {
                files: {
                    "dist/router.js": "src/router.js",
                    "dist/state.js": "src/state.js",
                    "dist/abstract-page.js": "src/abstract-page.js",
                    "dist/abstract-block.js": "src/abstract-block.js"
                }
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
        }
    });

    grunt.registerTask("default", ["jshint", "babel"]);
};
