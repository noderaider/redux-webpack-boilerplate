import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import DevTools from 'app/containers/DevTools'

const loggerMiddleware = createLogger()

const composeStore = compose( applyMiddleware(thunkMiddleware, loggerMiddleware)
                            , DevTools.instrument()
                            )(createStore)


export default function configureStore() {
  const store = composeStore(rootReducer)
  if(module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }
  return store
}

