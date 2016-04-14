/**
 * Token services
 * Module for working with JWT tokens on the client.
 * @module client/core/jwt
 */

import jwtSimple from 'jwt-simple'
import { state } from 'config-client'
import { saveState, loadState, removeState } from 'services/state'

const noop = () => {}

export function saveTokens(tokens) {
  if(!(tokens && tokens.access && tokens.refresh))
    throw new Error(`Could not save tokens because they are in a corrupt state => ${JSON.stringify(tokens)}`)
  saveState({ tokens: [tokens.access, tokens.refresh] })
}

export function revokeTokens() {
  removeState(['tokens'])
}

export function loadTokens() {
  let { tokens } = loadState(['tokens'])
  if(tokens && tokens.length === 2)
    return { access: tokens[0], refresh: tokens[1] }
  return noop()
}

export function loadAccessToken() {
  let tokens = loadTokens()
  return tokens ? tokens.access : noop()
}

export function loadRefreshToken() {
  let tokens = loadTokens()
  return tokens ? tokens.refresh : noop()
}

export function isTokenExpired({ accessToken, decodedToken }) {
  let expiresInMS = getTokenExpiresInMS({ accessToken, decodedToken })
  return expiresInMS < 0
}

export function getTokenExpiresInMS({ accessToken, decodedToken }) {
  if(!accessToken && !decodedToken)
    throw new Error('Must provide a accessToken or decodedToken value.')
  if(!decodedToken)
    decodedToken = decodeToken(accessToken)
  let expiresInMS = decodedToken.exp * 1000 - Date.now()
}

export const decodeToken = accessToken => jwtSimple.decode(accessToken, null, true)
