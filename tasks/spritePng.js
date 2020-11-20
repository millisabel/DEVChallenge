"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function(options) {
    return function(cb){
        console.log('========================================');
        console.log('task spritePng for files: \"' + options.src + '\"');
        console.log('========================================');

        const task = $.folders(options.src, function(folder){
            return gulp.src(options.src + folder + '/*.png')
                .on('data', function(file){
                    console.log('file: ' + file.basename);
                    console.log('========================================')
                })
                .pipe($.spritesmith({
                    imgName: folder + '-spritePNG.png',
                    cssName: folder + '-spritePNG.css',
                }))
                .pipe($.if('*.css',
                    gulp.dest(options.temp),
                    gulp.dest(options.build)
                ))
        });
        task();
        cb();
    }
}
