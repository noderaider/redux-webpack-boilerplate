import { assert } from 'chai'
import Router from 'router'
import serveFile from 'serve-file'
import serveStatic from 'serve-static'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import serialize from 'serialize-javascript'
import { log, jspmBrowser, jspmConfig, IS_HOT, IS_DEV, noop } from '../../config'
import configureStore from '../redux/store/configureStore.js'
import configureRoutes from '../routes/configureRoutes.js'

const GLOBAL_KEY = 'tix'


const serializeGlobalSetter = ({ globalKey, key, value }) => {
  assert.ok(key, 'key to set is required')
  assert.ok(value, 'value to set is required')
  const settee = typeof globalKey === 'string' ? `window.${globalKey} = window.${globalKey} || {}; window.${globalKey}.${key}` : `window.${key}`
  return `${settee} = ${value}`
}

const InitialState = ({ globalKey, state }) => <script dangerouslySetInnerHTML={{ __html: serializeGlobalSetter({ globalKey, key: '__initialState__', value: serialize(state)}) }} />



const HTML = ({ content, store }) => {
  const state = store ? store.getState() : noop()
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{IS_HOT ? 'Tix is so hot right now...' : (IS_DEV ? 'Tix is so dev right now...' : 'Tix - Login')}</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      {IS_DEV ? null : <link rel="stylesheet" href="/assets/app.css" type="text/css" />}
      <script src="/assets/polyfill.js" />
      <script src="/assets/vendor.js" />
      <script src="/assets/commons.js" />
    </head>
    <body>
      {state ? <InitialState globalKey={GLOBAL_KEY} state={state} /> : null}
      {content ? <div id="root" dangerouslySetInnerHTML={{ __html: content }}/> : <div id="root" />}
      <script src="/assets/app.js" />
      <script src="//www.google.com/recaptcha/api.js?onload=recaptchaOnLoad&render=explicit" async defer />
    </body>
    </html>
  )
}

const renderHTML = props => `<!doctype html>
${renderToString(<HTML {...props} />)}`

const ContentRoot = ({ store, renderProps }) => (
  <Provider store={store}>
    <RouterContext {...renderProps}/>
  </Provider>
)


export default function configureAppRouter({ cors, paths }) {
  const { SRC_ROOT, APP_ROOT, LIB_ROOT, STATIC_ROOT, ASSETS_ROOT } = paths
  let router = Router()

  router.use((req, res, next) => {
    //cors.handle(req, res)
    const memoryHistory = createMemoryHistory(req.path)
    let store = configureStore({ history: memoryHistory })
    const history = syncHistoryWithStore(memoryHistory, store)
    const routes = configureRoutes()

    if(req.url === '/')
      return next()

    /* react router match history */
    match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error)
        res.status(500).send(error.message)
      else if (redirectLocation)
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      else if (renderProps) {
        const content = renderToString(<ContentRoot store={store} renderProps={renderProps} />)
        res.send(renderHTML({ content, store }))
      } else if(req.url.includes('/identity')) {
        res.send(renderHTML({ store }))
      } else
        next()
    })
  })
  return router
}
