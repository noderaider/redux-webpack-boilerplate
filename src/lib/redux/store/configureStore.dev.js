import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as reducers from '../reducers'
import { thunk, createLogger, crashReporter } from 'redux-middleware'
import { HYDRATE } from '../hydrateImmutable'

export default function configureStore({ history, initialState, additionalReducers = {}, additionalMiddleware = [], additionalEnhancers = [] } = {}) {
  const reducer = combineReducers({ ...reducers, ...additionalReducers })
  const middlewares = [ thunk
                      , routerMiddleware(history)
                      , ...additionalMiddleware
                      , createLogger()
                      , crashReporter
                      ]
  const enhancer = compose( applyMiddleware(...middlewares)
                          , ...additionalEnhancers
                          )
  const store = createStore(reducer, reducer(initialState, { type: HYDRATE }), enhancer)
  if(module.hot)
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default))
  return store
}
