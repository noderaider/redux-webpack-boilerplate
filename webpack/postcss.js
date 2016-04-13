'use strict';

Object.defineProperty(exports, "__esModule", {
              value: true
});
exports.getPostcss = undefined;

var _postcssImport = require('postcss-import');

var _postcssImport2 = _interopRequireDefault(_postcssImport);

var _postcssUrl = require('postcss-url');

var _postcssUrl2 = _interopRequireDefault(_postcssUrl);

var _postcssCssnext = require('postcss-cssnext');

var _postcssCssnext2 = _interopRequireDefault(_postcssCssnext);

var _postcssBrowserReporter = require('postcss-browser-reporter');

var _postcssBrowserReporter2 = _interopRequireDefault(_postcssBrowserReporter);

var _postcssReporter = require('postcss-reporter');

var _postcssReporter2 = _interopRequireDefault(_postcssReporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPostcss = exports.getPostcss = function getPostcss(name) {
              return function (webpack) {
                            return [(0, _postcssImport2.default)({ addDependencyTo: webpack }), (0, _postcssUrl2.default)({ url: 'inline'
                                          //, basePath: '../src/app'
                                          , assetsPath: '../images'
                            }), (0, _postcssCssnext2.default)(), (0, _postcssBrowserReporter2.default)(), (0, _postcssReporter2.default)()];
              };
};