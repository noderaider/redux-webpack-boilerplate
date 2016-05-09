import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as reducers from '../reducers'
import { thunk, crashReporter } from 'redux-middleware'

export default function configureStore({ history, initialState, additionalReducers = {}, additionalMiddleware = [] } = {}) {
  const reducer = combineReducers({ ...reducers, ...additionalReducers })
  const middlewares = [ thunk
                      , routerMiddleware(history)
                      , ...additionalMiddleware
                      , crashReporter
                      ]
  const enhancer = applyMiddleware(...middlewares)
  const store = createStore(reducer, initialState, enhancer)
  return store
}
