import React, { Component, PropTypes } from 'react'

export default class Recaptcha extends Component {
  static propTypes =  { siteKey: PropTypes.string.isRequired
                      , onloadCallbackName: PropTypes.string.isRequired
                      , validateCallbackName: PropTypes.string.isRequired
                      , onValidate: PropTypes.func.isRequired
                      , theme: PropTypes.oneOf(['light', 'dark'])
                      };
  static defaultProps = { theme: 'light'
                        , validateCallbackName: 'recaptchaOnValidate'
                        };
  constructor(props) {
    super(props)
  }
  componentDidMount() {

    window[this.props.onloadCallbackName] = (...args) => console.warn('RECAPTCHA ONLOAD', JSON.stringify(args))
    window[this.props.validateCallbackName] = (...args) => this.props.onValidate(...args)

    let grecaptcha = window.grecaptcha
    if(typeof grecaptcha === 'undefined')
      throw new Error('The global grecaptcha is not defined. Ensure the recaptcha api script has been included on the page.')
    grecaptcha.render(this.recaptcha, { sitekey: this.props.siteKey
                                      , callback: window[this.props.validateCallbackName]
                                      , theme: this.props.theme
                                      })
  }
  render() {
    return (
        <div ref={x => this.recaptcha=x} />
    )
  }
}
