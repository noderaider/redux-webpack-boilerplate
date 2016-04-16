import React, { Component, PropTypes } from 'react'
import FA from 'app/elements/visual/FA'
import { appName } from 'config'
import name from 'package/name'

import './TopBar.css'


import contextTypes from 'app/context'

export default class TopBar extends Component {
  static contextTypes = contextTypes;
  render() {
    const { palette, color, brand, style } = this.context.theme
    const { wrapper, hamburger, title, anchor, banner, settings, settingsImage } = style.header

    return (
      <header style={wrapper} id="topbar">
        <button style={hamburger}>
          <FA name="bars" size="lg" />
        </button>
        <span style={title}>
          <a href="/" style={anchor}>{appName}</a>
        </span>
        <span style={banner}>
          <a href={`https://nodei.co/npm/${name}/`}>
            <img src={`https://nodei.co/npm/${name}.png?mini=true`} />
          </a>
        </span>
        <span style={settings}>
          <a href="/settings" style={anchor}>
            <FA name="cog" size="2x"/>
          </a>
        </span>
      </header>
    )
  }
}
