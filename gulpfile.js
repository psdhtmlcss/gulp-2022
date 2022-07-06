const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// Конфигурация
const path = require('./config/path.js');

// Задачи
const clear = require('./task/clear.js');
const pug = require('./task/pug.js');
const css = require('./task/css.js');

// Сервер
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root
    }
  });
};

// Наблюдение
const watcher = () => {
  watch(path.pug.watch, pug).on('all', browserSync.reload);
  watch(path.css.watch, css).on('all', browserSync.reload);
};

exports.pug = pug;
exports.watch = watcher;
exports.clear = clear;
exports.css = css;

exports.dev = series(
  clear,
  parallel(pug, css),
  parallel(watcher, server)
);

// Посмотреть список всех доступных задач можно командой gulp --tasks