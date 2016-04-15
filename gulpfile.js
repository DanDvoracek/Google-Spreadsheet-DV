// include gulp
var gulp = require('gulp'); 

// include plug-ins
var compass = require('gulp-compass');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Uglify + debug
gulp.task('scripts', function() {
	gulp.src('./src/js/**/*.js')
	.pipe(uglify({mangle: false}).on('error', gutil.log))
	.pipe(concat('main.js'))
	.pipe(gulp.dest('./public/js/'));

});

// Compass task - loaded from the config.rb
gulp.task('compass', function() {
	gulp.src('./src/sass/**/*.scss')
	.pipe(compass({
		config_file: './src/sass/config.rb',
		css: './public/css/',
		sass: './src/sass'
	}));
});

//--- gulp
gulp.task('default', ['scripts', 'compass'], function() {});

//--- gulp watch
gulp.task('watch', function () {
	gulp.watch('./src/js/**/*.js', ['scripts']);
	gulp.watch('./src/sass/**/*.scss', ['compass']);
});