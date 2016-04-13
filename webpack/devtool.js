'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDevTool = getDevTool;

var _configServer = require('../config.server.js');

function getDevTool(name) {
  if (process.env.NODE_ENV === 'hot') return '#eval';
}