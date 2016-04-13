'use strict';

var _devtool = require('./devtool');

var _target = require('./target');

var _entry = require('./entry');

var _output = require('./output');

var _resolve = require('./resolve');

var _loaders = require('./loaders');

var _externals = require('./externals');

var _plugins = require('./plugins');

var _postcss = require('./postcss');

function make(name) {
          if (typeof name !== 'string') throw new Error('Name is required.');
          var target = (0, _target.getTarget)(name);
          return { name: name,
                    target: target,
                    devtool: (0, _devtool.getDevTool)(name),
                    cache: true,
                    context: __dirname,
                    entry: (0, _entry.getEntry)(name),
                    output: (0, _output.getOutput)(name),
                    resolve: (0, _resolve.getResolve)(name),
                    resolveLoader: (0, _resolve.getResolveLoader)(name),
                    module: { loaders: (0, _loaders.getLoaders)(name),
                              postLoaders: (0, _loaders.getPostLoaders)(name),
                              noParse: []
                    },
                    externals: (0, _externals.getExternals)(name),
                    plugins: (0, _plugins.getPlugins)(name),
                    node: target === 'web' ? { fs: 'empty', 'graceful-fs': 'empty' } : {},
                    postcss: (0, _postcss.getPostcss)(name)
          };
}

module.exports = make;
module.exports['default'] = make;