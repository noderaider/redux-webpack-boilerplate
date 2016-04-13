'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntry = getEntry;

var _configServer = require('../config.server.js');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHotUrl = function getHotUrl(name) {
  var path = _configServer.baseUrl + '/__webpack_hmr';
  var timeout = 2000;
  var overlay = true;
  var reload = true;
  var noInfo = false;
  var quiet = false;
  return 'webpack-hot-middleware/client'; //?path=${path}&timeout=${timeout}&overlay=${overlay}&reload=${reload}&noInfo=${noInfo}&quiet=${quiet}`
};

function maybeHotEntry(name) {
  for (var _len = arguments.length, entries = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    entries[_key - 1] = arguments[_key];
  }

  if (process.env.NODE_ENV === 'hot') {
    return [getHotUrl(name)].concat(entries);
  }
  return entries[0];
}

function getEntry(name) {
  if (name === 'static') {
    return { polyfill: '../src/public/static/polyfill.js' };
  } else if (name === 'vendor') {
    return { vendor: ['expose?React!react', 'expose?ReactDOM!react-dom', 'expose?ReactCSSTransitionGroup!react/lib/ReactCSSTransitionGroup'
      //, 'script!vendor/tinymce/tinymce.min.js'
      ]
    };
  }

  var tinyMCEPlugins = [''];
  return { 'loading': maybeHotEntry(name, '../src/app/entry/loading'),
    'app': maybeHotEntry(name, '../src/app/entry/app')
  };
}