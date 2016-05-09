import subscribeStore from './subscribeStore'
import hydrateStore from './hydrateStore'
import injectComponents from './injectComponents'

export default function initBrowserStore(store) {
  const unsubscribe = subscribeStore(store)
  hydrateStore(store)
  injectComponents(store)
  return unsubscribe
}
