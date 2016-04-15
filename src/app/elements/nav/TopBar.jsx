import React, { Component, PropTypes } from 'react'
import { Navbar, Nav, NavbarBrand, NavItem } from 'react-bootstrap'
import name from 'package/name'

import './TopBar.css'

export default class TopBar extends Component {
  static propTypes =  { toggleMenu: React.PropTypes.func
                      };
  render() {
    return (<div>
      <div>
        <div style={{float: 'left', marginLeft: '3%'}}>
          <a href="/" style={{ textDecoration: 'none'}}>
            <h2 style={{marginTop: 8, paddingTop: 0, color: '#fff', textDecoration: 'none', textShadow: '1px 1px 2px black' }}>{name}</h2>
          </a>
        </div>
        <div>
          <div style={{float: 'right', marginRight: '3%', marginTop: 5}}>
            <img style={{float: 'right', width: 40 }} src="/images/gear_0.gif" alt="Brand" />
          </div>
        </div>
      </div>
    </div>)
  }
}
