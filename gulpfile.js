var gulp = require('gulp');

var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');

gulp.task('sass', function() {
	return gulp.src('app/scss/style.scss')
		.pipe( sass() )
		.pipe( gulp.dest('dist') )
		.pipe( gulp.dest('app/css') )
});

gulp.task('js', function() {
	return gulp.src('app/js/main.js')
		.pipe( gulp.dest('dist') )
});

gulp.task('minify:html', function() {
  return gulp.src('app/*.html')
    .pipe( htmlmin({collapseWhitespace: true}) )
    .pipe( gulp.dest('') )
});

gulp.task('watch', function() {
	gulp.watch('app/scss/*.scss', ['sass']);
	gulp.watch('app/js/*.js', ['js']);
	gulp.watch('app/*.html', ['minify:html']);
});