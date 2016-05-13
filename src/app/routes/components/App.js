import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import IdleMonitor from 'react-redux-idle-monitor'

import { client, log, defaultTheme } from 'config'
import TopBar from 'app/elements/nav/TopBar'
import FooterBar from 'app/elements/nav/FooterBar'
import PageStyle from 'app/elements/visual/PageStyle'
import ThemePanel from 'app/elements/panels/ThemePanel'
import ErrorPanel from 'app/elements/panels/ErrorPanel'
import PageForm from 'app/elements/forms/PageForm'
import PrimaryGrid from 'app/elements/grids/PrimaryGrid'

import contextTypes from 'app/context'
import getTheme from 'app/theme'

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
    if(!window.google_tag_manager)
      console.warn('GTM BLOCKED => Please consider disabling ad block so we can see how much usage were getting')
  }
  getChildContext() {
    return  { gridProps
            , theme: this.props.theme
            }
  }
  render(){
    const { dispatch, theme, title, subtitle, username, organization, email, full, packageName, errors } = this.props
    const { style } = theme

    const hasErrors = errors.get('api').size > 0 || errors.get('identity').size > 0

    return (
      <div>
        <div style={style.app}>
          <TopBar title={title} subtitle={subtitle} username={username} email={email} packageName={packageName} />
          <div style={style.content} className="body-content container">
            {children}
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
          , username: visual.text.get('username')
          , organization: visual.text.get('organization')
          , email: visual.text.get('email')
          , full: visual.text.get('full')
          , packageName: visual.text.get('packageName')
          , errors
          }
}

export default connect(mapStateToProps)(App)
