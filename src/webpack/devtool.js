import { server } from '../config.server.js'

export function getDevTool(name) {
  if(process.env.NODE_ENV === 'hot')
    return '#eval'

}
