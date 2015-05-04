'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            compass: {
                files: ['./public/sass/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            js: {
                files: ['./public/js/*.js'],
                tasks: ['jshint', 'uglify:dev']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    './public/*.html',
                    './public/css/style.css',
                    './public/js/*.js',
                    './public/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        //Express
        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },

        /**
            // Connect
            connect: {
              server: {
                options: {
                  port: 8000
                }
              }
            },
        **/


        // Compass and scss
        compass: {
            options: {
                //bundleExec: true,
                //httpPath: './publi',
                cssDir: './public/css',
                sassDir: './public/sass',
                imagesDir: './public/images',
                javascriptsDir: './public/js',
                fontsDir: './public/fonts',
                assetCacheBuster: 'none',
                require: [
                    'breakpoint',
                    'susy',
                    'compass/import-once/activate',
                    'modular-scale',
                    'bootstrap-sass',
                    'sassy-buttons'
                ]
            },
            dev: {
                options: {
                    environment: 'development',
                    outputStyle: 'expanded',
                    relativeAssets: true,
                    raw: 'line_numbers = :true\n'
                }
            },
            dist: {
                options: {
                    environment: 'production',
                    outputStyle: 'compact',
                    force: true
                }
            }
        },

        /**
                bower: {
                    dev: {
                        dest: '/public/libs/',
                        js_dest: '/public/libs/js',
                        css_dest: './public'
                    }
                }
                **/

        // Javascript linting with jshint

        // Concat & minify
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            app: {
                files: {
                    './build/js/app.js': ['./public/js/app.js'],
                    './build/js/form.js': ['./public/js/form.js'],
                    './build/js/plugins.js': ['./public/js/plugins.js'],
                    './build/js/routes.js': ['./public/js/routes.js'],
                    './build/js/tabs.js': ['./public/js/tabs.js']

                }
            }
        },
        concat: {
            js: {
                src: ['./public/build/js/*.js'],
                dest: './public/min/app.js'
            }
        },
        uglify: {
            js: {
                src: ['./public/min/app.js'],
                dest: './public/min/app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.registerTask('build', [
        'concat',
        'jshint',
        'uglify:dest',
        'compass:dest'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'compass:dev',
        'express:dev',
        'watch'
    ]);

}

;