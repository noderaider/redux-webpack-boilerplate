import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()

const composeStore = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)

export default function configureStore() {
  return composeStore(rootReducer)
}

