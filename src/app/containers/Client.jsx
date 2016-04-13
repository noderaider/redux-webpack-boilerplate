import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import Immutable from 'immutable'

import { connect } from 'react-redux'

import classNames from 'classnames'


import  { refreshIdentity
        , hydrateTokens
        } from 'state/actions/identity'

import  { setVisibility
        , toggleVisibility
        } from 'state/actions/visual'

import { Grid, Well, Row, Col, Label } from 'react-bootstrap'
import { client, createClientLogger } from 'config'
import DebugPanel from 'elements/panels/DebugPanel'
import AdminPanel from 'elements/panels/AdminPanel'
import TopBar from 'elements/nav/TopBar'
import PrivacyPolicy from 'elements/static/PrivacyPolicy'
import TermsOfUse from 'elements/static/TermsOfUse'
import FooterBar from 'elements/nav/FooterBar'

import PageStyle from 'app/elements/visual/PageStyle'
import IdentityPanel from 'elements/panels/IdentityPanel'
import MaintenancePanel, { isResetRequest } from 'elements/panels/MaintenancePanel'
import ThemePanel from 'elements/panels/ThemePanel'
import ErrorPanel from 'elements/panels/ErrorPanel'

import { loadState, saveState } from 'services/state'
import contextTypes from 'app/context'
import getTheme from 'app/theme'
const defaultTheme = 'solarized-dark'

const logger = createClientLogger('Client')

const gridProps = { xs: 12, xsOffset: 0
                  , sm: 10, smOffset: 1
                  , md: 8, mdOffset: 2
                  , lg: 4, lgOffset: 4
                  }

class Client extends Component {
  static propTypes = { dispatch: PropTypes.func.isRequired };
  static childContextTypes = contextTypes;
  getChildContext() {
    return  { gridProps
            , theme: getTheme(this.props.visual.theme || defaultTheme)
            }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true
    /*
    return !(Immutable.is(this.props.api.entities, nextProps.api.entities)
            && Immutable.is(this.props.api.isFetching, nextProps.api.isFetching)
            && Immutable.is(this.props.api.errors, nextProps.api.errors)
            && this.props.identity.isAuthorized === nextProps.identity.isAuthorized)
*/
  }
  render(){
    const { dispatch, identity, api, visual, errors } = this.props
    const { isAuthorized, isAdmin, isFetching } = identity
    const { visibility } = visual
    const { style } = getTheme(visual.theme || defaultTheme)

    const hasErrors = errors.get('api').size > 0 || errors.get('identity').size > 0

    return (
      <div style={style.app}>
        <TopBar />
        <div style={style.body} className="body-content container">
        {isAdmin ? (
          <AdminPanel
              isLoading={isFetching}
              onRefresh={() => dispatch(refreshIdentity())}
          />
        ) : <div id="no-admin" />}

        {visibility.getIn(['login_reset', 'value'], 'login') === 'login' && !isResetRequest() ? (
          <IdentityPanel
              isAuthorized={isAuthorized}
              isLoading={isFetching}
              errors={errors.get('identity')}
          />
        ) : (
          <MaintenancePanel
              isLoading={isFetching}
          />
        )}
        {visibility.getIn(['theme-panel', 'value'], false) ? <ThemePanel isLoading={isFetching} /> : null}
      </div>
        {visibility.getIn(['privacy-policy', 'value'], false) ? (
          <PrivacyPolicy onTermsOfUseClick={() => {
            dispatch(setVisibility('privacy-policy', false))
            dispatch(setVisibility('terms-of-use', true))
          }} onClose={() => dispatch(setVisibility('privacy-policy', false))} />
        ) : null}
        {visibility.getIn(['terms-of-use', 'value'], false) ? (
          <TermsOfUse onPrivacyPolicyClick={() => {
            dispatch(setVisibility('terms-of-use', false))
            dispatch(setVisibility('privacy-policy', true))
          }} onClose={() => dispatch(setVisibility('terms-of-use', false))} />
        ) : null}
        {(hasErrors && !__PROD__) ? (
          <ErrorPanel />
        ) : null}
        <FooterBar
            onTogglePrivacyPolicy={() => {
              dispatch(setVisibility('terms-of-use', false))
            }}
            onToggleTermsOfUse={() => {
              dispatch(setVisibility('privacy-policy', false))
            }}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { identity, api, visual, autocomplete, errors } = state
  return  { identity
          , api
          , visual
          , autocomplete
          , errors
          }
}

export default connect(mapStateToProps)(Client)
