import React, { Component, PropTypes } from 'react'

import MaintenancePanel from 'app/elements/panels/MaintenancePanel'

/**
 * Maintenance Module
 * @module Maintenance
 */
export default class Maintenance extends Component {
  static propTypes =  { isAuthorized: PropTypes.bool.isRequired
                      , isLoading: PropTypes.bool.isRequired
                      , errors: PropTypes.array.isRequired
                      , params: PropTypes.object.isRequired
                      };
  render() {
    const { params, isAuthorized, isLoading, errors } = this.props
    const { type, code } = params
    return (
      <MaintenancePanel isAuthorized={isAuthorized} isLoading={isLoading} type={type} code={params.code} />
    )
  }
}
