import  { SET_VALIDATED
        , CLEAR_VALIDATED
        } from 'lib/redux/constants'
import { createAction } from 'redux-actions'

export const setValidated = createAction(SET_VALIDATED, key => ({ key }))
export const clearValidated = createAction(CLEAR_VALIDATED, key => ({ key }))
