const fetch = require('node-fetch');
const { join } = require('path');
const { createWriteStream, existsSync, mkdirSync } = require('fs');
const url = require('url');

const { hostname, setting } = require('./setting');

const defaultOpts = {
  width: '1920',
  height: '1080',
};
const headers = {
  Cookie: 'pgv_pvid=1490663587; __auc=01b3bcc7159d4217e276ee2c39f; _ga=GA1.2.1530648414.1485322682',
  Host: 'open.lovebizhi.com',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
};

// is { credentials: 'include' } necessary？
module.exports = class API {
  constructor(opts = {}) {
    opts = Object.assign(defaultOpts, opts);
    this.width = opts.width;
    this.height = opts.height;
    this.initial = false;
  }
  load(size = { width: this.width, height: this.height }) {
    const destUrl = url.format({
      protocol: 'http',
      hostname,
      query: size,
    });
    console.log('initial', destUrl);
    return fetch(destUrl, { headers })
      .then(res => res.json())
      .then((json) => {
        this.initial = true;
        this.urlMap = json;
        // console.log(this, this.urlMap);
        return json;
      }).catch(err => console.log('fetch failed', err));
  }
  fetch(destUrl) {
    return fetch(destUrl, { headers })
      .then(res => res.json())
      .catch(err => console.log('fetch failed', err));
  }
  download(destUrl) {
    return new Promise((resolve, reject) => {
      let savePath = setting().savePath;
      if ( ! existsSync(savePath) ) mkdirSync(savePath);
      const fileName = destUrl.match(/[^\/]+$/)[0];
      const filePath = join(savePath, fileName);
      if (existsSync(filePath)) {
        resolve(filePath);
        return;
      }
      fetch(destUrl)
        .then(res => res.body
          .pipe(createWriteStream(filePath))
          .on('close', () => resolve(filePath))
          .on('error', err => reject(err))
          ).catch(err => reject(err));
    });
  }
};
