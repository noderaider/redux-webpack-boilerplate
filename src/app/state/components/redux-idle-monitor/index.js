import configure  from 'redux-idle-monitor'
import name from 'package/name'
import { IDLE_STATUSES } from './constants'
import { idleStatusDelay, activeStatusAction, idleStatusAction } from './actions'

const opts = { appName: name, IDLE_STATUSES, idleStatusDelay, activeStatusAction, idleStatusAction }

const { reducer, actions, middleware } = configure(opts)
export { reducer, actions, middleware }
