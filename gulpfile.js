"use strict";

var fs = require('fs');
var gulp = require('gulp');
var gulputil = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var replace = require("gulp-replace");

var BUILDDIR = './build';
var pkg = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('initialize', function(callback) {
	fs.exists(BUILDDIR, function(found) {
		if (!found) {
			fs.mkdir(BUILDDIR, function(err) {
				if (!err) gulputil.log('Build directory created...');
				else gulputil.log('Build directory creation error : '+err+'...');

				if (typeof(callback) == 'function') callback();
			});
		}
		else {
			if (typeof(callback) == 'function') callback();
		}
	});
});

gulp.task('minify', function(callback) {
	return gulp.src('./src/index.js')
			.pipe(replace('$_VERSION', pkg['version']))
			.pipe(uglify())
			.on('error', function (err) { gulputil.log(gutil.colors.red('[Error]'), err.toString()); })
			.pipe(rename({basename : 'microgear'}))
			.pipe(gulp.dest('./build'));
});

gulp.task('build', ['initialize','minify'], function(callback) {

});