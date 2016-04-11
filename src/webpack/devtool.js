import { server } from '../config.server.js'

export function getDevTool(name) {
  if(process.env.NODE_ENV === 'hot')
    return '#eval'

  /*
  if(name === 'shim' || name === 'static') // TODO: FIGURE OUT WHY SOURCE MAP BREAKS IE8
    return 'inline-source-map'
  return server.flags.dev ? 'cheap-module-eval-source-map' : 'source-map'
  */
}
