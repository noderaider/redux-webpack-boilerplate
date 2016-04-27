import 'app/fonts/fout'

import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import DevTools from './containers/DevTools'

export default class AppProvider extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div id="app-container">
          {this.props.children}
          <DevTools />
        </div>
      </Provider>
    )
  }
}
