import { persistState } from 'redux-devtools'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { saveStore, getInitialState } from './globalStore'
import initBrowserStore from './initBrowserStore'

const importConfigureStore = () => require('lib/redux/store/configureStore').default

const getDebugSessionKey = () => {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  if(matches)
    return matches[1]
}


const getDevToolsEnhancer = () => typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f

const createBrowserStore = ({ history = browserHistory, initialState = getInitialState() } = {}) => {
  const configureStore = importConfigureStore()

  const additionalEnhancers = [ getDevToolsEnhancer()
                              //, persistState(getDebugSessionKey())
                              ]

  const store = configureStore({ history, initialState, additionalEnhancers })
  const syncedHistory = syncHistoryWithStore(browserHistory, store)
  const unsubscribe = initBrowserStore(store)
  const browserStore = { ...store, unsubscribe }
  saveStore(browserStore, syncedHistory)
  return [browserStore, syncedHistory]
}

export default function configureBrowserStore(...opts) {
  let [store, history] = createBrowserStore(...opts)
  const replaceStore = () => {
    store.unsubscribe()
    [store, history] = createBrowserStore(...opts)
  }
  if(module.hot) module.hot.accept('lib/redux/store/configureStore', replaceStore)
  return [store, history]
}
