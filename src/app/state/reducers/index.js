import { combineReducers } from 'redux'
//import { identity } from './identity'
//import { api } from './api'
//import { timeout } from './timeout'
//import { autocomplete } from './autocomplete'
//import { validation } from './validation'
import { visual } from './visual'
import errors from './errors'
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({ visual
                                    , errors
                                    , form
                                    })
export default rootReducer
