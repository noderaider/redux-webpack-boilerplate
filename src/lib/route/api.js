import express from 'express'
import fs from 'fs'
import { client as staticConfig, createServerLogger } from '../../config.server'
//import { getCors } from '../cors'
const log = createServerLogger('api')


const requireQ = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err)
        return reject(err)
      resolve(JSON.parse(data))
    })
  })
}


/**
 * API Module
 * Exposes apis for the application.
 * @module server/lib/api
 */

const configureApi = () => {
  let router = express.Router()
  //const cors = getCors()
  staticConfig.STATIC = true

  //CORS middleware
  const allowCrossDomain = (req, res, next) => {
    //if(req.method === 'OPTIONS') {
      //cors.handlePreflight(req, res)
    //} else {
      //cors.handle(req, res)
      next()
    //}
  }

  router.use(allowCrossDomain)
  router.get('/env', (req, res) => res.json({ NODE_ENV: process.env.NODE_ENV }))
  router.get('/client-config', (req, res) => {
    requireQ(router.locals.CLIENT_CONFIG_PATH)
      .then(clientConfig => {
        if (req.query.pretty === '' || req.query.pretty)
          return res.send(`<html><head><title>app client config</title></head><body><pre>${JSON.stringify(clientConfig, null, 4)}</pre></body></html>`)
        res.json(clientConfig)
      }, err => {
        log.error(err, 'error occurred during client-config')
        res.json(staticConfig)
      })
  })
  return router
}

export default configureApi
