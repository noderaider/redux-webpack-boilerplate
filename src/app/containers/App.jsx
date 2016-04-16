import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import IdleMonitor from 'react-redux-idle-monitor'

import { client, createClientLogger } from 'config'
import TopBar from 'elements/nav/TopBar'
import FooterBar from 'elements/nav/FooterBar'

import PageStyle from 'app/elements/visual/PageStyle'
import ThemePanel from 'elements/panels/ThemePanel'
import ErrorPanel from 'elements/panels/ErrorPanel'

import PageForm from 'app/elements/forms/PageForm'

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
  componentWillMount() {
    const { dispatch, theme } = this.props
    const { style } = theme
    const { backgroundColor, margin, padding } = style.body
    document.body.style.backgroundColor = backgroundColor
    document.body.style.margin = margin
    document.body.style.padding = padding
  }
  getChildContext() {
    return  { gridProps
            , theme: this.props.theme
            }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  render(){
    const { dispatch, theme, title, subtitle, errors } = this.props
    const { style } = theme

    const hasErrors = errors.get('api').size > 0 || errors.get('identity').size > 0

    return (
      <div>
        <div style={style.app}>
          <TopBar title={title} subtitle={subtitle} />
          <div style={style.content} className="body-content container">
            <PageForm />
          </div>
          {(hasErrors && !__PROD__) ? (
            <ErrorPanel />
          ) : null}
          <FooterBar />
        </div>
        <IdleMonitor showStatus={true} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { visual, errors } = state
  return  { theme: getTheme(visual.theme || defaultTheme)
          , title: visual.text.get('title')
          , subtitle: visual.text.get('subtitle')
          , errors
          }
}

export default connect(mapStateToProps)(App)
