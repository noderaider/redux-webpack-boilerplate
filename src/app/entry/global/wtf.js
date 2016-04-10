import { diagnose } from 'services/diagnostics'

export const injectWTFIntoGlobal = () => {
  window[name] = window[name] || {}
  let diagnostics = { wtf: () => diagnose() }
  Object.assign(window[name], diagnostics)
}
