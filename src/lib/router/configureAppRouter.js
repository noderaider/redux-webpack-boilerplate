import { assert } from 'chai'
import Immutable from 'immutable'
import Router from 'router'
import serveFile from 'serve-file'
import serveStatic from 'serve-static'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import { serialize } from 'fire-hydrant'
import minify from '../services/minify'

import getTheme from '../context/theme'
import { packageName, packageKey, defaultTheme, faviconUrl, log, IS_HOT, IS_DEV, noop, resolveRoot } from '../../config'
import logging from '../services/logging'
import configureStore from '../redux/store/configureStore.js'
import routes from '../app/routes'

const serializeGlobalSetter = ({ globalKey, key, value }) => {
  assert.ok(key, 'key to set is required')
  assert.ok(value, 'value to set is required')
  const settee = typeof globalKey === 'string' ? `
  window.${globalKey} = window.${globalKey} || {}
  window.${globalKey}.${key}` : `window.${key}`
  return minify(`${settee} = ${value}`)
}

const BodyInit = ({ theme }) => {
  const { style } = getTheme(theme)
  const { backgroundColor, margin, padding } = style.body
  const __html = minify(`
  document.body.style.backgroundColor = '${backgroundColor}'
  document.body.style.margin = '${margin}'
  document.body.style.padding = '${padding}'
  console.groupCollapsed('${packageName} => init')
  if(!window.google_tag_manager) console.info("GTM BLOCKED => consider disabling ad block so we can see how much usage we're getting")
  console.groupEnd()
`)
  return <script dangerouslySetInnerHTML={{ __html }}/>
}

const InitialState = ({ globalKey, state }) => {
  const serialized = serialize(state)
  const __html = serializeGlobalSetter({ globalKey, key: '__initialState__', value: serialized })
  return <script dangerouslySetInnerHTML={{ __html }} />
}


const HTML = ({ content, store }) => {
  const state = store.getState()
  const title = `${packageName}${IS_HOT ? ' is so hot right now...' : (IS_DEV ? ' is so dev right now...' : '')}`
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link rel="icon" href={faviconUrl} type="image/x-icon" />
      <link rel="stylesheet" href="/assets/app.css" type="text/css" />
      <script src="/assets/polyfill.js" />
      <script src="/assets/vendor.js" />
      <script src="/assets/commons.js" />
    </head>
    <body>
      <BodyInit theme={state.visual.theme} />
      <InitialState globalKey={packageKey} state={state} />
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
      <script src="/assets/app.js" />
    </body>
    </html>
  )
}

const renderHTML = props => `<!doctype html>
${renderToString(<HTML {...props} />)}`


export default function configureAppRouter({ cors, paths }) {
  const { SRC_ROOT, APP_ROOT, LIB_ROOT, STATIC_ROOT, ASSETS_ROOT } = paths
  let router = Router()
  //logging().then(({ logFile }) => {
    //let fileNumber = 0
    router.use((req, res, next) => {
      //cors.handle(req, res)
      const memoryHistory = createMemoryHistory(req.path)
      let store = configureStore(memoryHistory)
      const history = syncHistoryWithStore(memoryHistory, store)


      /* react router match history */
      match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error)
          res.status(500).send(error.message)
        else if (redirectLocation)
          res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
        else if (renderProps) {
          const content = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>)
          //logFile(`ContentRoot_${fileNumber}_${req.url.replace(/\//g, '-')}.html`, content)
          //fileNumber++
          res.send(renderHTML({ content, store }))
        } else
          next()
      })
    })
  //})
  return router
}
