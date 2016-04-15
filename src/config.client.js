import client from './config-client'
import { createLogger } from 'bunyan'
import name from './package/name.js'

const appKey = name.replace(/-/g, '_')
const { environment, hostname } = client
const baseUrl = `http${environment === 'debug' ? '' : 's'}://${hostname}`


const fakeLogger = name => ({ name: `${name}-fake`,  trace: () => {}, debug: () => {}, info: () => {}, warn: () => {}, error: () => {}, fatal: () => {} })
const createClientLogger = name => process.env.NODE_ENV !== 'production' ? createLogger({ name: appKey
                                                                                        , level: environment === 'debug' ? 'debug' : 'info'
                                                                                        }) : fakeLogger(name)

export  { environment, client, appKey, baseUrl, createClientLogger }
