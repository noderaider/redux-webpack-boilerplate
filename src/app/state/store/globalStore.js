import { appKey } from 'config'

export const saveGlobalStore = store => {
  window[appKey] = window[appKey] || {}
  window[appKey]._store = store
}

export const resolveGlobalStore = (pollFrequencyMS = 100) => {
  return new Promise((resolve, reject) => {
    try {
      window[appKey] = window[appKey] || {}
      if(window[appKey]._store)
        return resolve(window[appKey]._store)
      let interval = setInterval(() => {
        if(window[appKey]._store) {
          clearInterval(interval)
          resolve(window[appKey]._store)
        }
      }, 100)
    } catch(err) {
      if(interval)
        clearInterval(interval)
      reject(err)
    }
  })
}
