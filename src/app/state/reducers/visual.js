import Immutable from 'immutable'
import  { TOGGLE_VISIBILITY
        , SET_VISIBILITY
        , SET_THEME
        , TOGGLE_EXPANDER
        , SET_EXPANDER
        , UPDATE_TEXT
        , REGISTER_TOOLTIP
        , DISPOSE_TOOLTIP
        } from '../constants'

const nextValue = current => {
  let value = current.get('value')
  let options = current.get('options')
  let nextIndex = options.indexOf(value) + 1
  return nextIndex >= options.size ? options.first() : options.get(nextIndex)
}

const initialVisibility = Immutable.Map()
function visibility(state = initialVisibility, action = {}) {
  const { type, payload, error } = action
  if(error || !payload)
    return state
  const { componentID, value, options } = payload
  switch(type) {
    case TOGGLE_VISIBILITY:
      const current = state.get(componentID)
      if(current) {
        const next = nextValue(current)
        return state.setIn([componentID, 'value'], next)
      }
      return state.set(componentID, Immutable.fromJS({ options, value }))
    case SET_VISIBILITY:
      if(state.has(componentID))
        return state.setIn([componentID, 'value'], value)
      return state.set(componentID, Immutable.fromJS({ options, value }))
  }
  return state
}

const initialExpanders = Immutable.Map()
function expanders(state = initialExpanders, action = {}) {
  const { type, payload, error } = action
  if(error || !payload)
    return state
  const { componentID, value, initialExpanders } = payload
  switch(type) {
    case SET_EXPANDER:
      return state.set(componentID, value)
    case TOGGLE_EXPANDER:
      return state.update(componentID, initialExpanders, x => !x )
  }
  return state
}

const initialText = Immutable.Map()
function text(state = initialText, action = {}) {
  const { type, payload, error } = action
  if(error || !payload)
    return state
  switch(type) {
    case UPDATE_TEXT:
      const { componentID, maxCount, textValue } = payload
      const currentCount = textValue.length || 0
      const remainingCount = maxCount - currentCount
      return state.mergeDeep({ [componentID]: { textValue, maxCount, currentCount, remainingCount } })
  }
  return state
}

const initialTooltip = Immutable.Map()
function tooltip(state = initialTooltip, action = {}) {
  const { type, payload, error } = action
  if(error || !payload)
    return state
  const { componentID, props } = payload
  switch(type) {
    case REGISTER_TOOLTIP:
      state.set(componentID, props)
    case DISPOSE_TOOLTIP:
      state.remove(componentID)
  }
  return state
}

const initialTheme = 'solarized'
function theme(state = initialTheme, action = {}) {
  const { type, payload, error } = action
  if(error || !payload)
    return state
  switch(type) {
    case SET_THEME:
      return payload.name
  }
  return state
}

const initialState = { visibility: visibility(), theme: theme(), expanders: expanders(), tooltip: tooltip() }

export function visual(state = initialState, action) {
  const { type, payload, error } = action
  switch(type) {
    case TOGGLE_VISIBILITY:
    case SET_VISIBILITY:
      return Object.assign({}, state, { visibility: visibility(state.visibility, action) })
    case SET_THEME:
      return Object.assign({}, state, { theme: theme(state.theme, action)})
    case TOGGLE_EXPANDER:
    case SET_EXPANDER:
      return Object.assign({}, state, { expanders: expanders(state.expanders, action)})
    case REGISTER_TOOLTIP:
    case DISPOSE_TOOLTIP:
      return Object.assign({}, state, { tooltip: tooltip(state.tooltip, action)})
  }
  return state
}
