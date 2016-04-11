'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.getResolve = getResolve;
exports.getResolveLoader = getResolveLoader;

var _config = require('../config.server');

var _alias = require('./alias');

function getResolve(name) {
        return { root: [_config.__rootname],
                alias: (0, _alias.getAlias)(name),
                fallback: (0, _config.resolveRoot)('node_modules'),
                extensions: ['', '.jsx', '.js', '.json']
        };
}

function getResolveLoader(name) {
        return { root: (0, _config.resolveRoot)('node_modules'),
                fallback: (0, _config.resolveRoot)('node_modules'),
                extensions: ['', '.jsx', '.js', '.json']
        };
}