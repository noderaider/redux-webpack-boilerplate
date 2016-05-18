import { packageName, packageKey, IS_BROWSER } from 'config'
import { actions as idleActions } from 'lib/redux/modules/redux-idle-monitor'
import { setText } from 'lib/redux/actions/visual'
import subscribeStore from './subscribeStore'

export default function initBrowserStore(store) {
  const unsubscribe = subscribeStore(store)
  if(IS_BROWSER)
    store.dispatch(idleActions.start())
  return unsubscribe
}
