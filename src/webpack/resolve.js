import { __rootname, resolveRoot } from '../config.js'
import { getAlias } from './alias'

export function getResolve(name) {
  return  { root: [ __rootname ]
          , alias: getAlias(name)
          , fallback: resolveRoot('node_modules')
          , extensions: ['', '.jsx', '.js', '.json']
          }
}

export function getResolveLoader(name) {
  return  { root: resolveRoot('node_modules')
          , fallback: resolveRoot('node_modules')
          , extensions: ['', '.jsx', '.js', '.json']
          }
}
