import React from 'react'

import CorePanel, { panelPropTypes, panelDefaultProps } from './CorePanel'

const AuthorizedPanel = props => (
  <CorePanel {...props} />
)

Object.assign(AuthorizedPanel,  { propTypes: panelPropTypes
                                , defaultProps: panelDefaultProps
                                })
export default AuthorizedPanel
