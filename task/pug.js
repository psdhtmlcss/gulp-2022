const { src, dest } = require('gulp');
const pugs = require('gulp-pug');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const pug = () => {
  return src('./src/pug/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(pugs({
      pretty: true,
      data: {
        news: require('../data/news.json')
      }
    }))
    .pipe(dest('./public'))
};

module.exports = pug;