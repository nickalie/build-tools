var gulp = require('gulp');
var replace = require('gulp-replace');

module.exports = function(srcDir) {
    //return replace('../../' + srcDir + '/', '../src/'); //this loads correct sourcemaps for examples if used without uglifier
    return replace('../../' + srcDir + '/', '/'); //this makes uglifier not error about missing files, but it doesn't work still.
};
