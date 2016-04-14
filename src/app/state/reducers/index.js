import { combineReducers } from 'redux'
import { visual } from './visual'
import errors from './errors'
import { reducer as form } from 'redux-form'
import { reducer as idle } from 'state/components/redux-idle-monitor'

const rootReducer = combineReducers({ visual
                                    , errors
                                    , form
                                    , idle
                                    })
export default rootReducer
