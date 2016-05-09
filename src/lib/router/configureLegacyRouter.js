import express from 'express'
import httpProxy from 'http-proxy'
import HttpProxyRules from 'http-proxy-rules'
import { server, log } from '../../config'
import { assert } from 'chai'

const configureLegacyProxy = () => {
  const legacyBindings = new Map(server.bindings.legacy)
  const httpPort = legacyBindings.get('http').port
  const httpsPort = legacyBindings.get('https').port
  assert.ok(httpPort, 'legacy http port binding must be defined')
  assert.ok(httpsPort, 'legacy https port binding must be defined')
  assert(typeof httpPort === 'number', 'legacy http port binding must be a number')
  assert(typeof httpsPort === 'number', 'legacy https port binding must be a number')

  const httpBaseUrl = `http://localhost:${httpPort}`
  const httpsBaseUrl = `https://localhost:${httpsPort}`
  const proxyHttpUrl = path => `${httpBaseUrl}${path}`
  const proxyHttpsUrl = path => `${httpsBaseUrl}${path}`

  const rules = { '.*/ticketsales': proxyHttpUrl('/ticketsales.html')
                }

  const proxyRules = new HttpProxyRules({ rules })
  const legacyProxy = httpProxy.createProxyServer({ ws: true, xfwd: true, secure: false })
  return (req, res) => {
    let target = proxyRules.match(req) || `${req.protocol}://localhost:${legacyBindings.get(req.protocol).port}`
    log.info({ protocol: req.protocol, url: req.url, target }, 'LEGACY PROXY')
    legacyProxy.web(req, res, { target }, err => log.error(err, 'proxy legacy error occurred'))
  }
}

export default function configureLegacyRouter() {
  const legacyProxy = configureLegacyProxy()
  const routeLegacy = (req, res, next) => {
    let { params
        , baseUrl
        , body
        , cookies
        , hostname
        , ip
        , ips
        , method
        , originalUrl
        , path
        , protocol
        , query
        , route
        , secure
        , subdomains
        , xhr
        } = req
    legacyProxy(req, res)
  }

  let router = express.Router()
  router.use(routeLegacy)
  return router
}
