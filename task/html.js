const { src, dest } = require('gulp');

const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// Обработка HTML
const html = () => {
  return src('./src/html/*.html')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(fileInclude())
    .pipe(size({ title: 'size before' }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(size({ title: 'size after' }))
    .pipe(dest('./public'))
};

module.exports = html;