import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import contextTypes from 'app/context'
import PageForm from 'app/elements/forms/PageForm'
import PrimaryGrid from 'app/elements/grids/PrimaryGrid'

class Home extends Component {
  static contextTypes = contextTypes;
  render(){
    const { title, subtitle, username, organization, email, full, packageName } = this.props
    const { style } = this.context.theme
    return (
      <div>
        <PageForm />
        <ul style={style.ul}>
          <li>Fork <a href="https://github.com/cchamberlain/redux-webpack-boilerplate">redux-webpack-boilerplate</a></li>
          <li><code>git clone https://github.com/{username}/redux-webpack-boilerplate</code></li>
          <li>Set title to <b>{title}</b> in src/config-client.json</li>
          <li>Set subtitle to <b>{title}</b> in src/config-client.json</li>
          <li>Set package name to <b>{packageName}</b> in src/package/name.js</li>
          <li><code>npm i</code></li>
          <li><code>npm run start-hot</code></li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { visual } = state
  const { text } = visual
  return  { title: text.get('title')
          , subtitle: text.get('subtitle')
          , username: text.get('username')
          , organization: text.get('organization')
          , email: text.get('email')
          , full: text.get('full')
          , packageName: text.get('packageName')
          }
}

export default connect(mapStateToProps)(Home)
