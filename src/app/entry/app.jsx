import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app/App'
import Musical from 'app/containers/Musical'
import { name } from 'config-client'

import { printTimings } from './global/performance'

import { injectConfigIntoGlobal } from './global/config'
import RootElement from './dom/elements'

import { resolveGlobalStore } from 'state/store/globalStore'

import 'styles'

const style = { height: '100%'}

injectConfigIntoGlobal()
resolveGlobalStore()
  .then(store => {
    const children = <App store={store}><Musical /></App>
    const element = new RootElement('app', style, { style, children })
    element.render().then(() => {
      window[name].loading.dispose()
      printTimings()
    })
  })
