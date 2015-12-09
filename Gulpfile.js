/**
 * Created by Nikolay Glushchenko <nick@nickalie.com> on 08.09.2015.
 */

var gulp = require('gulp');
var resources = require('./gulp/resources');
var bower = require('./gulp/bower');
var common = require('./gulp/common');
var pack = require('./gulp/package');
var partials = require('./gulp/partials');
var templates = require('./gulp/templates');
var webserver = require('./gulp/webserver');
var exit = require('gulp-exit');
var reloadConnection = require('./gulp/reload-connection');

require('./gulp/styles');
require('./gulp/bundle');
require('./gulp/dev-bundle');
require('./gulp/rollup/tasks');
require('./gulp/plugin');
require('./gulp/cleanup');

var port = common.pkg.port || 8101;

gulp.task('resources', ['del-main-dist'], resources);
gulp.task('dependencies', ['resources'], bower);
gulp.task('package', ['all'], pack);
gulp.task('all', ['bundle', 'styles', 'resources']);
gulp.task('templates', ['partials'], templates);
gulp.task('partials', ['del-main-dist'], partials);
gulp.task('default', ['package', 'webserver', 'watch']);

gulp.task('webserver', webserver(port));

gulp.task('dev-package', ['dev-bundle', 'dev-bundle-examples', 'styles', 'resources'], pack);

gulp.task('watch', ['dev-package', 'dev-bundle-tests', 'webserver'], function() {
    gulp.watch(['src/**/*.js'], ['dev-recompile'], reloadConnection);
    gulp.watch(['src/.dev-loader.js'], ['dev-bundle'], reloadConnection);
    gulp.watch(['examples/**/*.js'], ['dev-recompile-examples'], reloadConnection);
    gulp.watch(['examples/.dev-loader.js'], ['dev-bundle-examples'], reloadConnection);
    gulp.watch(['test/**/*.js'], ['dev-recompile-tests'], reloadConnection);
    gulp.watch(['test/.dev-loader.js'], ['dev-bundle-tests'], reloadConnection);
    gulp.watch('src/**/*.hbs', ['templates'], reloadConnection);
    gulp.watch('style/**/*.*', ['styles'], reloadConnection);
});

