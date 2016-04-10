import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const CharacterCount = props => {

  return (
    <div />
  )
}


CharacterCount.propTypes =  { componentID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
                            , maxCount: PropTypes.number.isRequired
                            , textValue: PropTypes.string.isRequired
                            };

const mapStateToProps = (state, ownProps) => {
  const { visual } = state
  const { componentID } = ownProps
  const { maxCount, textValue } = visual.text.get(componentID)
  return  { ...ownProps, maxCount, textValue }
}

export default connect(mapStateToProps)(CharacterCount)
