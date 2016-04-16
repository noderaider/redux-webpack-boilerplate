import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap'
import Input from './controls/Input'
import contextTypes from 'app/context'

const validate = values => {
  let errors = {}
  return errors
}

class PageForm extends Component {
  static contextTypes = contextTypes;
  static propTypes =  { fields: PropTypes.object.isRequired
                      , handleSubmit: PropTypes.func.isRequired
                      , submitting: PropTypes.bool.isRequired
                      };
  render() {

    const { fields: { title, subtitle }, resetForm, handleSubmit, submitting, initialValues } = this.props
    const { theme: { palette, color, style }, gridProps } = this.context

    const formStyle = { display: 'flex'
                      , flexDirection: 'column'
                      , justifyContent: 'center'
                      , alignItems: 'center'
                      , padding: 20
                      }
    const controlStyle =  { padding: 10
                          //marginLeft: 20
                          }

    return (
      <form onSubmit={handleSubmit}>
        <div style={formStyle}>
          <div style={{ marginLeft: 20, marginRight: 'auto', marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}>
            <h2 style={{display: 'inline', padding: 0, margin: 0}}>Page Setup</h2>
            <h4 style={{display: 'inline', marginLeft: 20}}>Bottom Up Configuration</h4>
          </div>
          <div style={controlStyle}>
            <Input
              ref={x => this.title=x}
              type="text"
              placeholder="title"
              {...title}
            />
          </div>
          <div style={controlStyle}>
            <Input
              type="text"
              placeholder="subtitle"
              {...subtitle}
            />
          </div>
          <div style={controlStyle}>
            <button
                style={{ ...style.input, borderRadius: 5, cursor: 'pointer', borderColor: palette['base0'], minWidth: 150 }}
                type="submit"
                disabled={submitting}
                onClick={handleSubmit}>
                Write
            </button>
          </div>
        </div>
      </form>
    )
  }
}



export default reduxForm( { form: 'page'
                          , fields: ['title', 'subtitle']
                          , validate
                          }
                        , ({ visual }) => ( { initialValues:  { title: visual.text.get('title', '')
                                                              , subtitle: visual.text.get('subtitle', '')
                                                              }
                                            } ))(PageForm)
