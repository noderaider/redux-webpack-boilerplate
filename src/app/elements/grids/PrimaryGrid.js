import React from 'react'
import Griddle from 'griddle-overhaul-react-redux'
import { context } from 'app/redux/components/griddle'

export default props => <Griddle context={context('primary')} />
