import subscribeStore from './subscribeStore'
import hydrateStore from './hydrateStore'

export default function initBrowserStore(store) {
  const unsubscribe = subscribeStore(store)
  hydrateStore(store)
  return unsubscribe
}
