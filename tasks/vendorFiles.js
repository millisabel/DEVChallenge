"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    rename: {
        'gulp-clean-css': 'cleanCSS',
    }
});

module.exports = function(options, sync) {
    return function(){
        console.log('========================================');
        console.log('task vendor for files: ' + options.src);
        console.log('========================================');
        return gulp.src(options.src)
            .on('data', function(file){
                console.log('file: ' + file.basename);
                console.log('========================================')
            })
            .pipe($.if('*.scss',
                $.sass().on('error', $.sass.logError),
            ))
            .pipe($.if('*.scss' && '*.css',
                $.cleanCSS({level: 2}),)
            )
            .pipe($.if('*.js',
                $.terser({toplevel: true})
            ))
            .pipe($.if('!*+(.min).*',
                $.rename({
                    suffix: '.min'
                })
            ))
            .pipe($.if('*.scss',
                $.rename({
                    extname: ".css"
                }),
            ))
            .pipe($.if('*.css',
                gulp.dest(options.buildCSS),
            ))
            .pipe($.if('*.js',
                gulp.dest(options.buildJS),
            ))
            .pipe(sync.stream());
    }
};
