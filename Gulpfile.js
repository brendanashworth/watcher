var gulp = require('gulp');

var del = require('del'),
	coffee = require('gulp-coffee'),
	mocha = require('gulp-mocha'),
	less = require('gulp-less');

require('coffee-script').register();

gulp.task('default', ['clean', 'coffee', 'less', 'statics']);

gulp.task('test', function() {
	gulp.src('test/**/*.coffee')
		.pipe(mocha({reporter: 'spec'}));
});

gulp.task('clean', function(cb) {
	del('dist/', cb);
});

gulp.task('coffee', function() {
	return gulp.src('src/**/*.coffee')
		.pipe(coffee())
		.pipe(gulp.dest('dist'));
});

gulp.task('less', function() {
	return gulp.src('static/asset/css/dashboard.less')
		.pipe(less())
		.pipe(gulp.dest('dist/static/asset/css'));
});

gulp.task('statics', function() {
	return gulp.src('static/**/*.{html,js,png}')
		.pipe(gulp.dest('dist/static'));
});