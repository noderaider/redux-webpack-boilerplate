export const saveGlobalStore = store => {
  window.tix = window.tix || {}
  window.tix._store = store
}

export const resolveGlobalStore = (pollFrequencyMS = 100) => {
  return new Promise((resolve, reject) => {
    try {
      window.tix = window.tix || {}
      if(window.tix._store)
        return resolve(window.tix._store)
      let interval = setInterval(() => {
        if(window.tix._store) {
          clearInterval(interval)
          resolve(window.tix._store)
        }
      }, 100)
    } catch(err) {
      if(interval)
        clearInterval(interval)
      reject(err)
    }
  })
}
