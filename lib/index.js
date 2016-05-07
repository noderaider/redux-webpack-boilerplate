'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServerMap = undefined;

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bunyan = require('bunyan');

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getServerMap = exports.getServerMap = function getServerMap(paths) {
  return (0, _server2.default)({ paths: paths });
};