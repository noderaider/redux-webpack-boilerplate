import client from './config-client'
import { createLogger } from 'bunyan'

const baseUrl = `http${client['_configuration_'] === 'debug' ? '' : 's'}://${client.hostname}`

const fakeLogger = name => ({ name: `${name}-fake`,  trace: () => {}, debug: () => {}, info: () => {}, warn: () => {}, error: () => {}, fatal: () => {} })
const createClientLogger = name => __DEV__ ? createLogger({ name: 'musical'
                                                          , level: 'debug'
                                                          }) : fakeLogger(name)

export  { client, baseUrl, createClientLogger }
