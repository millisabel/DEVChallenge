"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const favicons = require('favicons').stream;

module.exports = function(options) {
    return function(){
        console.log('========================================')
        console.log('task favIco for files: \"' + options.src + '\"')
        console.log('========================================')
        return gulp.src(options.src)
            .pipe($.debug({title:'DEBUG:'}))
            .pipe(favicons({
                path: options.path,
                html: options.name,
                pipeHTML: true,
                replace: true,
                icons: {
                    android: false,
                    appleIcon: false,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    windows: false,
                    yandex: false
                }
            }))
            .pipe(gulp.dest(function (file) {
                return file.extname === '.png' || file.extname === '.ico' ?
                    options.build : options.temp
            }))
    }

}
