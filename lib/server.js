'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _proxy = require('./proxy');

var _proxy2 = _interopRequireDefault(_proxy);

var _configureRouter = require('./router/configureRouter');

var _configureRouter2 = _interopRequireDefault(_configureRouter);

var _tls = require('@tixinc/config/lib/tls');

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startHttp = function startHttp(instance, _ref) {
  var port = _ref.port;
  return new _bluebird2.default(function (resolve, reject) {
    _http2.default.createServer(instance).listen(port, function (err) {
      return err ? reject(err) : resolve('STARTED @ http://:::' + port);
    });
  });
};
var startHttps = function startHttps(instance, _ref2, opts) {
  var port = _ref2.port;
  return new _bluebird2.default(function (resolve, reject) {
    _https2.default.createServer(opts, instance).listen(port, function (err) {
      return err ? reject(err) : resolve('STARTED @ https://:::' + port);
    });
  });
};

var onFatal = function onFatal(err) {
  _config.log.fatal(err, 'A fatal error occurred starting the server.');
  setTimeout(function () {
    return process.exit(1);
  }, 4000);
};

var startServer = function startServer(app, _ref3) {
  var scheme = _ref3.scheme;
  var binding = _ref3.binding;

  _chai.assert.ok(binding, 'bindings must be specified');
  _chai.assert.typeOf(binding.port, 'number', 'binding port must be a valid port number');
  if (scheme === 'https') {
    var tls = _config.server.tls;

    _chai.assert.ok(tls, 'tls options must be defined for https');
    var pfxName = tls.pfxName;
    var passphrase = tls.passphrase;

    _chai.assert.typeOf(pfxName, 'string', 'pfxName must be a string filename');
    var resolvedPassphrase = process.env.PASSPHRASE || passphrase;
    _chai.assert.typeOf(resolvedPassphrase, 'string', 'passphrase must be passed or set in environment variable PASSPHRASE');

    return (0, _tls.readPfx)(pfxName, resolvedPassphrase).then(function (opts) {
      startHttps(app, binding, opts).then(function (message) {
        return _config.log.info({ binding: binding }, message);
      }).catch(function (err) {
        return onFatal(err);
      });
    }).catch(function (err) {
      return onFatal(err);
    });
  } else {
    return startHttp(app, binding).then(function (message) {
      return _config.log.info({ binding: binding }, message);
    }).catch(onFatal);
  }
};

var getCdnBinding = function getCdnBinding() {
  return new Map(_config.server.bindings.cdn);
};

/** Which config name to use when hot reloading */
var hotConfigName = 'app';
var configureServer = function configureServer(_ref4) {
  var paths = _ref4.paths;

  var serverMap = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var _step$value = _slicedToArray(_step.value, 2);

      var scheme = _step$value[0];
      var binding = _step$value[1];

      var app = Object.assign((0, _express2.default)(), { settings: _config.server, locals: paths });

      /** Enable proxying */
      app.set('trust proxy', true);

      if (process.env.NODE_ENV === 'hot') {
        _config.log.info('SERVER STARTING HOT');
        var webpackConfig = require('../webpack.config').default;
        var hotConfig = Array.isArray(webpackConfig) ? webpackConfig.filter(function (x) {
          return x.name === hotConfigName;
        })[0] : webpackConfig;

        var compiler = require('webpack')(hotConfig);
        _config.log.info(hotConfig, 'HOT CONFIG');
        var output = hotConfig.output;

        app.use(require('webpack-dev-middleware')(compiler, { noInfo: true,
          publicPath: output.publicPath
          //, quiet: false
          //, headers: { 'Access-Control-Allow-Origin': '*' }
          //, stats: { colors: true }
        }));
        app.use(require('webpack-hot-middleware')(compiler));
      } else {
        _config.log.info('SERVER STARTING COLD');
      }

      var isSecure = scheme === 'https';
      app.use((0, _configureRouter2.default)({ isSecure: isSecure, paths: paths }));

      var environment = { NODE_ENV: process.env.NODE_ENV };
      _config.log.info({ environment: environment }, 'ENVIRONMENT');

      serverMap.set(scheme, { app: app,
        start: function start() {
          return startServer(app, { scheme: scheme, binding: binding });
        }
      });
    };

    for (var _iterator = getCdnBinding().entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  (0, _proxy2.default)();
  return serverMap;
};

exports.default = configureServer;