import React from 'react'

const NoShim = (props) => <div className="no-shim">{__SHIM__ ? null : props.children}</div>

export default NoShim
