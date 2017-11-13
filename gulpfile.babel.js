import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import notifier from 'node-notifier';
import gutil from 'gulp-util';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';
import stylelint from 'stylelint';
import stylefmt from 'gulp-stylefmt';
import reporter from 'postcss-reporter';

import sass from 'gulp-sass';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';

import csso from 'gulp-csso';

const browserSync = require('browser-sync').create();

gulp.task('js', () => {
	return gulp.src([
		'./js/**/*.js',
		'!./js/**/*.min.js'
	])
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('potato.min.js'))
		.pipe(babel({presets: ['es2015'], compact: false, minified: true}).on('error', function (err) {
			gutil.log(gutil.colors.bold.red('Babel compile error'), err.message);
			notifier.notify({title: 'Babel compile error', message: err.message});
			this.emit('end');
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./js/'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('sass', () => {
	return gulp.src([
		'./stylesheets/sass/*.scss'
	])
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded',
			precision: 8
		}).on('error', function (err) {
			gutil.log(gutil.colors.bold.red('Sass compile error'), err.message);
			notifier.notify({title: 'Sass compile error', message: err.message});
			this.emit('end');
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./stylesheets/css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('less', () => {
	return gulp.src([
		'./stylesheets/less/*.less'
	])
		.pipe(sourcemaps.init())
		.pipe(less().on('error', function (err) {
			gutil.log(gutil.colors.bold.red('Less compile error'), err.message);
			notifier.notify({title: 'Less compile error', message: err.message});
			this.emit('end');
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./stylesheets/css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('postprocess', () => {
	return gulp.src([
		'./stylesheets/css/*.css',
		'!./stylesheets/css/*.min.css'
	])
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(postcss([
			autoprefixer(),
			mqpacker()
		]))
		.pipe(stylefmt())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./stylesheets/css/'))
		.pipe(csso())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./stylesheets/css/'))
		.pipe(browserSync.stream());
});

gulp.task('test-css', () => {
	return gulp.src([
		'./stylesheets/css/*.css',
		'!./stylesheets/css/*.min.css'
	])
		.pipe(postcss([
			stylelint(),
			reporter({ clearReportedMessages: true })
		]));
});

gulp.task('watch', () => {
	gulp.watch(['./stylesheets/sass/**/*.scss'], ['sass']);
	gulp.watch(['./stylesheets/less/**/*.less'], ['less']);
	gulp.watch(['./js/**/*.js'], ['js']);
	gulp.watch(['./examples/*.html']).on('change', browserSync.reload);
});

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: "./",
			index: "/examples/index.html"
		}
	});
});

gulp.task('build-sass', function () {
	runSequence('sass', ['postprocess', 'js'], 'test-css');
});

gulp.task('build-less', function () {
	runSequence('less', ['postprocess', 'js'], 'test-css');
});

gulp.task('default', ['browserSync', 'watch']);
