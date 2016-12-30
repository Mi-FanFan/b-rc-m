/**
 * Created by Freeman on 2016/12/26.
 */
var gulp = require('gulp');
//var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

// 编译less
gulp.task('css', function () {
  gulp.src('components/style/index.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie > 8']
    }))
    .pipe(rename('b-rc-m.css'))
    .pipe(gulp.dest('lib'));
});

gulp.task('default', ['css']);
