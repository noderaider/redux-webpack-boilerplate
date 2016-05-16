import { packageName, packageKey } from 'config'
import { setText } from 'lib/redux/actions/visual'
import subscribeStore from './subscribeStore'

export default function initBrowserStore(store) {
  const unsubscribe = subscribeStore(store)
  return unsubscribe
}
