var gulp = require('gulp');
var fs   = require('fs');

// Third part extension using redCORE
try {
	var config = require('../../../../../gulp-config.json');
}
catch(err) {
	var config = require('../../../../gulp-config.json');
}

var watchInterval = 500;
if (typeof config.watchInterval !== 'undefined') {
	watchInterval = config.watchInterval;
}

// Dependencies
var browserSync = require('browser-sync');
var del         = require('del');

var baseTask  = 'plugins.redpayment.paypal';

var subextensionPath = './redCORE/plugins/redpayment/paypal';
var directPath       = './plugins/redpayment/paypal';

var extPath   = fs.existsSync(subextensionPath) ? subextensionPath : directPath;

// Clean
gulp.task('clean:' + baseTask, function() {
	return del(config.wwwDir + '/plugins/redpayment/paypal', {force : true});
});

// Copy
gulp.task('copy:' + baseTask, ['clean:' + baseTask], function() {
	return gulp.src( extPath + '/**')
		.pipe(gulp.dest(config.wwwDir + '/plugins/redpayment/paypal'));
});

// Watch
gulp.task('watch:' + baseTask,
	[
		'watch:' + baseTask + ':plugin'
	],
	function() {
});

// Watch: plugin
gulp.task('watch:' + baseTask + ':plugin', function() {
	gulp.watch(extPath + '/**/*',
	{ interval: watchInterval },
	['copy:' + baseTask, browserSync.reload]);
});
