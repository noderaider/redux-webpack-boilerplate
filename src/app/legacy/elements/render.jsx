import React from 'react'
import ReactDOM from 'react-dom'
import Expander from './Expander'
import CharacterCount from './CharacterCount'


const fragmentTypeMap = new Map([['expander', Expander], ['character-count', CharacterCount]])

export const renderFragment = (fragmentType, componentID, props) => {
  const domNode = document.querySelector(`[data-fragment-type="${fragmentType}"][data-component-id="${componentID}"]`)
  const ReactElement = fragmentTypeMap.get(fragmentType)
  return renderInline(domNode, ReactElement, { ...props, componentID })
}

export const renderInline = (domNode, ReactElement, props) => ReactDOM.render(<ReactElement {...props} />, domNode)
