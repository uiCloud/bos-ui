'use strict'

const { series, src, dest } = require('gulp')
const less = require('gulp-less')  // 编译gulp工具
const autoprefixer = require('gulp-autoprefixer')  // 添加厂商前缀
const cssmin = require('gulp-cssmin')  // 压缩css

function compile() {
  return src([
    './src/**/*.less',  // src下的所有less文件
    '!src/less/**/{reset,test}.less' // 除了reset.less和test.less外
  ])
    .pipe(less())  // 把scss文件编译成css
    .pipe(autoprefixer({  // 基于目标浏览器版本，添加厂商前缀
      cascade: false
    }))
    .pipe(cssmin())  // 压缩css
    .pipe(dest('./lib')) // 输出到lib下
}

function copyFont() {
  return src('./src/font/**')  // 读取src/fonts下的所有文件
    .pipe(cssmin())
    .pipe(dest('./lib/font')) // 输出到lib/fonts下
}

exports.build = series(compile, copyFont)
