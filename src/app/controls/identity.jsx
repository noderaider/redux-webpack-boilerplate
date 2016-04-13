import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { cookieNames, flags } from 'config-client'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Label from 'elements/forms/controls/Label'
import contextTypes from 'app/context'

import AccessTokenMicro from 'elements/micro/AccessTokenMicro'
import RefreshTokenMicro from 'elements/micro/RefreshTokenMicro'
import FingerprintMicro from 'elements/micro/FingerprintMicro'
import ThemeMicro from 'elements/micro/ThemeMicro'

class Identity extends Component {
  static propTypes =  { identity: PropTypes.object.isRequired
                      };
  static contextTypes = contextTypes;
  constructor(props) {
    super(props)
  }
  render() {
    if(__PROD__)
      return <div id="no-identity-micros" />
    const { fingerprint, tokens } = this.props.identity
    const accessToken = tokens ? tokens.access : null
    const refreshToken = tokens ? tokens.refresh : null
    const theme = this.props.visual.theme

    return (
      <div>
        <FingerprintMicro fingerprint={fingerprint} />
        <AccessTokenMicro accessToken={accessToken} />
        <RefreshTokenMicro refreshToken={refreshToken} />
        <ThemeMicro theme={theme} />
      </div>
    )
  }
  renderFingerprint() {
    if(__DEV__) {
      const { fingerprint } = this.props.identity
      let label = <Label>{fingerprint ? 'Fingerprint' : 'No Fingerprint'}</Label>
      if(fingerprint) {
        let tooltip = <Tooltip id="tooltip-fingerprint"><Label>{fingerprint ? 'Fingerprint' : 'No Fingerprint'}</Label></Tooltip>
        return (
          <p data-tip={fingerprint}>
            <Label>{fingerprint ? 'Fingerprint' : 'No Fingerprint'}</Label>
          </p>
        )
        return (<OverlayTrigger placement="top" overlay={tooltip}>
          {label}
        </OverlayTrigger>)
      }
      return label
    }
  }
  renderAccessToken() {
    if(__DEV__) {
      const { tokens } = this.props.identity
      let label = <Label>{tokens ? 'Access Token' : 'No Access Token'}</Label>
      if(tokens) {
        let tooltip = <Tooltip id="tooltip-access-token">{tokens.access}</Tooltip>
        return (
          <OverlayTrigger placement="top" overlay={tooltip}>
            {label}
          </OverlayTrigger>
        )
      }
      return label
    }
  }
  renderRefreshToken() {
    if(__DEV__) {
      const { tokens } = this.props.identity
      let label = <Label>{tokens ? 'Refresh Token' : 'No Refresh Token'}</Label>
      if(tokens) {
        let tooltip = <Tooltip id="tooltip-refresh-token">{tokens.refresh}</Tooltip>
        return (
          <OverlayTrigger placement="top" overlay={tooltip}>
            {label}
          </OverlayTrigger>
        )
      }
      return label
    }
  }
}

function mapStateToProps(state) {
  const { identity, visual } = state
  return  { identity
          , visual
          }
}

export default connect(mapStateToProps)(Identity)
