"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function(options, sync) {
    return function(){
        console.log('========================================')
        console.log('task ES5 for files: \"' + options.src + '\"')
        console.log('========================================')
        return gulp.src(options.src)
            .on('data', function(file){
                console.log('file: ' + file.basename);
                console.log('========================================')
            })
            .pipe($.include()).on('error', console.log)
            .pipe($.if(process.env.NODE_ENV !== 'prod',
                $.sourcemaps.init(),
            ))

            .pipe($.babel({
                presets: ['@babel/env']
            }))
            .pipe($.autopolyfiller(options.namePolyfill))
            .pipe($.rename(options.name))
            .pipe($.uglyfly())
            .pipe($.if(process.env.NODE_ENV === 'prod',
                $.rename({extname: '.min.js'})
            ))
            .pipe($.if(process.env.NODE_ENV !== 'prod',   $.sourcemaps.write(),
            ))
            .pipe(gulp.dest(options.build))
            .pipe(sync.stream());
    }

}
