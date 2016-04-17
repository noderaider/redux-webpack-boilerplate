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
//import ReduxGriddle from 'griddle-overhaul-react-redux'

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
    if(!window.google_tag_manager)
      console.warn('GTM BLOCKED => Please consider disabling ad block so we can see how much usage were getting')
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
    const { dispatch, theme, title, subtitle, username, organization, email, full, packageName, errors } = this.props
    const { style } = theme

    const hasErrors = errors.get('api').size > 0 || errors.get('identity').size > 0

    return (
      <div>
        <div style={style.app}>
          <TopBar title={title} subtitle={subtitle} username={username} email={email} packageName={packageName} />
          <div style={style.content} className="body-content container">
            <PageForm />

{/*
            <ReduxGriddle />
          */}

            <ul style={style.ul}>
              <li>Fork <a href="https://github.com/cchamberlain/redux-webpack-boilerplate">redux-webpack-boilerplate</a></li>
              <li><code>git clone https://github.com/{username}/redux-webpack-boilerplate</code></li>
              <li>Set title to <b>{title}</b> in src/config-client.json</li>
              <li>Set subtitle to <b>{title}</b> in src/config-client.json</li>
              <li>Create .repackagerc file in project root (for building package.json)<pre><code>{
`{ "username": "${username}"
, "organization": "${organization}"
, "email": "${email}"
, "full": "${full}"
}`}</code></pre></li>
              <li><code>npm -g repackage</code></li>
              <li><code>repackage</code></li>
              <li>Set package name to <b>{packageName}</b> in src/package/name.js</li>
              <li><code>repackage</code> again</li>
              <li><code>npm i</code></li>
              <li><code>npm run start-hot</code></li>
            </ul>
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
