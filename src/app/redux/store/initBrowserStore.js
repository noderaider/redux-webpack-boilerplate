import { packageName, packageKey } from 'config'
import subscribeStore from './subscribeStore'
import hydrateStore from './hydrateStore'
import { setText } from '../actions/visual'

export default function initBrowserStore(store) {
  const unsubscribe = subscribeStore(store)
  store.dispatch(setText( { title: packageKey
                          , subtitle: 'ACTIVE'
                          , packageName
                          , username: 'your.github.username'
                          , organization: 'your.github.organization'
                          , email: 'your.email@email.com'
                          , full: 'Your Full Name'
                          }))
  hydrateStore(store)
  return unsubscribe
}
