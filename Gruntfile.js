'use strict';

module.exports = function(grunt)
{

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-sync");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-mkdir");

    grunt.initConfig({
        pgk: grunt.file.readJSON("package.json"),
        clean: {
            build: {
                src: ['www']
            }
        },
        less: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'www/main.css': 'src/less/main.less'
                }
            }
        },
        /*sync: {
            copy_resources_to_www: {
                files: [
                    { cwd: 'src', src:["js/**", "libs/**", "fonts/**",'assets/**', "views/**", "index.html"], dest: 'www' },
                    { cwd: 'src', src: "libs/**", dest: 'www' }
                ]
            }
        },*/
        copy: {
            for_www: {
                files: [
                    {
                        expand: true,
                        cwd: "src/",
                        src: ["js/**", "libs/**", "fonts/**", "views/**",'assets/**', "index.html","league.html"],
                        dest: "www"
                    }

                ]
            }
        },
        uglify: {
            options: {
                sourceMapIncludeSources: true
            },
            development: {
                options: {
                    mangle: false,
                    sourceMap: true,
                    compress: false
                },
                files: {
                    'www/js/modules.min.js': ['src/js/*.js']
                }
            }
        },
        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            less: {
                files: [
                    'src/less/**',
                    '!src/less/*.map'
                ],
                tasks: ['less']
            },
            others: {
                files: [
                    'src/league.html',
                    'src/index.html',
                    'src/js/**',
                    'src/views/**',
                ],
                tasks:[ "uglify",'copy:for_www']
            }
        }

    });

    grunt.registerTask("default", ["clean", "less",  "uglify:development", "watch","copy:for_www"]);
    grunt.registerTask("run", ["clean", "less",  "uglify:development", "watch","copy:for_www"]);

};