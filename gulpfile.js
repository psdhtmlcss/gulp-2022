const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// Конфигурация
const path = require('./config/path.js');

// Задачи
const clear = require('./task/clear.js');
const pug = require('./task/pug.js');

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
  watch(path.pug.src, pug).on('all', browserSync.reload);
};

exports.pug = pug;
exports.watch = watcher;
exports.clear = clear;

exports.dev = series(
  clear,
  pug,
  parallel(watcher, server)
);

// Посмотреть список всех доступных задач можно командой gulp --tasks