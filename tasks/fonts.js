"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function(options) {
    return function(){
        console.log('========================================')
        console.log('task FONTS for files: \"' + options.src + '\"')
        console.log('========================================')
        return gulp.src(options.src)
            .on('data', function(file){
                console.log('file: ' + file.basename);
                console.log('========================================')
            })
            .pipe($.ttf2woff())
            .pipe(gulp.dest(options.build))
            .pipe(gulp.src(options.src))
            .pipe($.ttf2woff2())
            .pipe(gulp.dest(options.build))
    }

}
