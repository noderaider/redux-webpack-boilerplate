import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { middleware as idleMiddleware } from 'state/components/redux-idle-monitor'

import { actions as idleActions } from 'state/components/redux-idle-monitor'

import rootReducer from '../reducers'
import DevTools from 'app/containers/DevTools'

const loggerMiddleware = createLogger()

const composeStore = compose( applyMiddleware(thunkMiddleware, idleMiddleware, loggerMiddleware)
                            , DevTools.instrument()
                            )(createStore)


export default function configureStore() {
  const store = composeStore(rootReducer)
  store.dispatch(idleActions.start())
  if(module.hot)
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default))
  return store
}

