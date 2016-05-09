import  { hydrateTokens } from '../actions/identity'

export default function hydrateStore(store) {
  const action = hydrateTokens()
  if(action)
    store.dispatch(action)
}
