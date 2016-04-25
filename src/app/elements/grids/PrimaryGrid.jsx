import React from 'react'
import Griddle from 'griddle-overhaul-react-redux'
import { context } from 'state/components/griddle'

export default props => <Griddle context={context('primary')} />
