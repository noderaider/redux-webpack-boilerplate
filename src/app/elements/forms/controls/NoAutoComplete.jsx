import React from 'react'

const emptyValue = ''
const NoAutoComplete = () => (
  <span style={{display:'none'}}>
    <input type="text" name="autofilledUsername" autoComplete="off" value={emptyValue} />
    <input type="password" name="autofilledPassword" autoComplete="off" value={emptyValue} />
  </span>
)

export default NoAutoComplete
