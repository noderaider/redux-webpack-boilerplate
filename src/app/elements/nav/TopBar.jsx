import React, { Component, PropTypes } from 'react'
import FA from 'app/elements/visual/FA'
import { appName } from 'config'
import name from 'package/name'

import './TopBar.css'


import contextTypes from 'app/context'

export default class TopBar extends Component {
  static contextTypes = contextTypes;
  render() {
    const { title, subtitle } = this.props
    const { palette, color, brand, style } = this.context.theme
    const { header } = style

    return (
      <header style={header.wrapper} id="topbar">
        <button style={header.hamburger}>
          <FA name="bars" size="lg" />
        </button>
        <span style={header.title}>
          <a href="/" style={header.anchor}>{title}{subtitle ? <span style={header.subtitle}>{subtitle}</span> : null}</a>
        </span>
        <span style={header.banner}>
          <a href={`https://nodei.co/npm/${name}/`}>
            <img src={`https://nodei.co/npm/${name}.png?mini=true`} />
          </a>
        </span>
        <span style={header.settings}>
          <a href="/settings" style={header.anchor}>
            <FA name="cog" size="2x"/>
          </a>
        </span>
      </header>
    )
  }
}
