import { saveState, loadState, removeState } from '../../services/state'
import  { forgetTokens
        , forgottenTokens
        , forgottenFingerprint
        , persistedTokens
        , persistedFingerprint
        , refreshIdentity
        } from '../actions/identity'
import { actions as idleActions } from '../modules/redux-idle-monitor'

const selectTokens = state => state.identity ? state.identity.tokens : null
const selectFingerprint = state => state.identity ? state.identity.fingerprint : null
const selectIsAuthorized = state => state.identity ? state.identity.isAuthorized : false
const selectIsAdmin = state => state.identity ? state.identity.isAdmin : false


/** PERSISTS AND REMOVES TOKEN AND FINGERPRINT COOKIES IN RESPONSE TO NEW STATES */
export const subscribeCookieHandler = store => {
  let currentTokens = null
  let currentFingerprint = null
  let cancelAutoRefresh = null
  let unsubscribe = store.subscribe(() => {
    let previousTokens = currentTokens
    let previousFingerprint = currentFingerprint
    let state = store.getState()
    currentTokens = selectTokens(state)
    currentFingerprint = selectFingerprint(state)

    if(currentTokens !== previousTokens) {
      if(currentTokens) {
        let { access, refresh } = currentTokens
        saveState({ tokens: [ access, refresh ]})
        store.dispatch(persistedTokens())
        cancelAutoRefresh = registerAutoRefresh(store)
      } else {
        removeState(['tokens'])
        store.dispatch(forgottenTokens())
        if(cancelAutoRefresh)
          cancelAutoRefresh()
      }
    }

    if(currentFingerprint !== previousFingerprint) {
      if(currentFingerprint) {
        saveState({ fingerprint: currentFingerprint })
        store.dispatch(persistedFingerprint())
      } else {
        removeState(['fingerprint'])
        store.dispatch(forgottenFingerprint())
      }
    }
  })
  return () => {
    if(cancelAutoRefresh)
      cancelAutoRefresh()
    unsubscribe()
  }
}

const registerAutoRefresh = store => {
  let { identity } = store.getState()
  const refreshMS = identity.refreshAtMS - Date.now()
  const timeoutID = setTimeout(() =>  {
    const newState = store.getState()
    if(newState.identity.isAuthorized)
      store.dispatch(refreshIdentity())
  }, refreshMS)
  return () => clearTimeout(timeoutID)
}



export default function subscribeStore(store) {
  const unsubscribeCookieHandler = subscribeCookieHandler(store)
  return () => {
    unsubscribeCookieHandler()
  }
}
