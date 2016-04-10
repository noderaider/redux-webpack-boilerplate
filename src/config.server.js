import server from './config-server.json'
import { resolve } from 'path'
import { createLogger } from 'bunyan'
import noop from 'lodash.noop'
import { client, baseUrl, createClientLogger } from './config.client'

const __rootname = __dirname
const resolveRoot = (...args) => resolve(__rootname, ...args)

const createServerLogger = name => createLogger({ name: 'musical'
                                                , level: 'debug'
                                                })

export  { server, client, baseUrl, __rootname, resolveRoot, createServerLogger, createClientLogger }
