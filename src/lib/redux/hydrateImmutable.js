import Immutable from 'immutable'

export const HYDRATE = '@@redux/INIT'

/** Tests if object is an immutable structure and if not returns a new state that is immutable. */
export default function hydrateImmutable(state, action = {}) {
  return [action.type === HYDRATE && !Immutable.Iterable.isIterable(state) ? Immutable.fromJS(state) : state, action]
}
