var gulp = require('gulp');
var sprity = require('sprity');
var sprityJS = require('sprity-js');
var del = require('del');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');
var gulpCopy = require('gulp-copy');
var config = require('./config');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');


gulp.task('sprites:generatejs', () => {
  return sprity.src({
      src: './resources/**/*.{png,jpg}',
      style: './sprite.js',
      dimension: [{
        ratio: 1,
        dpi: 72
      }],
      split: true,
      orientation: 'binary-tree',
      margin: 0,
      processor: sprityJS
    })
    .pipe(gulpif('*.png', gulp.dest('./public/images/sprites'), gulp.dest('./src/shared/theme')))
});


gulp.task('sprites:generate', () => {
  return sprity.src({
      src: './resources/**/*.{png,jpg}',
      style: './sprite.scss',
      dimension: [{
        ratio: 1,
        dpi: 72
      }],
      split: true,
      orientation: 'binary-tree',
      margin: 0,
      processor: 'sass',
    })
    .pipe(gulpif('*.png', gulp.dest('./public/images/sprites'), gulp.dest('./src/shared/theme')))
});

gulp.task('clean:sprites', () => {
  return del([
    './public/images/sprites'
  ]);
});

gulp.task('replace:sprite_url', () => {
  gulp.src(['./public/images/sprites/sprite.js'])
    .pipe(replace(/\.\.\/images/g, 'http://' + config.get('ipaddress') + ':' + config.get('port') + '/images/sprites'))
    .pipe(gulp.dest('./src/shared'));
});

// gulp.task('replace:sprite_url', () => {
//   gulp.src(['./src/shared/theme/sprite.scss'])
//     .pipe(replace(/\.\.\/images/g, '/images/sprites'))
//     .pipe(gulp.dest('./src/shared/theme/'));
// });

gulp.task('clean:spritejs', () => {
  del(['./public/images/sprites/sprite.js']);
})

gulp.task('build:sprites', (cb) => {
  runSequence('clean:sprites', 'sprites:generate', ['replace:sprite_url', 'clean:spritejs'], cb);
});

gulp.task('clean-minify', function() {
  del(['./static/css/screen.min.css', './static/js/app.min.js']);
});

gulp.task('minify-css', function() {
  gulp.src('./static/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(concat('screen.min.css'))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('minify-js', function() {
  gulp.src('static/js/app.js')
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('static/js'))
});
