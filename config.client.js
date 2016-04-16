'use strict';

Object.defineProperty(exports, "__esModule", {
                                                                                        value: true
});
<<<<<<< HEAD
exports.createClientLogger = exports.baseUrl = exports.appKey = exports.client = exports.environment = undefined;
=======
exports.createClientLogger = exports.baseUrl = exports.port = exports.hostname = exports.appName = exports.environment = exports.appKey = exports.client = undefined;
>>>>>>> f3d34b88cebdc51dfc0f9d05fa8306b9c36478e2

var _configClient = require('./config-client');

var _configClient2 = _interopRequireDefault(_configClient);

var _bunyan = require('bunyan');

var _name = require('./package/name.js');

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

<<<<<<< HEAD
var appKey = _name2.default.replace(/-/g, '_');
var environment = _configClient2.default.environment;
var hostname = _configClient2.default.hostname;
=======
var environment = _configClient2.default.environment;
var appName = _configClient2.default.appName;
var hostname = _configClient2.default.hostname;
var port = _configClient2.default.port;


var baseUrl = 'http' + (environment === 'debug' ? '' : 's') + '://' + hostname;
>>>>>>> f3d34b88cebdc51dfc0f9d05fa8306b9c36478e2

var baseUrl = 'http' + (environment === 'debug' ? '' : 's') + '://' + hostname;

var fakeLogger = function fakeLogger(name) {
<<<<<<< HEAD
                                                                                        return { name: name + '-fake', trace: function trace() {}, debug: function debug() {}, info: function info() {}, warn: function warn() {}, error: function error() {}, fatal: function fatal() {} };
};
var createClientLogger = function createClientLogger(name) {
                                                                                        return process.env.NODE_ENV !== 'production' ? (0, _bunyan.createLogger)({ name: appKey,
                                                                                                                                                                                level: environment === 'debug' ? 'debug' : 'info'
                                                                                        }) : fakeLogger(name);
=======
                                                          return { name: appName + '-fake', trace: function trace() {}, debug: function debug() {}, info: function info() {}, warn: function warn() {}, error: function error() {}, fatal: function fatal() {} };
};
var createClientLogger = function createClientLogger(name) {
                                                          return __DEV__ ? (0, _bunyan.createLogger)({ name: appName,
                                                                                                                    level: 'debug'
                                                          }) : fakeLogger(name);
>>>>>>> f3d34b88cebdc51dfc0f9d05fa8306b9c36478e2
};

exports.environment = environment;
exports.client = _configClient2.default;
exports.appKey = appKey;
exports.environment = environment;
exports.appName = appName;
exports.hostname = hostname;
exports.port = port;
exports.baseUrl = baseUrl;
exports.createClientLogger = createClientLogger;
