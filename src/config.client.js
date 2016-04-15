import client from './config-client'
import { createLogger } from 'bunyan'

const { environment, appName, hostname, port } = client

const baseUrl = `http${environment === 'debug' ? '' : 's'}://${hostname}`

const appKey = require('./package').name.replace(/-/g, '_')

const fakeLogger = name => ({ name: `${appName}-fake`,  trace: () => {}, debug: () => {}, info: () => {}, warn: () => {}, error: () => {}, fatal: () => {} })
const createClientLogger = name => __DEV__ ? createLogger({ name: appName
                                                          , level: 'debug'
                                                          }) : fakeLogger(name)

export  { client, appKey, environment, appName, hostname, port, baseUrl, createClientLogger }
