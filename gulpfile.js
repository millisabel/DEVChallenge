"use strict";

process.env.NODE_ENV = 'prod';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const baseIn = './src';
const baseOut = './dist';
const baseTemp = './temp';

function mode_prod(cb) {
    process.env.NODE_ENV = 'prod';
    cb();
}

function lazyRequireTask(taskName, path, options){
    options.taskName = taskName;
    gulp.task(taskName, function(cb){
        let sync = browserSync;
        let task = require(path).call(this, options, sync);
        return task(cb);
    });
}

lazyRequireTask('vendor', './tasks/vendorFiles', {
    src: [
        baseIn + '/scss/vendor/**/*',
        baseIn + '/js/vendor/**/*.js',
        '!' + baseIn + '/scss/vendor/import/**',
        '!' + baseIn + '/js/vendor/import/**'
    ],
    buildCSS:  baseOut + '/css/',
    buildJS:  baseOut + '/js/',
});

lazyRequireTask('clean', './tasks/clean', {src: baseOut, temp: baseTemp});

lazyRequireTask('html', './tasks/html', {
    src: [baseIn + '/**/*.html'],
    build: baseOut});

lazyRequireTask('scss', './tasks/scss', {
    src: baseIn + '/scss/main.scss',
    build: baseOut + '/css/',
    name: 'main.css'});

lazyRequireTask('scripts', './tasks/scripts', {
    src: baseIn + '/js/main.js',
    build: baseOut + '/js/',
    name: 'script.js'});

lazyRequireTask('es5', './tasks/es5', {
    src: [baseIn + 'js/main.js', '!' + baseIn + '/js/vendor/**/*'],
    build: baseOut + '/js/',
    name: 'es5-script.js',
    namePolyfill: 'result_polyfill_file.js'});

lazyRequireTask('imgMin', './tasks/imgMin', {
    src: [baseIn + '/images/**/*', '!' + baseIn + '/images/sprites/**'],
    build: baseOut + '/images/'});

lazyRequireTask('spriteSvg', './tasks/spriteSvg', {
    src: baseIn + '/images/sprites/svg/',
    build: baseOut +  '/images/sprites/',
    temp: baseTemp + '/css'});

lazyRequireTask('spritePng', './tasks/spritePng', {
    src: baseIn + '/images/sprites/png/',
    build: baseOut +  '/images/sprites/',
    temp: baseTemp + '/css'});

lazyRequireTask('favIco', './tasks/favIco', {
    src: baseIn + '/favicon/**/*',
    build: baseOut + '/favicon/',
    temp: baseTemp,
    name: "favicon.html",
    path: "@@webRoot/favicon/"});

lazyRequireTask('fonts', './tasks/fonts', {
    src: baseIn + '/fonts/**/*.ttf',
    build: baseOut + '/fonts/'});

lazyRequireTask('valid', './tasks/validators', {
    html: baseOut + '/**/*.html',
    css: baseOut + '/**/*.css'});

lazyRequireTask('deploy', './tasks/deploy', {
    src: baseOut + '/**/*'});

gulp.task('watch', function(){
    browserSync.init({
        server: {
            baseDir: baseOut,
        }
    });
    gulp.watch(baseIn + '/**/*.html', gulp.series('html'));
    gulp.watch(baseIn + '/**/*.scss', gulp.series('scss'));
    gulp.watch(baseIn + '/**/*vendor/**/*', gulp.series('vendor'));
    gulp.watch(baseIn + '/**/*.js', gulp.series('scripts'));
    gulp.watch([baseIn + '/images/**', '!' + baseIn + '/images/sprites/**'], gulp.series('imgMin'));
    gulp.watch( baseIn + '/images/sprites/svg/**/*', gulp.series('spriteSvg'));
    gulp.watch(baseIn + '/fonts/**/*.ttf', gulp.series('fonts'));
    gulp.watch(baseIn + '/favicon/**/*', gulp.series('favIco'));

    gulp.watch(baseOut + '**/*.html').on('change', browserSync.reload);
});

gulp.task('build',
    gulp.series(
        'clean',
        'favIco',
        'imgMin',
        'spriteSvg',
        'fonts',
        'vendor',
        gulp.parallel(
            'html',
            'scss',
            'scripts',
            ),
    ));

gulp.task('dev',
    gulp.series('build', 'watch')
);

gulp.task('prod',
    gulp.series( mode_prod, 'build')
);
