'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path3 = require('path');

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _config = require('../../config');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gzipExtensionFilter = /^(js|css|html|json|ico|eot|otf|ttf)$/;

var contentTypeMap = { 'js': 'text/javascript',
  'json': 'application/json',
  'css': 'text/css',
  'html': 'text/html',
  'xml': 'text/xml',
  'ico': 'image/x-icon',
  'woff': 'application/x-font-woff',
  'woff2': 'application/font-woff2',
  'ttf': 'application/x-font-ttf',
  'otf': 'application/x-font-otf',
  'eot': 'application/vnd.ms-fontobject',
  'svg': 'image/svg+xml',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'tiff': 'image/tiff'
};

var getDefaultHeaders = function getDefaultHeaders(extension) {
  var contentType = contentTypeMap[extension];
  return contentType ? { 'Content-Type': contentType } : {};
};

var resolveAssetPath = function resolveAssetPath(_ref) {
  var assetType = _ref.assetType;
  var assetSubType = _ref.assetSubType;
  return assetSubType ? assetType + '/' + assetSubType : assetType;
};

var serveResource = function serveResource(_ref2) {
  var assetType = _ref2.assetType;
  var assetSubType = _ref2.assetSubType;
  var assetName = _ref2.assetName;
  var flags = _config.server.flags;

  var extension = assetName.slice((assetName.lastIndexOf('.') - 1 >>> 0) + 2);
  if (assetType === 'static' && !extension) {
    var path = '/static/html/' + assetName + '.html';
    var headers = getDefaultHeaders('html');
    _config.log.debug('serving gzipped resource => path[' + path + '], headers[' + JSON.stringify(headers) + ']');
    return { path: path, headers: headers };
  } else {
    var assetPath = resolveAssetPath({ assetType: assetType, assetSubType: assetSubType });
    var _headers = getDefaultHeaders(extension);
    if (flags.minify && gzipExtensionFilter.test(extension)) {
      var _path = '/' + assetPath + '/gz/' + assetName;
      _headers['Content-Encoding'] = 'gzip';
      _config.log.debug('serving gzipped resource => path[' + _path + '], headers[' + JSON.stringify(_headers) + ']');
      return { path: _path, headers: _headers };
    } else {
      var _path2 = '/' + assetPath + '/' + assetName;
      _config.log.debug('serving resource => path[' + _path2 + '], headers[' + JSON.stringify(_headers) + ']');
      return { path: _path2, headers: _headers };
    }
  }
};

var configureDynamic = function configureDynamic(assetType) {
  _chai.assert.ok(assetType, 'route dynamic thunk must specify assetType');
  var routeDynamic = function routeDynamic(req, res, next) {
    //cors.handle(req, res)

    var assetSubType = req.params.assetSubType;
    var assetName = req.params.assetName;
    _config.log.debug('SERVING STATIC ASSET => TYPE[' + assetType + '], NAME[' + assetName + ']');

    if (!assetType || !assetName) throw new Error('routeDynamic requires an assetType and assetName => assetType:[' + assetType + '], assetName:[' + assetName + ']');

    var _serveResource = serveResource({ assetType: assetType, assetSubType: assetSubType, assetName: assetName });

    var path = _serveResource.path;
    var headers = _serveResource.headers;

    switch (assetType) {
      case 'assets':
      case 'static':
      case 'img':
        res.sendFile((0, _path3.join)(req.app.locals.PUBLIC_ROOT, path), { headers: headers });
        break;
      case 'images':
        res.sendFile((0, _path3.join)(req.app.locals.STATIC_ROOT, path), { headers: headers });
        break;
      default:
        next();
    }
  };
  var dynamicRouter = _express2.default.Router();
  dynamicRouter.get('/:assetSubType/:assetName', routeDynamic);
  dynamicRouter.get('/:assetName', routeDynamic);
  return dynamicRouter;
};

/**
 * Routes Module
 * Exposes routes for the application.
 * @module server/lib/routes
 */
var configureRouter = function configureRouter(app) {
  var _app$locals = app.locals;
  var PUBLIC_ROOT = _app$locals.PUBLIC_ROOT;
  var STATIC_ROOT = _app$locals.STATIC_ROOT;
  var APP_ROOT = _app$locals.APP_ROOT;
  var LEGACY_STYLES_ROOT = _app$locals.LEGACY_STYLES_ROOT;
  var LEGACY_IMAGES_ROOT = _app$locals.LEGACY_IMAGES_ROOT;
  var NODE_MODULES_ROOT = _app$locals.NODE_MODULES_ROOT;


  var staticFilename = function staticFilename() {
    return (process.env.NODE_ENV === 'hot' ? 'hot' : 'index') + '.html';
  };
  var staticPath = (0, _path3.join)(STATIC_ROOT, 'html', staticFilename());
  var serveIdentity = function serveIdentity(req, res) {
    //cors.handle(req, res)
    _config.log.trace('serving static => %s', staticPath);
    res.sendFile(staticPath);
  };

  var router = _express2.default.Router();
  router.use((0, _serveFavicon2.default)((0, _path3.join)(STATIC_ROOT, 'images/nintendo.ico')));
  router.all('/api/*', (0, _api2.default)());

  router.use('/assets', configureDynamic('assets'));
  router.use('/images', configureDynamic('images'));
  router.use('/img', configureDynamic('img'));
  router.use('/static', configureDynamic('static'));
  router.use('/', serveIdentity);
  return router;
};

exports.default = configureRouter;