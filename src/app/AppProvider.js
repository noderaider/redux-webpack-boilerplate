import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import routes from './routes'
import 'app/fonts/fout'

export default class AppProvider extends Component {
  static propTypes =  { store: PropTypes.object.isRequired
                      , history: PropTypes.object.isRequired
                      };
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history} routes={routes} />
      </Provider>
    )
  }
}
