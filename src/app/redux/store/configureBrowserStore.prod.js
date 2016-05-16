import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'lib/redux/store/configureStore'
import initBrowserStore from './initBrowserStore'
import { saveStore, getInitialState } from './globalStore'

const createBrowserStore = ({ history = browserHistory, initialState = getInitialState() } = {}) => {
  const store = configureStore({ history, initialState })
  const syncedHistory = syncHistoryWithStore(browserHistory, store)
  const unsubscribe = initBrowserStore(store)
  const browserStore = { ...store, unsubscribe }
  saveStore(browserStore, syncedHistory)
  return [browserStore, syncedHistory]
}

export default function configureBrowserStore(...opts) {
  return createBrowserStore(...opts)
}
