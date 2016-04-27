import 'app/fonts/fout'

import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'

import Client from './containers/Client'

export default class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div id="app-container">
          {this.props.children}
        </div>
      </Provider>
    )
  }
}
