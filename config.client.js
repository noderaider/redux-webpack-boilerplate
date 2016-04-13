'use strict';

Object.defineProperty(exports, "__esModule", {
                                                          value: true
});
exports.createClientLogger = exports.baseUrl = exports.appKey = exports.client = undefined;

var _configClient = require('./config-client');

var _configClient2 = _interopRequireDefault(_configClient);

var _bunyan = require('bunyan');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseUrl = 'http' + (_configClient2.default['_configuration_'] === 'debug' ? '' : 's') + '://' + _configClient2.default.hostname;

var appKey = require('./package').name.replace(/-/g, '_');

var fakeLogger = function fakeLogger(name) {
                                                          return { name: name + '-fake', trace: function trace() {}, debug: function debug() {}, info: function info() {}, warn: function warn() {}, error: function error() {}, fatal: function fatal() {} };
};
var createClientLogger = function createClientLogger(name) {
                                                          return __DEV__ ? (0, _bunyan.createLogger)({ name: appKey,
                                                                                                                    level: 'debug'
                                                          }) : fakeLogger(name);
};

exports.client = _configClient2.default;
exports.appKey = appKey;
exports.baseUrl = baseUrl;
exports.createClientLogger = createClientLogger;
