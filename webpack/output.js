'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOutput = getOutput;

var _configServer = require('../config.server.js');

var _path = require('path');

var getPath = function getPath(name) {
    switch (name) {
        case 'lambda':
            return (0, _configServer.resolveRoot)('lambda');
        case 'static':
            return (0, _configServer.resolveRoot)('public', 'assets');
        default:
            return (0, _configServer.resolveRoot)('public', 'assets');
    }
};

var getLibrary = function getLibrary(name) {
    if (name === 'lambda') return '[name]';
};

var getLibraryTarget = function getLibraryTarget(name) {
    if (name === 'lambda') return 'commonjs2';
};

var getFilename = function getFilename(name) {
    return '[name].js';
};
var getChunkFilename = function getChunkFilename(name) {
    return '[name].js';
};
var getSourceMapFilename = function getSourceMapFilename(name) {
    return '[file].map';
};
var getDevtoolModuleFilenameTemplate = function getDevtoolModuleFilenameTemplate(name) {
    return 'file:///[absolute-resource-path]';
};
var getHotUpdateChunkFilename = function getHotUpdateChunkFilename(name) {
    return '[id].[hash].hot-update.js';
};
var getHotUpdateMainFilename = function getHotUpdateMainFilename(name) {
    return '[hash].hot-update.json';
};
var getCrossOriginLoading = function getCrossOriginLoading(name) {
    return 'anonymous';
};

var getPublicPath = function getPublicPath(name) {
    switch (name) {
        case 'static':
            return _configServer.baseUrl + '/assets/';
        default:
            return _configServer.baseUrl + '/assets/';
    }
};

function getOutput(name) {
    var output = { path: getPath(name),
        library: getLibrary(name),
        libraryTarget: getLibraryTarget(name),
        pathinfo: process.env.NODE_ENV === 'hot',
        publicPath: getPublicPath(name),
        filename: getFilename(name),
        chunkFilename: getChunkFilename(name),
        crossOriginLoading: getCrossOriginLoading(name)
        //, devtoolModuleFilenameTemplate: getDevtoolModuleFilenameTemplate(name)
        //, sourceMapFilename: getSourceMapFilename(name)
        //, hotUpdateChunkFilename: getHotUpdateChunkFilename(name)
        //, hotUpdateMainFilename: getHotUpdateMainFilename(name)
    };
    console.warn('OUTPUT', JSON.stringify(output, null, 2));
    return output;
}