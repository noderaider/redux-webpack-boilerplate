import { combineReducers } from 'redux'
import { visual } from './visual'
import errors from './errors'
import { reducer as idle } from 'state/components/redux-idle-monitor'
import { reducer as formReducer } from 'redux-form'
import { reducer as griddle } from 'griddle-overhaul-redux'

import { SET_TEXT } from '../constants'

const form = formReducer.plugin(
{ page: (state, action) => { // <------ 'login' is name of form given to reduxForm()
    const { type, payload, error } = action
    switch(type) {
      case SET_TEXT:
        const { key, text } = payload
        if(!['title', 'subtitle'].includes(key))
          return state
        return  { ...state
                , [key]: { value: text }
                }
      default:
        return state
    }
  }
})

console.warn('IMPORTING GRIDDLE REDUCER', griddle)
const rootReducer = combineReducers({ visual
                                    , errors
                                    , idle
                                    , form
                                    , griddle
                                    })
export default rootReducer
