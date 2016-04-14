'use strict';

Object.defineProperty(exports, "__esModule", {
                                                value: true
});
exports.createClientLogger = exports.createServerLogger = exports.resolveRoot = exports.__rootname = exports.baseUrl = exports.client = exports.server = undefined;

var _configServer = require('./config-server.json');

var _configServer2 = _interopRequireDefault(_configServer);

var _path = require('path');

var _bunyan = require('bunyan');

var _config = require('./config.client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __rootname = __dirname;
var resolveRoot = function resolveRoot() {
                                                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                                                                                args[_key] = arguments[_key];
                                                }

                                                return _path.resolve.apply(undefined, [__rootname].concat(args));
};

var createServerLogger = function createServerLogger(name) {
                                                return (0, _bunyan.createLogger)({ name: _config.appKey,
                                                                                                level: 'debug'
                                                });
};

exports.server = _configServer2.default;
exports.client = _config.client;
exports.baseUrl = _config.baseUrl;
exports.__rootname = __rootname;
exports.resolveRoot = resolveRoot;
exports.createServerLogger = createServerLogger;
exports.createClientLogger = _config.createClientLogger;
