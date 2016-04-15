'use strict';

Object.defineProperty(exports, "__esModule", {
                                                                                        value: true
});
exports.createClientLogger = exports.baseUrl = exports.appKey = exports.client = exports.environment = undefined;

var _configClient = require('./config-client');

var _configClient2 = _interopRequireDefault(_configClient);

var _bunyan = require('bunyan');

var _name = require('./package/name.js');

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appKey = _name2.default.replace(/-/g, '_');
var environment = _configClient2.default.environment;
var hostname = _configClient2.default.hostname;

var baseUrl = 'http' + (environment === 'debug' ? '' : 's') + '://' + hostname;

var fakeLogger = function fakeLogger(name) {
                                                                                        return { name: name + '-fake', trace: function trace() {}, debug: function debug() {}, info: function info() {}, warn: function warn() {}, error: function error() {}, fatal: function fatal() {} };
};
var createClientLogger = function createClientLogger(name) {
                                                                                        return process.env.NODE_ENV !== 'production' ? (0, _bunyan.createLogger)({ name: appKey,
                                                                                                                                                                                level: environment === 'debug' ? 'debug' : 'info'
                                                                                        }) : fakeLogger(name);
};

exports.environment = environment;
exports.client = _configClient2.default;
exports.appKey = appKey;
exports.baseUrl = baseUrl;
exports.createClientLogger = createClientLogger;
