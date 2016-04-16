import client from './config-client'
import { createLogger } from 'bunyan'

import name from './package/name.js'

const appKey = name.replace(/-/g, '_')
const { environment, appName, hostname, port } = client

const baseUrl = `http${environment === 'debug' ? '' : 's'}://${hostname}`


const fakeLogger = name => ({ name: `${appName}-fake`,  trace: () => {}, debug: () => {}, info: () => {}, warn: () => {}, error: () => {}, fatal: () => {} })
const createClientLogger = name => process.env.NODE_ENV !== 'production' ? createLogger({ name: appName
                                                                                        , level: environment === 'debug' ? 'debug' : 'info'
                                                                                        }) : fakeLogger(name)

export  { client, appKey, environment, appName, hostname, port, baseUrl, createClientLogger }
