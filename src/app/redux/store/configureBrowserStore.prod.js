import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'lib/redux/store/configureStore'
import initBrowserStore from './initBrowserStore'
import idle, { middleware as idleMiddleware } from '../modules/redux-idle-monitor'
import { saveStore, getInitialState } from './globalStore'

const createBrowserStore = ({ history = browserHistory, initialState = getInitialState() } = {}) => {
  const additionalReducers = { idle }
  const additionalMiddleware = [ idleMiddleware ]

  const store = configureStore({ history, initialState, additionalReducers, additionalMiddleware })
  const syncedHistory = syncHistoryWithStore(browserHistory, store)
  const unsubscribe = initBrowserStore(store)
  const browserStore = { ...store, unsubscribe }
  saveStore(browserStore, syncedHistory)
  return [browserStore, syncedHistory]
}

export default function configureBrowserStore(...opts) {
  return createBrowserStore(...opts)
}
