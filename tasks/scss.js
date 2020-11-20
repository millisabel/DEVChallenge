"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    rename: {
        'gulp-group-css-media-queries': 'gcmq',
        'gulp-clean-css': 'cleanCSS',
        'gulp-webp-css': 'webpCSS',
    }
});

const autoprefixer = require('autoprefixer');
const opacity = require('postcss-opacity');
const pseudoelements = require('postcss-pseudoelements');
const vmin = require('postcss-vmin');
const pixrem = require('pixrem');
const will_change = require('postcss-will-change');
const postcssCustomProperties = require('postcss-custom-properties');

const processors = [
    will_change,
    autoprefixer,
    opacity,
    pseudoelements,
    vmin,
    pixrem,
    postcssCustomProperties,
];

module.exports = function(options, sync) {
    return function(){
        console.log('========================================');
        console.log('task SCSS for file: \"' + options.src + '\"');
        console.log('========================================');

        return gulp.src(options.src)
            .on('data', function(file){
                console.log('file: ' + file.basename);
                console.log('========================================')
            })
            .pipe($.if(process.env.NODE_ENV !== 'prod',
                $.sourcemaps.init(),
            ))
            .pipe($.webpCSS())

            .pipe($.sass().on('error', $.sass.logError))
            .pipe($.gcmq())
            .pipe($.postcss(processors))
            .pipe($.csslint())
            .pipe($.if(process.env.NODE_ENV === 'prod',
                $.cleanCSS({level: 2})
            ))
            .pipe($.rename(options.name))
            .pipe($.if(process.env.NODE_ENV === 'prod',
                $.rename({extname: '.min.css'})
            ))
            .pipe($.if(process.env.NODE_ENV !== 'prod',
                $.sourcemaps.write('.')))
            .pipe(gulp.dest(options.build))
            .pipe(sync.stream())
    }
}
