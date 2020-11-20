"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function(options) {
    return function(cb){
        console.log('========================================');
        console.log('task spriteSvg for files: \"' + options.src + '\"');
        console.log('========================================');

        const task = $.folders(options.src, function(folder){
            console.log(options.src + folder + '/*.svg');

            return gulp.src(options.src + folder + '/*.svg')
                .on('data', function(file){
                    console.log(folder);
                    console.log('file: ' + file.basename);
                    console.log('========================================');
                })
                .pipe($.svgSprite({
                        mode: {
                            css: {
                                dest: '.',
                                prefix: '.',
                                dimensions: true,
                                bust: false,
                                sprite: folder + '-spriteSVG.svg',
                                layout: 'vertical',
                                render: {
                                    css: {
                                        dest: folder + '-spriteSVG.css',
                                    }
                                }
                            }
                        }
                    }
                ))
                .pipe($.if('*.css',
                    gulp.dest(options.temp),
                    gulp.dest(options.build)));
        });

        task();
        cb();
    }
}
