'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDevTool = getDevTool;

var _configServer = require('../config.server.js');

function getDevTool(name) {
  if (process.env.NODE_ENV === 'hot') return '#eval';

  /*
  if(name === 'shim' || name === 'static') // TODO: FIGURE OUT WHY SOURCE MAP BREAKS IE8
    return 'inline-source-map'
  return server.flags.dev ? 'cheap-module-eval-source-map' : 'source-map'
  */
}