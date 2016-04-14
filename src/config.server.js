import server from './config-server.json'
import { resolve } from 'path'
import { createLogger } from 'bunyan'
import { client, baseUrl, createClientLogger, appKey } from './config.client'

const __rootname = __dirname
const resolveRoot = (...args) => resolve(__rootname, ...args)

const createServerLogger = name => createLogger({ name: appKey
                                                , level: 'debug'
                                                })

export  { server, client, baseUrl, __rootname, resolveRoot, createServerLogger, createClientLogger }
