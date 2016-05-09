import React, { Component, PropTypes } from 'react'

import IdentityPanel from 'app/elements/panels/IdentityPanel'

/**
 * Login Module
 * @module Login
 */
export default class Login extends Component {
  static propTypes =  { isAuthorized: PropTypes.bool.isRequired
                      , isLoading: PropTypes.bool.isRequired
                      , errors: PropTypes.array.isRequired
                      };
  render() {
    const { isAuthorized, isLoading, errors } = this.props
    return (
      <IdentityPanel isAuthorized={isAuthorized} isLoading={isLoading} errors={errors} />
    )
  }
}
