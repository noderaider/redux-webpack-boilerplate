import { getDevTool } from './devtool'
import { getTarget } from './target'
import { getEntry } from './entry'
import { getOutput } from './output'
import { getResolve, getResolveLoader } from './resolve'
import { getLoaders, getPostLoaders } from './loaders'
import { getExternals } from './externals'
import { getPlugins } from './plugins'
import { getPostcss } from './postcss'

export default function make(name) {
  if(typeof name !== 'string')
    throw new Error('Name is required.')
  let target = getTarget(name)
  return  { name
          , target
          , devtool: getDevTool(name)
          , cache: true
          , context: __dirname
          , entry:  getEntry(name)
          , output: getOutput(name)
          , resolve: getResolve(name)
          , resolveLoader: getResolveLoader(name)
          , module: { loaders: getLoaders(name)
                    , postLoaders: getPostLoaders(name)
                    , noParse:  []
                    }
          , externals: getExternals(name)
          , plugins: getPlugins(name)
          , node: target === 'web' ? { fs: 'empty', 'graceful-fs': 'empty' } : {}
          , postcss: getPostcss(name)
          }
}
