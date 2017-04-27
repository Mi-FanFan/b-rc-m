/**
 * Created by Freeman on 2017/4/27.
 */
var gulp = require('gulp')
var autoprefixer = require('autoprefixer')
var postcss = require('gulp-postcss')
var less = require('gulp-less')
var minifycss = require('gulp-minify-css') // CSS压缩
var concat = require('gulp-concat')       // 合并文件
var rename = require('gulp-rename')        // 重命名
var clean = require('gulp-clean')
var header = require('gulp-header')

var pkg = require('./package.json')
var paths = [
  'components/style/index.less',
  'components/*/style/index.less'
]

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean({force: true}))
})

gulp.task('dist', function () {
  var banner = [
    '/*!',
    ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * Copyright <%= new Date().getFullYear() %> MiFanFan, Inc.',
    ' * Licensed under the <%= pkg.license %> license',
    ' */',
    ''].join('\n')
  var processors = [
    autoprefixer({
      browsers: [
        'iOS >= 7',
        'Android >= 4.1',//移动端项目，参考WeUI的配置
      ]
    }),
  ]
  gulp.src(paths)
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(concat(`${pkg.name}.css`))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['clean'], function () {
  gulp.start('dist')
})
