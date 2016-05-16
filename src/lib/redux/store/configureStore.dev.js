import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { combineReducers } from 'redux'
import { thunk, createLogger, crashReporter } from 'redux-middleware'

import { log, IS_BROWSER } from '../../../config'
import { HYDRATE } from '../hydrateImmutable'
import { middleware as idle, actions as idleActions } from '../modules/redux-idle-monitor'
import * as reducers from '../reducers'

export default function configureStore({ history, initialState, additionalEnhancers = [] } = {}) {
  const reducer = combineReducers(reducers)

  const middlewares = [ thunk
                      , routerMiddleware(history)
                      , idle
                      , createLogger({ logger: IS_BROWSER ? console : log })
                      , crashReporter
                      ]
  const enhancer = compose( applyMiddleware(...middlewares)
                          , ...additionalEnhancers
                          )
  const store = createStore(reducer, reducer(initialState, { type: HYDRATE }), enhancer)
  store.dispatch(idleActions.start())
  if(module.hot)
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default))
  return store
}
