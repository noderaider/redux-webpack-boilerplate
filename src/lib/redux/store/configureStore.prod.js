import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { combineReducers } from 'redux'
import { thunk, crashReporter } from 'redux-middleware'

import { HYDRATE } from '../hydrateImmutable'
import { middleware as idle, actions as idleActions } from '../modules/redux-idle-monitor'
import * as reducers from '../reducers'

export default function configureStore({ history, initialState } = {}) {
  const reducer = combineReducers(reducers)
  const middlewares = [ thunk
                      , routerMiddleware(history)
                      , idle
                      , crashReporter
                      ]
  const enhancer = applyMiddleware(...middlewares)
  const store = createStore(reducer, reducer(initialState, { type: HYDRATE }), enhancer)
  store.dispatch(idleActions.start())
  return store
}
