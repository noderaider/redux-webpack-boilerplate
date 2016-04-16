'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlugins = exports.extractText = undefined;

var _webpack = require('webpack');

var _configServer = require('../config.server.js');

var _compressionWebpackPlugin = require('compression-webpack-plugin');

var _compressionWebpackPlugin2 = _interopRequireDefault(_compressionWebpackPlugin);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommonsChunkPlugin = _webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = _webpack.optimize.UglifyJsPlugin;
var OccurenceOrderPlugin = _webpack.optimize.OccurenceOrderPlugin;


var NODE_ENV = process.env.NODE_ENV || 'production';
console.warn('WEBPACK USING NODE_ENV => ' + NODE_ENV);
var getDefinePlugin = function getDefinePlugin(name) {
  return new _webpack.DefinePlugin({ __CLIENT__: true,
    __SERVER__: false,
    __SHIM__: name === 'shim',
    __HOT__: process.env.NODE_ENV === 'hot',
    __BASEURL__: _configServer.baseUrl,
    __DEV__: _configServer.server.flags.dev,
    __PROD__: _configServer.server.flags.prod,
    'process.env.NODE_ENV': '"' + (NODE_ENV || 'development') + '"'
  });
};

var extractText = exports.extractText = function extractText(loaders, options) {
  return _extractTextWebpackPlugin2.default.extract('style-loader', loaders, options);
};

var getPlugins = exports.getPlugins = function getPlugins(name) {
  var plugins = [getDefinePlugin(name), new OccurenceOrderPlugin()];
  if (name === 'app') {
    console.warn('VENDOR COMMONS CHUNK');
    //plugins.push(new CommonsChunkPlugin('vendor', 'vendor.js'))
    plugins.push(new CommonsChunkPlugin('commons', 'commons.js'));
    if (process.env.NODE_ENV !== 'hot') {
      console.warn('APP COMMONS CHUNK');
      //      plugins.push(new CommonsChunkPlugin('commons.js'))
      /*{ name: 'commons'
                                      , filename: 'commons.js'
                                      , chunks: ['app', 'timeout', 'vendor.js']
                                      , minChunks: 2
                                      }))*/
      plugins.push(new _extractTextWebpackPlugin2.default('[name].css', { allChunks: true, disable: false }));
    }
  }

  if (/^win/.test(process.platform)) plugins.push(new _webpack.IgnorePlugin(/dtrace-provider/i));

  if (process.env.NODE_ENV === 'hot' && name !== 'lambda' && name !== 'legacy' && name !== 'static' && name !== 'vendor') {
    console.warn('HOT PLUGINS');
    plugins.push(new _webpack.HotModuleReplacementPlugin());
    plugins.push(new _webpack.NoErrorsPlugin());
    //plugins.push(new SourceMapDevToolPlugin('[file].map', null, '[absolute-resource-path]'))
  }

  if (_configServer.server.flags.minify) {
    plugins.push(new _webpack.optimize.DedupePlugin());
    var uglifyOptions = { compress: { warnings: false } };
    plugins.push(new UglifyJsPlugin(uglifyOptions));
    //if(name !== 'lambda')
    //  plugins.push(new CompressionPlugin( { asset: 'gz/{file}'
    //, algorithm: 'gzip'
    //, regExp: /\.(js|css|html|json|ico|eot|otf|ttf)$/
    //, threshold: 10240
    //, minRatio: 0.8
    //, minRatio: 100
    //} ))
  }
  return plugins;
};