import React, { Component, PropTypes } from 'react'

export default class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div id="app-container">
        {children}
      </div>
    )
  }
}
