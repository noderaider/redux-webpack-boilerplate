import React, { Component, PropTypes } from 'react'
import { Navbar, Nav, NavbarBrand, NavItem } from 'react-bootstrap'

import './TopBar.css'

const bgClasses = { info: 'green-bg', warn: 'yellow-bg', error: 'red-bg' }

const TopBarBrand = props => (
  <NavbarBrand><img src="/img/logo-40.png" alt="Brand" /></NavbarBrand>
)

const TopBarMenuButton = props => props.menuEnabled ?  (
    <NavItem onClick={props.onToggleMenu} className="hamburger pull-left">
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </NavItem>
    ) : (
    <span id="no-menu" />
  )

export default class TopBar extends Component {
  static propTypes =  { toggleMenu: React.PropTypes.func
                      };
  render() {
    return (<div>
      <Navbar fixedTop inverse>
        <Nav>
          <TopBarMenuButton menuEnabled={this.props.menuEnabled} onToggleMenu={this.props.onToggleMenu} />
          <NavItem className="pull-left" href="/management">
            <TopBarBrand />
          </NavItem>
        </Nav>
        <Nav pullRight>
        </Nav>
      </Navbar>
    </div>)
  }
}
