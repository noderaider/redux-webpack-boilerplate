import client from './config-client'
import { createLogger } from 'bunyan'

const baseUrl = `http${client['_configuration_'] === 'debug' ? '' : 's'}://${client.hostname}`

const appKey = require('./package').name.replace(/-/g, '_')

const fakeLogger = name => ({ name: `${name}-fake`,  trace: () => {}, debug: () => {}, info: () => {}, warn: () => {}, error: () => {}, fatal: () => {} })
const createClientLogger = name => __DEV__ ? createLogger({ name: appKey
                                                          , level: 'debug'
                                                          }) : fakeLogger(name)

export  { client, appKey, baseUrl, createClientLogger }
