'use strict';

Object.defineProperty(exports, "__esModule", {
                                                              value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

exports.default = function (_ref) {
                                                              _objectDestructuringEmpty(_ref);

                                                              return Object.assign.apply(Object, [{}].concat([build('package', function (resource) {
                                                                                                                            return 'babel src/' + resource + ' -d ' + resource;
                                                              }), build('webpack', function (resource) {
                                                                                                                            return 'babel src/config.client.js -o config.client.js && babel src/config.server.js -o config.server.js && babel src/' + resource + '.config.js -o ' + resource + '.config.js && babel src/' + resource + '.static.config.js -o ' + resource + '.static.config.js && babel src/' + resource + ' -d ' + resource;
                                                              }, ['copy-config-client', 'copy-config-server', 'build-package', 'build-config-client', 'build-config-server']), build('public', function (resource) {
                                                                                                                            return 'ncp src/' + resource + ' ' + resource + ' && webpack --config webpack.static.config.js --progress --profile --colors';
                                                              }, ['build-webpack', 'build-package']), buildWebpack('app', 'webpack.config.js', ['build-public']), buildBabel('bin'), buildBabel('lib'), buildBabel('test'), copy('config-client', 'config-client.json'), copy('config-server', 'config-server.json'), buildBabelFile('config-client', 'config.client.js'), buildBabelFile('config-server', 'config.client.js'), copy('app', 'app/vendor', 'public/vendor'), { 'transform': 'transform-package',
                                                                                                                            'postbuild-app': 'npm run copy-app',
                                                                                                                            'build-lib-dev': 'NODE_ENV=development npm run build-lib',
                                                                                                                            'build-lib-prod': 'NODE_ENV=production npm run build-lib',
                                                                                                                            'build-lib-prod-osx': 'NODE_ENV=production npm run build-lib',
                                                                                                                            'build-prod': 'NODE_ENV=production npm run build-app && npm run build-lib-prod && npm run build-bin',
                                                                                                                            'build-dev': 'NODE_ENV=development npm run build-app && npm run build-lib-dev && npm run build-bin',
                                                                                                                            'build-hot': 'NODE_ENV=hot npm run build-app && npm run build-lib-dev && npm run build-bin',
                                                                                                                            'start-hot': 'NODE_ENV=hot npm run build-hot && node bin/run',
                                                                                                                            'start': 'NODE_ENV=production npm run build-prod && node bin/run',

                                                                                                                            'build': 'npm run build-app && npm run build-bin && npm run build-lib',
                                                                                                                            'watch': 'npm run watch-build',
                                                                                                                            'predoc': 'rimraf doc',
                                                                                                                            'doc': 'esdoc -c ./esdoc.json',
                                                                                                                            'prerelease': 'npm run build',
                                                                                                                            'release': 'npm version patch && npm publish',
                                                                                                                            'postrelease': 'npm run release-doc',
                                                                                                                            'prerelease-doc': 'npm run doc',
                                                                                                                            'release-doc': 'git subtree push --prefix public origin gh-pages',
                                                                                                                            'postrelease-doc': 'git commit -am "doc-release" && git push --follow-tags',
                                                                                                                            'test': 'karma start'
                                                              }]));
};

var babelDirBuilder = function babelDirBuilder(resource) {
                                                              return 'babel src/' + resource + ' -d ' + resource;
};
var babelWatchBuilder = function babelWatchBuilder(resource) {
                                                              return 'babel src/' + resource + ' -d ' + resource + ' --watch';
};
var babelFileBuilder = function babelFileBuilder(fromPath) {
                                                              return 'babel src/' + fromPath + ' -o ' + fromPath;
};

var buildBabel = function buildBabel(resource, dependencies) {
                                                              return Object.assign({}, build(resource, babelDirBuilder, dependencies), _defineProperty({}, 'watch-' + resource, babelWatchBuilder(resource)));
};
var buildBabelFile = function buildBabelFile(resource, fromPath, dependencies) {
                                                              var _ref2;

                                                              return _ref2 = {}, _defineProperty(_ref2, 'prebuild-' + resource, dependencies ? 'rimraf ' + fromPath + ' && ' + formatDependencies(dependencies) : 'rimraf ' + fromPath), _defineProperty(_ref2, 'build-' + resource, babelFileBuilder(fromPath)), _ref2;
};
var build = function build(resource, scriptBuilder, dependencies) {
                                                              var _ref3;

                                                              return _ref3 = {}, _defineProperty(_ref3, 'prebuild-' + resource, dependencies ? 'rimraf ' + resource + ' && ' + formatDependencies(dependencies) : 'rimraf ' + resource), _defineProperty(_ref3, 'build-' + resource, scriptBuilder(resource)), _ref3;
};
var copy = function copy(resource, fromPath, toPath, dependencies) {
                                                              var _ref4;

                                                              return _ref4 = {}, _defineProperty(_ref4, 'precopy-' + resource, dependencies ? 'rimraf ' + (toPath || fromPath) + ' && ' + formatDependencies(dependencies) : 'rimraf ' + (toPath || fromPath)), _defineProperty(_ref4, 'copy-' + resource, 'ncp src/' + fromPath + ' ' + (toPath || fromPath)), _ref4;
};

var formatDependencies = function formatDependencies(dependencies) {
                                                              return dependencies ? dependencies.map(function (x) {
                                                                                                                            return 'npm run ' + x;
                                                              }).join(' && ') : '';
};

var formatWebpackBuilder = function formatWebpackBuilder(webpackConfig) {
                                                              return 'webpack --config ' + webpackConfig + ' --progress --profile --colors';
};

var buildWebpack = function buildWebpack(resource, webpackConfig, dependencies) {
                                                              var _ref5;

                                                              return dependencies ? (_ref5 = {}, _defineProperty(_ref5, 'prebuild-' + resource, formatDependencies(dependencies)), _defineProperty(_ref5, 'build-' + resource, formatWebpackBuilder(webpackConfig)), _ref5) : _defineProperty({}, 'build-' + resource, formatWebpackBuilder(webpackConfig));
};