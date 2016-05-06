import { server, resolveRoot } from '../config.js'
//import { extractText } from './plugins'

//const getImageLoader = () => server.flags.hot ? 'url-loader?limit=8192' : 'file?hash=sha512&digest=hex&name=[hash].[ext]!image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
const getImageLoader = () => 'url-loader?limit=8192'

export function getLoaders(name) {
  if(name === 'static')
    return [ { test: /\.js$/, loader: 'babel', exclude: /node_modules/ } ]

  return  [  getJsxLoader(name)
          , { test: /\.json$/, loader: 'json' }
          , ...getStyleLoaders(name)

          , { test: /\.png$/
            , loader: 'url?mimetype=image/png&limit=100000&name=[name].[ext]'
            }
          , { test: /\.(gif|png|jpe?g|svg)$/i
            , loader: getImageLoader()
            }
          , { test: /\.(otf|eot|woff|woff2|ttf|svg)(\?\S*)?$/i
            , loader: 'url?limit=100000&name=[name].[ext]'
            }
          //, { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff' }
          //, { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
          //, { test: /\.(jpe?g|png|gif|svg)$/i, loaders: [ 'file?hash=sha512&digest=hex&name=[hash].[ext]','image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false' ] }
          /** @type {RegExp} Loads fontgen (font glyphs) into inline style script chunks */
          //, { test: /\.font\.(js|json)$/, loader: 'style!css!fontgen?types=woff,eot,ttf' }
          ]
}

export function getPostLoaders(name) {
  return []
}


const inlineStyleLoader = preLoaders => `style!${preLoaders}`

export const getStyleLoaders = name => {
  const useExtract = process.env.NODE_ENV !== 'hot'
  const cssLoader = `css${useExtract ? '?sourceMap' : ''}!postcss`
  const lessLoader = `${cssLoader}!less${useExtract ? '?sourceMap' : ''}`
  return  [ { test: /\.css$/, loader: /* useExtract ? extractText(cssLoader) : */ inlineStyleLoader(cssLoader) }
          , { test: /\.less$/, loader: /* useExtract ? extractText(lessLoader) : */ inlineStyleLoader(lessLoader) }
          ]
}

const babelQuery = { presets: ['react', 'es2015', 'stage-0'], plugins: [['transform-decorators-legacy']] }
const babelLoader = `babel?${JSON.stringify(babelQuery)}`

export const getJsxLoader = name => {
  return  { test: /\.jsx?$/
          , loaders: [ 'babel' ] //process.env.NODE_ENV === 'hot' ? 'babel' : babelLoader]
          , exclude:  [ /node_modules/
                      , /tinymce.*\.js$/
                      , /jquery-.*\.js$/]
          }
}


