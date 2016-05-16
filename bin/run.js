#! /usr/bin/env node
'use strict';

require('babel-polyfill');

var _config = require('../config');

try {
  var paths = { NODE_ROOT: _config.__rootname,
    NODE_MODULES_ROOT: (0, _config.resolveRoot)('node_modules'),
    SERVER_CONFIG_PATH: (0, _config.resolveRoot)('config-server.json'),
    CLIENT_CONFIG_PATH: (0, _config.resolveRoot)('config-client.json'),
    PUBLIC_ROOT: (0, _config.resolveRoot)('public'),
    ASSETS_ROOT: (0, _config.resolveRoot)('public/assets'),
    STATIC_ROOT: (0, _config.resolveRoot)('public/static'),
    IMAGES_ROOT: (0, _config.resolveRoot)('public/static/images'),
    APP_ROOT: (0, _config.resolveRoot)('app'),
    BIN_ROOT: (0, _config.resolveRoot)('bin'),
    LOG_ROOT: (0, _config.resolveRoot)('log'),
    DOC_ROOT: (0, _config.resolveRoot)('doc')
  };

  var server = require('../lib/server').default({ paths: paths });
  //server.get('https').start()
  server.get('http').start();
} catch (err) {
  _config.log.fatal(err, 'A fatal error occurred.');
}