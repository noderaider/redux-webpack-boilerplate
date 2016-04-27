import React from 'react'
import ReactDOM from 'react-dom'
import AppProvider from 'app/AppProvider'
import App from 'app/containers/App'
import { appName } from 'config-client'

import { printTimings } from './global/performance'

import { injectConfigIntoGlobal } from './global/config'
import RootElement from './dom/elements'

import { resolveGlobalStore } from 'state/store/globalStore'

import 'styles'

const style = { height: '100%'}

injectConfigIntoGlobal()
resolveGlobalStore()
  .then(store => {
    const children = <AppProvider store={store}><App /></AppProvider>
    const element = new RootElement('app', style, { style, children })
    element.render().then(() => {
      window[appName].loading.dispose()
      printTimings()
    })
  })
