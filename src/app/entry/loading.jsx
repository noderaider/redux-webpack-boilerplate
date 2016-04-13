import 'styles/loading.css'

import perf from './global/performance'

import React, { Component, PropTypes } from 'react'
import Spinner from 'app/controls/Spinner'

import RootElement, { blockBody, unblockBody } from './dom/elements'

import { createLogger } from 'bunyan'

import { saveGlobalStore } from 'state/store/globalStore'
import configureStore from 'state/store/configureStore'
import { assert } from 'chai'

perf.addTiming('loadingStart')


/** STUFF HERE IS RUN SYNCHRONOUSLY IN HEAD OR TOP OF BODY, NO WEB FORMS YET */
blockBody()

class Loading extends Component {
  render() {
    return <div ref={x => this.__element=x} />
  }
  componentDidMount() {
    this.spinner = new Spinner()
    this.spinner.spin(this.__element)
    unblockBody()
    saveGlobalStore(configureStore())
  }
}

const loading = new RootElement('loading', { backgroundColor: 'rgb(240, 240, 240)', position: 'fixed', zIndex: 99999, width: '100%', height: '100%', left: 0, top: 0 }, { children: <Loading /> })
loading.render().then(() => {})
