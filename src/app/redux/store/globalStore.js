import Promise from 'bluebird'
import { assert } from 'chai'
import { appKey } from 'config'

const createGlobalAccessor = GLOBAL_KEY => {
  window[GLOBAL_KEY] = window[GLOBAL_KEY] || {}
  return  { set: (key, value) => window[GLOBAL_KEY][key] = value
          , get: key => window[GLOBAL_KEY][key]
          }
}

const STORE_KEY = '__store__'
const HISTORY_KEY = '__history__'
const INITIAL_STATE_KEY = '__initialState__'
const accessor = createGlobalAccessor(appKey)
const pollFrequency = 100

export const saveStore = (store, history) => {
  assert.ok(store, 'store is required for global persistence')
  assert.ok(history, 'history is required for global persistence')
  accessor.set(STORE_KEY, store)
  accessor.set(HISTORY_KEY, history)
}


export const resolveStore = (pollFrequencyMS = 100) => {
  return new Promise((resolve, reject) => {
    try {
      let store = accessor.get(STORE_KEY)
      if(store)
        return resolve([store, accessor.get(HISTORY_KEY)])
      let interval = setInterval(() => {
        store = accessor.get(STORE_KEY)
        if(store) {
          clearInterval(interval)
          resolve([store, accessor.get(HISTORY_KEY)])
        }
      }, pollingFrequency)
    } catch(err) {
      if(interval)
        clearInterval(interval)
      reject(err)
    }
  })
}

export const setInitialState = initialState => accessor.set(INITIAL_STATE_KEY, initialState)
export const getInitialState = () => accessor.get(INITIAL_STATE_KEY)
