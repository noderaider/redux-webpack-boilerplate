import React, { Component, PropTypes } from 'react'
import Micro from './core/Micro'

const AllRightsReservedMicro = props => (
  <Micro componentID="all-rights-reserved" tooltip="All Rights Reserved">
    Tix, Inc. 2001-{new Date().getFullYear()} <i className="fa fa-copyright" /><span className="hidden-xs"> All Rights Reserved</span>
  </Micro>
)

export default AllRightsReservedMicro
