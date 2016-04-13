import express from 'express'
import { join } from 'path'
import favicon from 'serve-favicon'
import { createServerLogger, server } from '../../config.server'
//import { getCors } from '../cors'
import configureApi from './api'
import { assert } from 'chai'

const log = createServerLogger('routes')
//const cors = getCors()

const gzipExtensionFilter = /^(js|css|html|json|ico|eot|otf|ttf)$/

const contentTypeMap =  { 'js': 'text/javascript'
                        , 'json': 'application/json'
                        , 'css': 'text/css'
                        , 'html': 'text/html'
                        , 'xml': 'text/xml'
                        , 'ico': 'image/x-icon'
                        , 'woff': 'application/x-font-woff'
                        , 'woff2': 'application/font-woff2'
                        , 'ttf': 'application/x-font-ttf'
                        , 'otf': 'application/x-font-otf'
                        , 'eot': 'application/vnd.ms-fontobject'
                        , 'svg': 'image/svg+xml'
                        , 'png': 'image/png'
                        , 'jpg': 'image/jpeg'
                        , 'jpeg': 'image/jpeg'
                        , 'gif': 'image/gif'
                        , 'tiff': 'image/tiff'
                        }


const getDefaultHeaders = extension => {
  let contentType = contentTypeMap[extension]
  return contentType ? { 'Content-Type': contentType } : {}
}

const resolveAssetPath = ({ assetType, assetSubType }) => assetSubType ? `${assetType}/${assetSubType}` : assetType

const serveResource = ({ assetType, assetSubType, assetName }) => {
  const { flags } = server
  let extension = assetName.slice((assetName.lastIndexOf('.') - 1 >>> 0) + 2)
  if(assetType === 'static' && !extension) {
    let path = `/static/html/${assetName}.html`
    let headers = getDefaultHeaders('html')
    log.debug(`serving gzipped resource => path[${path}], headers[${JSON.stringify(headers)}]`)
    return { path, headers }
  } else {
    let assetPath = resolveAssetPath({ assetType, assetSubType })
    let headers = getDefaultHeaders(extension)
    if(flags.minify && gzipExtensionFilter.test(extension)) {
      let path = `/${assetPath}/gz/${assetName}`
      headers['Content-Encoding'] = 'gzip'
      log.debug(`serving gzipped resource => path[${path}], headers[${JSON.stringify(headers)}]`)
      return { path, headers }
    } else {
      let path = `/${assetPath}/${assetName}`
      log.debug(`serving resource => path[${path}], headers[${JSON.stringify(headers)}]`)
      return { path, headers }
    }
  }
}

const configureDynamic = assetType => {
  assert.ok(assetType, 'route dynamic thunk must specify assetType')
  const routeDynamic = (req, res, next) => {
    //cors.handle(req, res)

    let assetSubType = req.params.assetSubType
    let assetName = req.params.assetName
    log.debug(`SERVING STATIC ASSET => TYPE[${assetType}], NAME[${assetName}]`)

    if(!assetType || !assetName)
      throw new Error(`routeDynamic requires an assetType and assetName => assetType:[${assetType}], assetName:[${assetName}]`)
    let { path, headers } = serveResource({ assetType, assetSubType, assetName })
    switch(assetType) {
      case 'assets':
      case 'static':
      case 'img':
        res.sendFile(join(req.app.locals.PUBLIC_ROOT, path), { headers })
        break;
      case 'images':
        res.sendFile(join(req.app.locals.STATIC_ROOT, path), { headers })
        break;
      default:
        next()
    }
  }
  let dynamicRouter = express.Router()
  dynamicRouter.get('/:assetSubType/:assetName', routeDynamic)
  dynamicRouter.get('/:assetName', routeDynamic)
  return dynamicRouter
}


/**
 * Routes Module
 * Exposes routes for the application.
 * @module server/lib/routes
 */
const configureRouter = app => {
  const { PUBLIC_ROOT
        , STATIC_ROOT
        , APP_ROOT
        , LEGACY_STYLES_ROOT
        , LEGACY_IMAGES_ROOT
        , NODE_MODULES_ROOT
        } = app.locals


  let staticFilename = () => `${process.env.NODE_ENV === 'hot' ? 'hot' : 'index'}.html`
  let staticPath = join(STATIC_ROOT, 'html', staticFilename())
  const serveIdentity = (req, res) => {
    //cors.handle(req, res)
    log.trace('serving static => %s', staticPath)
    res.sendFile(staticPath)
  }

  let router = express.Router()
  router.use(favicon(join(STATIC_ROOT, 'favicon.ico')))
  router.all('/api/*', configureApi())

  router.use('/assets', configureDynamic('assets'))
  router.use('/images', configureDynamic('images'))
  router.use('/img', configureDynamic('img'))
  router.use('/static', configureDynamic('static'))
  router.use('/', serveIdentity)
  return router
}

export default configureRouter
