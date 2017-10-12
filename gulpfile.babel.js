import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import notifier from 'node-notifier';
import gutil from 'gulp-util';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
const browserSync = require('browser-sync').create();

gulp.task('js', () => {
  return gulp.src([
    './js/**/*.js'
  ])
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(concat('potato.min.js'))
  .pipe(babel({presets: ['es2015'], compact: false, minified: true}).on('error', function(err) {
    gutil.log(gutil.colors.bold.red('Babel compile error'), err.message);
    notifier.notify({title: 'Babel compile error',message: err.message});
    this.emit('end');
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./js/'))
  .pipe(browserSync.reload({stream: true}));
})

gulp.task('sass', () => {
  return gulp.src([
    './stylesheets/sass/**/*.scss',
    '!./stylesheets/sass/**/_*.scss'
  ])
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(concat('potato.css'))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('./stylesheets/css/'))
  .pipe(sass({outputStyle: 'compressed'}).on('error', function(err) {
    gutil.log(gutil.colors.bold.red('Sass compile error'), err.message);
    notifier.notify({title: 'Sass compile error',message: err.message});
    this.emit('end');
  }))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./stylesheets/css/'))
  .pipe(browserSync.stream());
})

gulp.task('watch', () => {
  gulp.watch(['./stylesheets/sass/**/*.scss', '!./stylesheets/sass/**/_*.scss'], ['sass'])
  gulp.watch(['./js/**/*.js'], ['js'])
  gulp.watch(['./examples/*.html']).on('change', browserSync.reload);
})

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "/examples/index.html"
    }
  });
});

// gulp.task('default', ['js', 'sass', 'browserSync', 'watch']);
gulp.task('default', ['js', 'browserSync', 'watch']);
