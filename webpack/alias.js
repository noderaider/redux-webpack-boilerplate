'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.legacyFolder = exports.externalFolder = exports.vendorFolder = exports.imagesFolder = exports.stylesFolder = exports.servicesFolder = exports.stateFolder = exports.elementsFolder = exports.controlsFolder = exports.binFolder = exports.appFolder = exports.packageFolder = exports.libFolder = exports.configPath = exports.configServerPath = exports.configClientPath = undefined;
exports.getAlias = getAlias;

var _configServer = require('../config.server.js');

var _path = require('path');

var configClientPath = exports.configClientPath = (0, _configServer.resolveRoot)('./config-client.json');
var configServerPath = exports.configServerPath = (0, _configServer.resolveRoot)('./config-server.json');
var configPath = exports.configPath = (0, _configServer.resolveRoot)('./config.client.js');

var libFolder = exports.libFolder = (0, _configServer.resolveRoot)('./src/lib');
var packageFolder = exports.packageFolder = (0, _configServer.resolveRoot)('./src/package');
var appFolder = exports.appFolder = (0, _configServer.resolveRoot)('./src/app');
var binFolder = exports.binFolder = (0, _configServer.resolveRoot)('./src/bin');

var controlsFolder = exports.controlsFolder = (0, _path.resolve)(appFolder, 'controls');
var elementsFolder = exports.elementsFolder = (0, _path.resolve)(appFolder, 'elements');
var stateFolder = exports.stateFolder = (0, _path.resolve)(appFolder, 'state');
var servicesFolder = exports.servicesFolder = (0, _path.resolve)(appFolder, 'services');
var stylesFolder = exports.stylesFolder = (0, _path.resolve)(appFolder, 'styles');
var imagesFolder = exports.imagesFolder = (0, _path.resolve)(appFolder, 'images');
var vendorFolder = exports.vendorFolder = (0, _path.resolve)(appFolder, 'vendor');
var externalFolder = exports.externalFolder = (0, _path.resolve)(appFolder, 'external');
var legacyFolder = exports.legacyFolder = (0, _path.resolve)(appFolder, 'legacy');

function getAlias(name) {
        return { 'config-client': configClientPath,
                'config': configPath,
                'package': packageFolder,
                'app': appFolder,
                'chai': 'assertive-chai',
                'vendor': vendorFolder,
                'controls': controlsFolder,
                'elements': elementsFolder,
                'services': servicesFolder,
                'state': stateFolder,
                'legacy': legacyFolder,
                'styles': stylesFolder,
                'images': imagesFolder,
                'external': externalFolder,
                'react-css-transition-group': 'react-bootstrap-15',
                'react-bootstrap': 'react-bootstrap-15'
        };
}