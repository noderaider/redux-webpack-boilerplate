import Immutable from 'immutable'
import { name } from 'config-client'
import  { FORGET_TOKENS
        , FORGET_FINGERPRINT
        , FETCH_IDENTITY
        , SET_IDENTITY
        , POST_AUTHORIZE
        , POST_AUTHORIZE_ADMIN
        , IDENTITY_INVALID
        , IDENTITY_EXPIRED
        //, DISMISS_ERROR
        , AUTHORIZE_MIDDLEWARE
        } from '../constants'

const getAppClaimSchema = name => `http://schemas.${name}.com/identity/claims/${name}`
const getClaim = (decodedToken, name) => decodedToken[name]
const hasAppClaim = (decodedToken, name, value) => hasClaim(decodedToken, getAppClaimSchema(name), value)
const getAppClaim = (decodedToken, name) => getClaim(decodedToken, getAppClaimSchema(name))
const hasRole = (decodedToken, roleName) => hasClaim(decodedToken, getAppClaimSchema('role'), roleName)
const hasClaim = (decodedToken, name, value) => {
  let claim = getClaim(decodedToken, name)
  // if claim exists but value was not specified, return true
  if (claim && !value)
    return true
  if (claim)
    return Array.isArray(claim) ? claim.indexOf(value) !== -1 : claim === value
}


function tokens(state = null, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case SET_IDENTITY:
      if(error || !payload.tokens)
        return null
      return payload.tokens
    case FORGET_TOKENS:
    case IDENTITY_INVALID:
      return null
    case AUTHORIZE_MIDDLEWARE:
      return error ? null : state
  }
  return state
}

function fingerprint(state = null, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_FINGERPRINT:
      return null
    case SET_IDENTITY:
      if(error)
        return state
      const { decodedToken } = payload
      return getAppClaim(decodedToken, 'fingerprint')
  }
  return state
}


function isFetching(state = false, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FETCH_IDENTITY:
      return true
    case SET_IDENTITY:
      return false
  }
  return state
}

function isAuthorized(state = false, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return false
    case AUTHORIZE_MIDDLEWARE:
      return error ? false : state
    case SET_IDENTITY:
      return error ? false : true
  }
  return state
}


function subject(state = null, action = {}) {
  const { type, payload, error } = action
  if(error)
    return state
  switch(type) {
    case SET_IDENTITY:
      const { decodedToken } = payload
      return getClaim(decodedToken, 'sub')
  }
  return state
}

function user(state = null, action = {}) {
  const { type, payload, error } = action

  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return null
    case AUTHORIZE_MIDDLEWARE:
      return error ? null : state
    case SET_IDENTITY:
      if(error)
        return null
      const { decodedToken } = payload
      let fullName = getAppClaim(decodedToken, 'username') // userfullname
      /** Probably should switch this parsing around to return 'userfirstname' and 'userlastname' */
      let sanitizedFullName = fullName ? fullName.trim() : 'Unknown Name'
      let nameParts = sanitizedFullName.split(' ').map(x => x.trim()).filter(x => x && x.length > 0)
      let [ firstName, ...lastNames ] = nameParts
      return  { username: getClaim(decodedToken, 'sub')
              , id: getAppClaim(decodedToken, 'userid')
              , fullName
              , firstName
              , lastName: lastNames.join(' ')
              }
  }
  return state
}

function actualUser(state = null, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return null
    case AUTHORIZE_MIDDLEWARE:
      return error ? null : state
    case SET_IDENTITY:
      if(error)
        return null
      const { decodedToken } = payload
      return  { username: getAppClaim(decodedToken, 'actualusername') || 'No Actual Username' // 'implement?'
              , id: getAppClaim(decodedToken, 'actualuserid') || 'No Actual User Id'
              , fullName: getAppClaim(decodedToken, 'actualfullName') || 'No Full Name' // 'implement?'
              , firstName: getAppClaim(decodedToken, 'actualfirstname') // 'implement?'
              , lastName: getAppClaim(decodedToken, 'actuallastname') // 'implement?'
              }
  }
  return state
}



/** What time (epoch) does token expire at */
function expiresAtMS(state = null, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return null
    case AUTHORIZE_MIDDLEWARE:
      return error ? null : state
    case SET_IDENTITY:
      if(error)
        return null
      const { decodedToken } = payload
      return decodedToken.exp * 1000
  }
  return state
}

/** How long of a window prior to expiration should refresh occur */
const refreshWindowMS = 40000
/** What time (epoch) should refresh occur at */
function refreshAtMS(state = null, action = {}) {
  const { type, payload, error } = action
  switch(type) {
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    //case IDENTITY_EXPIRED:
      return null
    case AUTHORIZE_MIDDLEWARE:
      return error ? null : state
    case SET_IDENTITY:
      if(error)
        return null
      const { decodedToken } = payload
      return decodedToken.exp * 1000 - refreshWindowMS
  }
  return state
}

const initialState =  { isFetching: isFetching()
                      , isAuthorized: isAuthorized()
                      , subject: subject()
                      , user: user()
                      , actualUser: actualUser()
                      , expiresAtMS: expiresAtMS()
                      , refreshAtMS: refreshAtMS()
                      , tokens: tokens()
                      , fingerprint: fingerprint()
                      }


export function identity(state = initialState, action) {
  const { type, payload, error } = action
  switch(type) {
    case FETCH_IDENTITY:
    case SET_IDENTITY:
    case FORGET_TOKENS:
    case FORGET_FINGERPRINT:
    case IDENTITY_INVALID:
    case IDENTITY_EXPIRED:
    case AUTHORIZE_MIDDLEWARE:
      return Object.assign({}, state, { isFetching: isFetching(state.isFetching, action)
                                      , isAuthorized: isAuthorized(state.isAuthorized, action)
                                      , subject: subject(state.subject, action)
                                      , user: user(state.user, action)
                                      , actualUser: actualUser(state.actualUser, action)
                                      , expiresAtMS: expiresAtMS(state.expiresAtMS, action)
                                      , refreshAtMS: refreshAtMS(state.refreshAtMS, action)
                                      , tokens: tokens(state.tokens, action)
                                      , fingerprint: fingerprint(state.fingerprint, action)
                                      })
  }
  return state
}
