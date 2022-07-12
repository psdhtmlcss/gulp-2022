const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// Конфигурация
const path = require('./config/path.js');

// Задачи
const clear = require('./task/clear.js');
const pug = require('./task/pug.js');
const scss = require('./task/scss.js');
const js = require('./task/js.js');
const img = require('./task/img.js');

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
  watch(path.scss.watch, scss).on('all', browserSync.reload);
  watch(path.js.watch, js).on('all', browserSync.reload);
  watch(path.img.watch, img).on('all', browserSync.reload);
};

exports.pug = pug;
exports.watch = watcher;
exports.clear = clear;
exports.scss = scss;
exports.js = js;
exports.img = img;

exports.dev = series(
  clear,
  parallel(pug, scss, js, img),
  parallel(watcher, server)
);