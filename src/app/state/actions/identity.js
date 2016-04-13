import { createAction } from 'redux-actions'
import { apiAction, isExpired, decodeToken } from './api'
import { setSessionTimeouts } from './timeout'
import { saveState, loadState, removeState } from 'services/state'
import { goToPath } from 'services/location'
import { clientId } from 'config-client'
import IdentityError from 'app/errors/IdentityError'

import  { FORGET_TOKENS
        , FORGOTTEN_TOKENS
        , FORGET_FINGERPRINT
        , FORGOTTEN_FINGERPRINT
        , FETCH_IDENTITY
        , SET_IDENTITY
        , PERSISTED_TOKENS
        , PERSISTED_FINGERPRINT
        , POST_AUTHORIZE
        , POST_AUTHORIZE_ADMIN
        , IDENTITY_INVALID
        , IDENTITY_EXPIRED
        } from '../constants'

const noop = () => {}

export const forgetTokens = createAction(FORGET_TOKENS)
export const forgetFingerprint = createAction(FORGET_FINGERPRINT)

export const forgottenTokens = createAction(FORGOTTEN_TOKENS)
export const forgottenFingerprint = createAction(FORGOTTEN_FINGERPRINT)
export const persistedTokens = createAction(PERSISTED_TOKENS)
export const persistedFingerprint = createAction(PERSISTED_FINGERPRINT)


const fetchIdentity = createAction(FETCH_IDENTITY, (reason, credentials) => ({ reason, credentials }))
export const setIdentity = createAction(SET_IDENTITY, tokens => ({ tokens, decodedToken: decodeToken(tokens.access) }))
const setIdentityError = createAction(SET_IDENTITY)

const postAuthorizeEvent = createAction(POST_AUTHORIZE, event => ({ event }))
const postAuthorizeAdminEvent = createAction(POST_AUTHORIZE_ADMIN, event => ({ event }))

const identityInvalid = createAction(IDENTITY_INVALID)
const identityExpired = createAction(IDENTITY_EXPIRED)

export function hydrateTokens() {
  const { tokens } = loadState(['tokens'])
  if(!tokens)
    return false
  const [access, refresh] = tokens
  const isValid = typeof access === 'string'
                    && typeof refresh === 'string'
                    && access.length > 0
                    && refresh.length > 0
  if(isValid)
    return setIdentity({ access, refresh })
  return setIdentityError(new IdentityError('Tokens could not be hydrated.'))
}

const extractTokens = response => {
  if(response.error) {
    throw new IdentityError(`Unable to authorize => ${JSON.stringify(response)}`)
  }
  if(typeof response === 'string' && response.includes('AllowOneTime')) {
    goToPath(`/?pwreset=${response.split('|')[1]}&case=true`)
  }
  const tokens = {  access: response['access_token'], refresh: response['refresh_token'] }
  if(typeof tokens.access === 'undefined' || typeof tokens.refresh === 'undefined')
    throw new IdentityError(`Response did not contain access_token or refresh_token => ${JSON.stringify(response)}`)
  return tokens
}

export function authorizeIdentity(credentials, successRedirect) {
  return (dispatch, getState) => {
    dispatch(fetchIdentity('authorize', credentials))
    let { identity } = getState()
    const { username, password, rememberMe } = credentials
    if(!(username && password))
      return dispatch(setIdentityError(new IdentityError('Requires username and password', null, identity)))
    return dispatch(apiAction(['identity', 'authorize'],  { username: username
                                                          , password
                                                          , rememberMe
                                                          , clientId
                                                          , fingerprint: identity.fingerprint || noop()
                                                          }))
      .then(data => extractTokens(data))
      .then(tokens => dispatch(setIdentity(tokens)))
      .then(() => {
        if(successRedirect) {
          let newState = getState()
          if(newState.identity.isAuthorized)
            goToPath('/management', true)
        }
      })
      .catch(err => dispatch(setIdentityError(new IdentityError('Username and password were incorrect.', err))))
  }
}

export function refreshIdentity(credentials = {}) {
  return (dispatch, getState) => {
    dispatch(fetchIdentity('refresh', credentials))
    let { identity } = getState()
    let refreshToken = identity && identity.tokens ? identity.tokens.refresh : null
    if(!refreshToken)
      return dispatch(setIdentityError(new IdentityError('No refresh token exists to refresh identity.', null, identity)))

    return dispatch(apiAction(['identity', 'refresh'],  { ...credentials
                                                        , fingerprint: identity.fingerprint || noop()
                                                        , subject: identity.subject || noop()
                                                        , refreshToken
                                                        , clientId
                                                        }))
      .then(data => extractTokens(data))
      .then(tokens => dispatch(setIdentity(tokens)))
      .catch(err => dispatch(setIdentityError(new IdentityError('Error during refresh identity', err))))
  }
}

export function impersonateIdentity(credentials) {
  return (dispatch, getState) => {
    dispatch(fetchIdentity('impersonate', credentials))
    let { identity } = getState()

    if(isExpired(decodeToken(identity.tokens.access))) {
      return dispatch(refreshIdentity())
        .then(() => {
          let state = getIdentity()
          let newIdentity = state.identity
          let refreshToken = newIdentity && newIdentity.tokens ? newIdentity.tokens.refresh : null
          return dispatch(apiAction(['identity', 'impersonate'],  { ...credentials
                                                                  , fingerprint: newIdentity.fingerprint || noop()
                                                                  , subject: newIdentity.subject || noop()
                                                                  , refreshToken
                                                                  , clientId
                                                                  }))
                  .then(data => extractTokens(data))
                  .then(tokens => dispatch(setIdentity(tokens)))
                  .catch(err => dispatch(setIdentityError(new IdentityError('Error during impersonate identity', err))))
        })
    }

    let refreshToken = identity && identity.tokens ? identity.tokens.refresh : null
    return dispatch(apiAction(['identity', 'impersonate'],  { ...credentials
                                                        , fingerprint: identity.fingerprint || noop()
                                                        , subject: identity.subject || noop()
                                                        , refreshToken
                                                        , clientId
                                                        }))
        .then(data => extractTokens(data))
        .then(tokens => dispatch(setIdentity(tokens)))
        .catch(err => dispatch(setIdentityError(new IdentityError('Error during impersonate identity', err))))
  }
}

/** GETS CALLED AUTOMATICALLY IF USER IS AUTHORIZED */
export function postAuthorize() {
  return (dispatch, getState) => {
    dispatch(postAuthorizeEvent('start'))

    dispatch(postAuthorizeEvent('end'))
  }
}

/** GETS CALLED AUTOMATICALLY IF USER IS ADMIN */
export function postAuthorizeAdmin() {
  return (dispatch, getState) => {
    dispatch(postAuthorizeAdminEvent('start'))
    let { api } = getState()
    if(!(api.entities.hasIn(['organizations', 'monikers'] || api.isFetching.hasIn(['organizations', 'monikers']))))
      dispatch(apiAction(['organizations', 'monikers'], ({ Id, Name }) => ({ id: Id, name: Name })))
    dispatch(postAuthorizeAdminEvent('end'))
  }
}

