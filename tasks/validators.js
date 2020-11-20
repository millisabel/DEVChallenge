"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    rename: {
        'gulp-w3c-css': 'cssValidator',
        'gulp-w3c-html-validator': 'htmlValidator',
    }
});

module.exports = function(options) {
    return function(){
        console.log('========================================');
        console.log('task HTML for files: \"' + options.html + '\"');
        console.log('task HTML for files: \"' + options.css + '\"');
        console.log('========================================');
        return gulp.src([options.html])
            .on('data', function(file){
                console.log('file: ' + file.basename);
                console.log('========================================')
            })
            .pipe($.htmlValidator())
            .pipe(gulp.src(options.css))
            .on('data', function(file){
                console.log('file: ' + file.basename);
                console.log('========================================')
            })
            .pipe($.cssValidator())
    }
}
