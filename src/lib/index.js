import configureServer from './server'
import express from 'express'
import { createLogger } from 'bunyan'
import { server } from '../config.server'

const log = createLogger({ name: 'lib', level: 'debug' })

export const getServerMap = paths => configureServer({ paths })
