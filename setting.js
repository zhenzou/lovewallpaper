const HomeDir = require('home-dir');
const path = require('path');
const fs = require('fs');

const app = 'love-wallpaper';
const configDir = HomeDir(path.join('.config', app));
const configName = 'love-wallpaper.json';

module.exports = {
  config: null,
  app: app,
  hostname: 'open.lovebizhi.com/baidu_rom.php',
  setting: function () {
    if ( ! setting ) {
     setting=  load();
    }
    return setting;
  },
  save: function (update) {
    if ( update ) {
      let configPath = path.join(configDir, configName);
      update = Object.assign(this.setting(), update);
      return new Promise((resolve, reject) => {
        fs.writeFile(configPath, JSON.stringify(update, null, '  '), (err) => {
          if ( err ) reject(err);
          else {
            setting = update;
            resolve(setting);
          }
        });
      });
    } else {
      return new Promise((resolve) => resolve(setting));
    }
  }
};

let setting;

let defaultSetting = {
  version: '2.0.2',
  savePath: HomeDir('Wallpaper/'),
};

function init(p) {
  fs.writeFileSync(p, JSON.stringify(defaultSetting, null, '  '));
  return defaultSetting;
}

function load() {
  if ( ! fs.existsSync(configDir) ) fs.mkdirSync(configDir);
  let configPath = path.join(configDir, configName);
  if ( ! fs.existsSync(configPath) ) {
    return init(configPath);
  } else {
    return update(configPath);
  }
}

//将 2.0.0格式的字符串解析为20000
function parseVersion(p) {
  let arrays = p.split('.');
  return arrays[0] * 10000 + arrays[1] * 100 + arrays[2] * 1;
}

function update(p) {
  let data = JSON.parse(fs.readFileSync(p));
  if ( parseVersion(defaultSetting.version) > parseVersion(data.version) ) {
    let obj = Object.assign(data, defaultSetting);
    fs.writeFileSync(p, JSON.stringify(obj, null, '  '));
    return obj;
  }
  return data;
}