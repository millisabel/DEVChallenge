"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    rename: {
        'gulp-html-beautify': 'htmlBeautify',
        'gulp-file-include': 'fileinclude',
    }
});

module.exports = function(options, sync) {
    return function(){
        console.log('========================================');
        console.log('task HTML for files: \"' + options.src + '\"');
        console.log('========================================');
        return gulp.src(options.src)
            .on('data', function(file){
                console.log('file: ' + file.basename);
                console.log('========================================')
            })
            .pipe($.plumber({
                errorHandler: $.notify.onError()
            }))
            .pipe($.preprocess())
            .pipe($.htmlhint())
            .pipe($.htmlhint.reporter())
            .pipe($.if(process.env.NODE_ENV === 'prod', $.htmlmin({
                collapseWhitespace: true,
                removeComments: true
            }), $.htmlBeautify()))
            .pipe(gulp.dest(options.build))
            .pipe(sync.stream())
    }
}
