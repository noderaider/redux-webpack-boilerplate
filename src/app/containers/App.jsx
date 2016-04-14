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
import TopBar from 'elements/nav/TopBar'
import FooterBar from 'elements/nav/FooterBar'

import PageStyle from 'app/elements/visual/PageStyle'
import ThemePanel from 'elements/panels/ThemePanel'
import ErrorPanel from 'elements/panels/ErrorPanel'

import { loadState, saveState } from 'services/state'
import contextTypes from 'app/context'
import getTheme from 'app/theme'
const defaultTheme = 'solarized-dark'

const logger = createClientLogger('App')

const gridProps = { xs: 12, xsOffset: 0
                  , sm: 10, smOffset: 1
                  , md: 8, mdOffset: 2
                  , lg: 4, lgOffset: 4
                  }

class App extends Component {
  static propTypes = { dispatch: PropTypes.func.isRequired };
  static childContextTypes = contextTypes;
  getChildContext() {
    return  { gridProps
            , theme: getTheme(this.props.visual.theme || defaultTheme)
            }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  render(){
    const { dispatch, identity, api, visual, errors } = this.props
    const { visibility } = visual
    const { style } = getTheme(visual.theme || defaultTheme)

    const hasErrors = errors.get('api').size > 0 || errors.get('identity').size > 0

    return (
      <div style={style.app}>
        <TopBar />
        <div style={style.body} className="body-content container">
        </div>
        {(hasErrors && !__PROD__) ? (
          <ErrorPanel />
        ) : null}
        <FooterBar />
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

export default connect(mapStateToProps)(App)
