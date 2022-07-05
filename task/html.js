const { src, dest } = require('gulp');

// Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

// Плагины
const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const html = () => {
  return src(path.html.src)
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(fileInclude())
    .pipe(size({ title: 'size before' }))
    .pipe(htmlmin(app.htmlmin))
    .pipe(size({ title: 'size after' }))
    .pipe(dest(path.html.dest))
};

module.exports = html;