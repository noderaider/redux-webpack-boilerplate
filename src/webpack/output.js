import { server, client, baseUrl, resolveRoot } from '../config.server.js'
import { join } from 'path'

const getPath = name => {
    switch(name) {
        case 'lambda':
            return resolveRoot('lambda')
        case 'static':
            return resolveRoot('public', 'assets')
        default:
            return resolveRoot('public', 'assets')
    }
}

const getLibrary = name => {
    if(name === 'lambda')
        return '[name]'
}

const getLibraryTarget = name => {
    if(name === 'lambda')
        return 'commonjs2'
}

const getFilename = name => `[name].js`
const getChunkFilename = name => `[name].js`
const getSourceMapFilename = name => `[file].map`
const getDevtoolModuleFilenameTemplate = name => 'file:///[absolute-resource-path]'
const getHotUpdateChunkFilename = name => `[id].[hash].hot-update.js`
const getHotUpdateMainFilename = name => `[hash].hot-update.json`
const getCrossOriginLoading = name => 'anonymous'

const getPublicPath = name => {
    switch(name) {
        case 'static':
            return `${baseUrl}/assets/`
        default:
            return `${baseUrl}/assets/`
    }
}

export function getOutput(name) {
  let output =  { path: getPath(name)
                , library: getLibrary(name)
                , libraryTarget: getLibraryTarget(name)
                , pathinfo: process.env.NODE_ENV === 'hot'
                , publicPath: getPublicPath(name)
                , filename: getFilename(name)
                , chunkFilename: getChunkFilename(name)
                , crossOriginLoading: getCrossOriginLoading(name)
                //, devtoolModuleFilenameTemplate: getDevtoolModuleFilenameTemplate(name)
                //, sourceMapFilename: getSourceMapFilename(name)
                //, hotUpdateChunkFilename: getHotUpdateChunkFilename(name)
                //, hotUpdateMainFilename: getHotUpdateMainFilename(name)
                }
  console.warn('OUTPUT', JSON.stringify(output, null, 2))
  return output
}
