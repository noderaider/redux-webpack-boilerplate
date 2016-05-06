import { DefinePlugin, HotModuleReplacementPlugin, NoErrorsPlugin, SourceMapDevToolPlugin, ProvidePlugin, IgnorePlugin, optimize } from 'webpack'
import { server, client, baseUrl } from '../config.js'
import CompressionPlugin from 'compression-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const { CommonsChunkPlugin, UglifyJsPlugin, OccurenceOrderPlugin } = optimize

const NODE_ENV = process.env.NODE_ENV || 'production'
console.warn(`WEBPACK USING NODE_ENV => ${NODE_ENV}`)
const getDefinePlugin = name => new DefinePlugin( { __CLIENT__: true
                                                  , __SERVER__: false
                                                  , __SHIM__: name === 'shim'
                                                  , __HOT__: process.env.NODE_ENV === 'hot'
                                                  , __BASEURL__: baseUrl
                                                  , __DEV__: server.flags.dev
                                                  , __PROD__: server.flags.prod
                                                  , 'process.env.NODE_ENV': `"${NODE_ENV || 'development'}"`
                                                  } )

export const extractText = (loaders, options) => ExtractTextPlugin.extract('style-loader', loaders, options)

export const getPlugins = name => {
  let plugins = [ getDefinePlugin(name)
                , new OccurenceOrderPlugin()
                ]
  if(name === 'app') {
    console.warn('VENDOR COMMONS CHUNK')
    //plugins.push(new CommonsChunkPlugin('vendor', 'vendor.js'))
    plugins.push(new CommonsChunkPlugin('commons', 'commons.js'))
    if(process.env.NODE_ENV !== 'hot') {
      console.warn('APP COMMONS CHUNK')
//      plugins.push(new CommonsChunkPlugin('commons.js'))
          /*{ name: 'commons'
                                          , filename: 'commons.js'
                                          , chunks: ['app', 'timeout', 'vendor.js']
                                          , minChunks: 2
                                          }))*/
      plugins.push(new ExtractTextPlugin('[name].css', { allChunks: true, disable: false }))
    }
  }

  if(/^win/.test(process.platform))
    plugins.push(new IgnorePlugin(/dtrace-provider/i))

  if(process.env.NODE_ENV === 'hot' && name !== 'lambda' && name !== 'legacy' && name !== 'static' && name !== 'vendor') {
    console.warn('HOT PLUGINS')
    plugins.push(new HotModuleReplacementPlugin())
    plugins.push(new NoErrorsPlugin())
    //plugins.push(new SourceMapDevToolPlugin('[file].map', null, '[absolute-resource-path]'))
  }

  if(server.flags.minify) {
    plugins.push(new optimize.DedupePlugin())
    var uglifyOptions = { compress: { warnings: false } }
    plugins.push(new UglifyJsPlugin(uglifyOptions))
    //if(name !== 'lambda')
    //  plugins.push(new CompressionPlugin( { asset: 'gz/{file}'
                                          //, algorithm: 'gzip'
                                          //, regExp: /\.(js|css|html|json|ico|eot|otf|ttf)$/
                                          //, threshold: 10240
                                          //, minRatio: 0.8
                                          //, minRatio: 100
                                          //} ))
  }
  return plugins
}
