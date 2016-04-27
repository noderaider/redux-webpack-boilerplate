import React, { Component, PropTypes } from 'react'
import { createLogger } from 'bunyan'
import classNames from 'classnames'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import NoAutoComplete from 'elements/forms/controls/NoAutoComplete'

import './Hatch.less'
import './Hatch-themes.css'
import './Hatch-sr.css'

const logger = createLogger({ name: 'Hatch', level: 'debug' })

/** @type {JSX} Required to stop autocomplete on chrome. */
const ieVersion = getInternetExplorerVersion()

const hatchBackgroundStyle = { backgroundColor: '#bbb' }


export default class Hatch extends Component {
  constructor(props) {
    super(props)
    this.isAnimating = false
    this.animationClasses = {}
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.isClosed !== nextProps.isClosed) {
      this.isAnimating = true
      setTimeout(() => {
        this.isAnimating = false
        if(nextProps.isClosed) {
          if(this.username.focus)
            this.username.focus()
          else if(this.password)
            this.password.focus()
        }
      }, this.props.transitionDuration)
    } else {
      this.isAnimating = false
    }
  }
  componentDidMount() {
    document.body.style.margin = 0
    if(this.props.isClosed) {
      this.isAnimating = true
      setTimeout(() => {
        this.isAnimating = false
        if(this.username)
          this.username.focus()
        else if(this.password)
          this.password.focus()
      }, this.props.transitionDuration)
    }
  }
  render() {
    this.animationClasses = { closed: this.props.isClosed === true
                            , open: this.props.isClosed === false
                            , animating: this.isAnimating
                            , error: this.props.errors.size > 0
                            , 'error-out': this.props.errors.size === 0 && this.animationClasses.error
                            , loading: this.props.isLoading
                            }
    let hatchStyle = { pointerEvents: this.props.isClosed ? 'auto' : 'none' }
    let hatchClass = classNames(`hatch-${this.props.theme}`, this.animationClasses)
    let hatchToggle = this.props.hasToggle ? this.renderHatchToggle() : null

    return (<div id="Hatch" className={hatchClass} style={hatchStyle}>
        <div className="hatch-upper">
          <ReactCSSTransitionGroup transitionName="hatch-upper" transitionEnterTimeout={this.props.transitionDuration} transitionLeaveTimeout={this.props.transitionDuration}>
            {this.props.isClosed ? this.renderHatchUpper() : null}
          </ReactCSSTransitionGroup>
        </div>
        <div className="hatch-lower">
          <ReactCSSTransitionGroup transitionName="hatch-lower"  transitionEnterTimeout={this.props.transitionDuration} transitionLeaveTimeout={this.props.transitionDuration}>
            {this.props.isClosed ? this.renderHatchLower() : null}
          </ReactCSSTransitionGroup>
        </div>
        {hatchToggle}
    </div>)
  }
  renderHatchUpper = () => {
    const contentStyle = { maxWidth: 800, alignSelf: 'center' }
    return (
      <div key={0} className="hatch-animate">
        <div className="hatch-inside"  style={hatchBackgroundStyle}>
          <div className="hatch-content" style={contentStyle}>
              {this.renderTitle()}
              {this.renderMessage()}
              {this.renderAuthorization()}
          </div>
          {this.renderErrors()}
        </div>
        <div className="hatch-edge" style={hatchBackgroundStyle} />
        {this.renderHatchLatch()}
        <div className="hatch-empty" />
      </div>
    )
  };
  renderHatchLower = () => {
    return (
      <div key={0} className="hatch-animate">
        {this.renderHatchLatch()}
        <div className="hatch-edge" style={hatchBackgroundStyle}/>
        <div className="hatch-inside" style={hatchBackgroundStyle}>{this.props.children}</div>
      </div>
    )
  };
  renderHatchLatch = () => {
    if(this.props.isModern)
      return <span>
                <div className="hatch-latch" />
                <div className="hatch-latch hatch-latch-glow" />
                <div className="hatch-latch hatch-latch-error" />
                <div className="hatch-latch hatch-latch-success" />
                <div className="hatch-latch hatch-latch-loading" />
              </span>
  };
  renderHatchToggle = () => {
    return (
      <div className="flex flex-center">
        <button id="HatchToggle" className="btn btn-danger"
                onClick={this.props.toggleClose}>
          Hatch
        </button>
      </div>
    )
  };
  renderTitle = () => {
    if(this.props.title) {
      return (<div className="hatch-title">
          <h1>{this.props.title}</h1>
      </div>)
    }
  };
  renderMessage = () => {
    if(this.props.message)
      return (<div className="hatch-message">
          <p>{this.props.message}</p>
      </div>)
  };
  renderErrors = () => {
    if(this.props.errors.size > 0) {
      return this.props.errors.map((x, i) => <span key={i} className="hatch-error">{x.message}</span>)
    }
  };
  renderAuthorization = () => {
    let getForm = () => {
      if(this.props.username) {
        this.username = { value: this.props.username }
        return (
          <form onSubmit={e => this.onLoginAttempt(e)}>
            <NoAutoComplete />
            <div className="hatch-input">
              <input
                type="password"
                name="password"
                autoComplete="off"
                ref={x => this.password = x}
                placeholder="Enter your password to continue."
              />
            </div>
            <div className="hatch-input right">
              <button className="hatch-btn" type="submit">Sign in as {this.props.username}</button>
            </div>
          </form>
        )
      } else {
        return (
          <form onSubmit={e => this.onLoginAttempt(e)}>
            <NoAutoComplete />
            <div className="hatch-input">
              <input
                type="text"
                autoComplete="off"
                name="username"
                placeholder="Username"
                ref={x => this.username = x}
              />
            </div>
            <div className="hatch-input">
              <input
                type="password"
                autoComplete="off"
                name="password"
                placeholder="Password"
                ref={x => this.password = x}
              />
            </div>
            <div className="hatch-input right">
              <button className="hatch-btn" type="submit">Sign In</button>
            </div>
          </form>
        )
      }
    }
    if(this.props.hasAuthorization) {
      return <div className="hatch-form">
          {getForm()}
      </div>
    }
  };

  onLoginAttempt = e => {
    if(e)
      e.preventDefault()
    let credentials = { username: this.username.value, password: this.password.value }
    this.props.onLoginAttempt(credentials)
    this.password.value = ''
  };
}


Hatch.propTypes = { onLoginAttempt: PropTypes.func.isRequired
                  , isClosed: PropTypes.bool.isRequired
                  , hasToggle: PropTypes.bool.isRequired
                  , toggleClose: PropTypes.func
                  , hasAuthorization: PropTypes.bool.isRequired
                  , username: PropTypes.string
                  , title: PropTypes.string
                  , message: PropTypes.string
                  , errors: PropTypes.object.isRequired
                  , isLoading: PropTypes.bool.isRequired
                  , transitionDuration: PropTypes.number
                  , theme: PropTypes.oneOf(['shield', 'carbon']).isRequired
                  , isModern: PropTypes.bool
                  }
Hatch.defaultProps =  { hasToggle: false
                      , showLogin: false
                      , hasAuthorization: true
                      , title: 'Locked'
                      , transitionDuration: 2000
                      , theme: 'carbon'
                      , isLoading: false
                      , isModern: ieVersion === -1 || ieVersion > 11
                      }


// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
function getInternetExplorerVersion() {
  var rv = -1; // Return value assumes failure.
  if(!(window.ActiveXObject) && 'ActiveXObject' in window)
    return 11
  if (navigator.appName == 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent;
    var re  = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})')
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 )
  }
  return rv
}
