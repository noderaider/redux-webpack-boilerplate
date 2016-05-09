import { server, resolveRoot } from '../config.js'
//import { extractText } from './plugins'

//const getImageLoader = () => server.flags.hot ? 'url-loader?limit=8192' : 'file?hash=sha512&digest=hex&name=[hash].[ext]!image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
const getImageLoader = () => 'url-loader?limit=8192'

export function getLoaders(name) {
  if(name === 'static')
    return [ { test: /\.js$/, loader: 'babel', exclude: /node_modules/ } ]

  return  [  getJsLoader(name)
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
          ]
}

export function getPostLoaders(name) {
  return []
}


const inlineStyleLoader = preLoaders => `style!${preLoaders}`

export const getStyleLoaders = name => {
  const useExtract = process.env.NODE_ENV !== 'hot'
  const cssLoader = 'css!postcss'
  const lessLoader = `${cssLoader}!less`
  return  [ { test: /\.css$/, loader: /* useExtract ? extractText(cssLoader) : */ inlineStyleLoader(cssLoader) }
          , { test: /\.less$/, loader: /* useExtract ? extractText(lessLoader) : */ inlineStyleLoader(lessLoader) }
          ]
}

export const getJsLoader = name => {
  return  { test: /\.jsx?$/
          , loader: 'babel'
          , exclude:  [ /node_modules/
                      , /tinymce.*\.js$/
                      ]
          }
}
