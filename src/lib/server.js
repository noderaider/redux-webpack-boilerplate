import express from 'express'
import path from 'path'
import { log } from '../config'
import Renderer from './renderers/Renderer'
import merge from 'lodash.merge'
import http from 'http'
import https from 'https'
//import proxy from './proxy'
import route from './route'
import { assert } from 'chai'
import { server } from '../config'

const startHttp = (instance, { port }) => new Promise((resolve, reject) => {
  http.createServer(instance).listen(port, err => err ? reject(err) : resolve(`STARTED @ http://:::${port}`))
})
const startHttps = (instance, { port }, opts) => new Promise((resolve, reject) => {
  https.createServer(opts, instance).listen(port, err => err ? reject(err) : resolve(`STARTED @ https://:::${port}`))
})

const onFatal = err => {
  log.fatal(err, 'A fatal error occurred starting the server.')
  setTimeout(() => process.exit(1), 4000)
}

const startServer = (app, { scheme, binding }) => {
  assert.ok(binding, 'bindings must be specified')
  assert.typeOf(binding.port, 'number', 'binding port must be a valid port number')
  return startHttp(app, binding)
    .then(message => log.info({ binding }, message))
    .catch(onFatal)
}

const getCdnBinding = () => new Map(server.bindings.cdn)

/** Which config name to use when hot reloading */
const hotConfigName = 'app'
const configureServer = ({ paths }) => {
  let serverMap = new Map()
  for(let [scheme, binding] of getCdnBinding().entries()) {
    let app = Object.assign(express(), { settings: server, locals: paths })

    /** Enable proxying */
    app.set('trust proxy', true)
    if (process.env.NODE_ENV === 'hot') {
      let webpackConfig = require('../webpack.config')
      let hotConfig = Array.isArray(webpackConfig) ? webpackConfig.filter(x => x.name === hotConfigName)[0] : webpackConfig
      let compiler = require('webpack')(hotConfig)
      console.warn('hotConfig public path', hotConfig.output.publicPath)
      app.use(require('webpack-dev-middleware')(compiler, { noInfo: true
                                                          , publicPath: hotConfig.output.publicPath
                                                          //, quiet: false
                                                          //, headers: { 'Access-Control-Allow-Origin': '*' }
                                                          //, stats: { colors: true }
                                                          }))
      app.use(require('webpack-hot-middleware')(compiler))
    }

    app.use(route(app))

    let environment = { NODE_ENV: process.env.NODE_ENV }
    log.info(environment, `ENVIRONMENT => ${JSON.stringify(environment)}`)

    serverMap.set(scheme, { app
                          , start: () => startServer(app, { scheme, binding })
                          })
  }
  //proxy()
  return serverMap
}

export default configureServer
