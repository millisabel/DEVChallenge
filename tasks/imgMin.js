"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function(options) {
    return function(){
        console.log('========================================')
        console.log('task IMG_MIN for files: \"' + options.src + '\"')
        console.log('========================================')
        return gulp.src(options.src)
            // .pipe($.changed(options.src))
            .on('data', function(file){
                if(!file){
                    console.log('no file');
                    return}
                console.log('file: ' + file.basename);
                console.log('========================================')
            })
            .pipe($.webp())
            .pipe(gulp.dest(options.build))
            .pipe(gulp.src(options.src))
            .pipe($.imagemin([
                $.imagemin.gifsicle({interlaced: true}),
                $.imagemin.mozjpeg({quality: 75, progressive: true}),
                $.imagemin.optipng({optimizationLevel: 5}),
                $.imagemin.svgo({
                    plugins: [
                        {removeViewBox: false},
                        {removeUnusedNS: true},
                        {removeComments: true},
                        {removeEmptyAttrs: true},
                        {removeEmptyText: true},
                        {collapseGroups: true},
                        {removeStyleElement: true},
                        {removeElementsByAttr: true},
                        {
                            removeAttrs:
                                {attrs: ['data-name', 'aria-hidden']}
                        },
                    ]
                })
            ]))
            .pipe(gulp.dest(options.build))
    }
}
