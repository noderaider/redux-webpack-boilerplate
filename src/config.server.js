import { resolve } from 'path'
import { assert } from 'chai'
import { createLogger } from 'bunyan'

import server from './config-server.json'
import { client, baseUrl, createClientLogger, appKey } from './config.client'

const origins = server.cors.origins.map(x => {
  assert(typeof x === 'string', 'cors origins must be array of static or regex strings of hosts that should be cors authorized (preflight + headers)')
  return x.replace(/{{HOSTNAME}}/g, client.hostname)
})

const __rootname = __dirname
const resolveRoot = (...args) => resolve(__rootname, ...args)

const createServerLogger = name => createLogger({ name: appKey
                                                , level: 'debug'
                                                })

export  { server, client, baseUrl, origins, __rootname, resolveRoot, createServerLogger, createClientLogger }
