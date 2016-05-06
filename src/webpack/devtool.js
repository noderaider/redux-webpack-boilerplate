import { server } from '../config.js'

export function getDevTool(name) {
  if(process.env.NODE_ENV === 'hot')
    return '#eval'
}
