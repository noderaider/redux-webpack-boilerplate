import domready from 'domready'
import React from 'react'
import { render } from 'react-dom'
import configureBrowserStore from 'app/redux/store/configureBrowserStore'
import AppProvider from '../AppProvider'
import perf from './global/performance'
perf.addTiming('appStart')

let [store, history] = configureBrowserStore()
domready(() => {
  perf.addTiming('appLoad')
  let root = document.getElementById('root')
  if(!root) {
    root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
  }
  render(<AppProvider store={store} history={history} />, root)
})
