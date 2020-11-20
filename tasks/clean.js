"use strict";

const del = require('del');


module.exports = function(options) {
    return function(cb){
        console.log('========================================');
        console.log('remove files in: \"' + options.src + '\"');
        console.log('========================================');
        del(options.temp);
        console.log('========================================');
        console.log('remove files in: \"' + options.temp + '\"');
        console.log('========================================');
        del(options.src);
        cb();
    }
}
