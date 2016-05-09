import { assert } from 'chai'
import { push } from 'react-router-redux'
import { createAction } from 'redux-actions'
import { client } from 'config'
import { apiAction, isExpired, decodeToken } from './api'
import { saveState, loadState, removeState } from 'app/services/state'
import { goToPath } from 'app/services/location'
import IdentityError from 'app/errors/IdentityError'

import  { FORGET_TOKENS
        , FORGOTTEN_TOKENS
        , FORGET_FINGERPRINT
        , FORGOTTEN_FINGERPRINT
        , FETCH_IDENTITY
        , SET_IDENTITY
        , PERSISTED_TOKENS
        , PERSISTED_FINGERPRINT
        , IDENTITY_INVALID
        , IDENTITY_EXPIRED
        } from 'lib/redux/constants'

const { clientId } = client
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

const getRefreshTokenFromCookie = () => {
  const { tokens } = loadState(['tokens'])
  const [access, refresh] = tokens
  return refresh
}

const extractTokens = response => (dispatch, getState) => {
  if(response.error)
    throw new IdentityError(`Unable to authorize => ${JSON.stringify(response)}`)
  if(typeof response === 'string' && response.includes('AllowOneTime')) {
    const code = response.split('|')[1]
    return dispatch(push(`/identity/maintenance/migrate/${code}`))
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
      .then(data => dispatch(extractTokens(data)))
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
    let refreshToken = getRefreshTokenFromCookie()
    if(!refreshToken)
      return dispatch(setIdentityError(new IdentityError('No refresh token exists to refresh identity.', null, identity)))
    return dispatch(apiAction(['identity', 'refresh'],  { ...credentials
                                                        , fingerprint: identity.fingerprint || noop()
                                                        , subject: identity.subject || noop()
                                                        , refreshToken
                                                        , clientId
                                                        }))
      .then(data => dispatch(extractTokens(data)))
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
                  .then(data => dispatch(extractTokens(data)))
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
        .then(data => dispatch(extractTokens(data)))
        .then(tokens => dispatch(setIdentity(tokens)))
        .catch(err => dispatch(setIdentityError(new IdentityError('Error during impersonate identity', err))))
  }
}
