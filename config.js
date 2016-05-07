'use strict';

Object.defineProperty(exports, "__esModule", {
                                                                        value: true
});
exports.dependencyNames = exports.resolveRoot = exports.__rootname = exports.log = exports.baseUrl = exports.packageJSON = exports.server = exports.client = exports.IS_BROWSER = exports.IS_DEV = exports.IS_HOT = exports.noop = exports.name = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bunyan = require('bunyan');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var name = exports.name = '@tixinc/js';
var noop = exports.noop = function noop() {};
var IS_HOT = exports.IS_HOT = process.env.NODE_ENV === 'hot';
var IS_DEV = exports.IS_DEV = process.env.NODE_ENV !== 'production';
var IS_BROWSER = exports.IS_BROWSER = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object';

var client = exports.client = require('./config-client.json');
var server = exports.server = IS_BROWSER ? noop() : require('./config-server.json');
var configJSON = IS_BROWSER ? client : server;
var packageJSON = exports.packageJSON = IS_BROWSER ? { name: name } : require('./package.json');

var baseUrl = exports.baseUrl = 'http' + (client['_configuration_'] === 'debug' ? '' : 's') + '://' + client.hostname;

var level = (configJSON.log || { level: 'debug' }).level || 'debug';
var log = exports.log = !IS_DEV && IS_BROWSER ? { name: name, trace: noop, debug: noop, info: noop, warn: noop, error: noop, fatal: noop } : (0, _bunyan.createLogger)({ name: name, level: level });

var __rootname = exports.__rootname = IS_BROWSER ? '/' : __dirname;
var resolveRoot = exports.resolveRoot = function resolveRoot() {
                                                                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                                                                                                                                args[_key] = arguments[_key];
                                                                        }

                                                                        return IS_BROWSER ? '' + __rootname + args.join('/') : _path2.default.resolve.apply(_path2.default, [__rootname].concat(args));
};

var _packageJSON$dependen = packageJSON.dependencies;
var dependencies = _packageJSON$dependen === undefined ? {} : _packageJSON$dependen;
var _packageJSON$devDepen = packageJSON.devDependencies;
var devDependencies = _packageJSON$devDepen === undefined ? {} : _packageJSON$devDepen;
var _packageJSON$peerDepe = packageJSON.peerDependencies;
var peerDependencies = _packageJSON$peerDepe === undefined ? {} : _packageJSON$peerDepe;
var _packageJSON$optional = packageJSON.optionalDependencies;
var optionalDependencies = _packageJSON$optional === undefined ? {} : _packageJSON$optional;
var dependencyNames = exports.dependencyNames = IS_BROWSER ? noop() : Array.from(new Set([].concat(_toConsumableArray(Object.keys(dependencies)), _toConsumableArray(Object.keys(devDependencies)), _toConsumableArray(Object.keys(peerDependencies)), _toConsumableArray(Object.keys(optionalDependencies)))));
