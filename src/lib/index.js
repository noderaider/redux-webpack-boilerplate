import configureServer from './server'
import express from 'express'
import { createLogger } from 'bunyan'
import { server } from '../config'

export const getServerMap = paths => configureServer({ paths })
