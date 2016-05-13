#! /usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _lib = require('../lib');

var _path = require('path');

var _config = require('../config');

var _pmx = require('pmx');

var _pmx2 = _interopRequireDefault(_pmx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pmx = _pmx2.default.init({ http: true,
              errors: true,
              ignore_routes: [],
              network: true // Network monitoring at the application level
              , ports: true // Shows which ports your app is listening on (default: false)
});

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

var serverMap = (0, _lib.getServerMap)(paths);
//serverMap.get('https').start()
serverMap.get('http').start();