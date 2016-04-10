import config, { name } from 'config-client'

export const injectConfigIntoGlobal = () => {
  window[name] = window[name] || {}
  window[name].config = window[name].config || config
}
