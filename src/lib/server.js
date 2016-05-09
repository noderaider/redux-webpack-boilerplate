import Promise from 'bluebird'
import express from 'express'
import { server, log } from '../config'
import merge from 'lodash.merge'
import http from 'http'
import https from 'https'
import proxy from './proxy'
import configureRouter from './router/configureRouter'
import { readPfx } from '@tixinc/config/lib/tls'
import { assert } from 'chai'


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
  if(scheme === 'https') {
    const { tls } = server
    assert.ok(tls, 'tls options must be defined for https')
    const { pfxName, passphrase } = tls
    assert.typeOf(pfxName, 'string', 'pfxName must be a string filename')
    const resolvedPassphrase = process.env.PASSPHRASE || passphrase
    assert.typeOf(resolvedPassphrase, 'string', 'passphrase must be passed or set in environment variable PASSPHRASE')

    return readPfx(pfxName, resolvedPassphrase)
      .then(opts => {
        startHttps(app, binding, opts)
          .then(message => log.info({ binding }, message))
          .catch(err => onFatal(err))
      })
      .catch(err => onFatal(err))
  } else {
    return startHttp(app, binding)
      .then(message => log.info({ binding }, message))
      .catch(onFatal)
  }
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
      log.info('SERVER STARTING HOT')
      let webpackConfig = require('../webpack.config').default
      let hotConfig = Array.isArray(webpackConfig) ? webpackConfig.filter(x => x.name === hotConfigName)[0] : webpackConfig

      let compiler = require('webpack')(hotConfig)
      log.info(hotConfig, 'HOT CONFIG')
      const { output } = hotConfig
      app.use(require('webpack-dev-middleware')(compiler, { noInfo: true
                                                          , publicPath: output.publicPath
                                                          //, quiet: false
                                                          //, headers: { 'Access-Control-Allow-Origin': '*' }
                                                          //, stats: { colors: true }
                                                          }))
      app.use(require('webpack-hot-middleware')(compiler))
    } else {
      log.info('SERVER STARTING COLD')
    }

    const isSecure = scheme === 'https'
    app.use(configureRouter({ isSecure, paths }))

    let environment = { NODE_ENV: process.env.NODE_ENV }
    log.info({ environment }, 'ENVIRONMENT')

    serverMap.set(scheme, { app
                          , start: () => startServer(app, { scheme, binding })
                          })
  }
  proxy()
  return serverMap
}

export default configureServer
