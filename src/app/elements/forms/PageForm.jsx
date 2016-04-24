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

    const { fields: { title, subtitle, username, organization, email, full, packageName }, resetForm, handleSubmit, submitting, initialValues } = this.props
    const { theme: { palette, color, style }, gridProps } = this.context

    const formStyle = { display: 'flex'
                      , flexDirection: 'column'
                      , justifyContent: 'center'
                      , alignItems: 'center'
                      //, padding: 20

                      }
    const controlStyle =  { display: 'flex'
                          , flexDirection: 'row'
                          , justifyContent: 'space-between'
                          , alignItems: 'center'
                          , minWidth: 500
                          }
    const labelStyle = { float: 'left' }
    const inputStyle = { margin: 10, float: 'right' }

    return (
      <form style={style.form} onSubmit={handleSubmit}>
        <div style={formStyle}>
          <div style={controlStyle}>
            <h2 style={{display: 'inline', padding: 0, margin: 0}}>Page Setup</h2>
            <h4 style={{display: 'inline', marginLeft: 'auto'}}>Bottom Up Configuration</h4>
          </div>
          <div style={controlStyle}>
            <label htmlFor="title-input" style={labelStyle}>title</label>
            <Input
              id="title-input"
              style={inputStyle}
              ref={x => this.title=x}
              type="text"
              placeholder="title"
              {...title}
            />
          </div>
          <div style={controlStyle}>
            <label htmlFor="subtitle-input" style={labelStyle}>subtitle</label>
            <Input
              id="subtitle-input"
              style={inputStyle}
              type="text"
              placeholder="subtitle"
              {...subtitle}
            />
          </div>
          <div style={controlStyle}>
            <label htmlFor="username-input" style={labelStyle}>username</label>
            <Input
              id="username-input"
              style={inputStyle}
              type="text"
              placeholder="username"
              {...username}
            />
          </div>
          <div style={controlStyle}>
            <label htmlFor="organization-input" style={labelStyle}>organization</label>
            <Input
              id="organization-input"
              style={inputStyle}
              type="text"
              placeholder="organization"
              {...organization}
            />
          </div>
          <div style={controlStyle}>
            <label htmlFor="email-input" style={labelStyle}>email</label>
            <Input
              id="email-input"
              style={inputStyle}
              type="text"
              placeholder="email"
              {...email}
            />
          </div>
          <div style={controlStyle}>
            <label htmlFor="full-input" style={labelStyle}>full</label>
            <Input
              id="full-input"
              style={inputStyle}
              type="text"
              placeholder="full"
              {...full}
            />
          </div>
          <div style={controlStyle}>
            <label htmlFor="package-input" style={labelStyle}>package</label>
            <Input
              id="package-input"
              style={inputStyle}
              type="text"
              placeholder="package"
              {...packageName}
            />
          </div>
          {/*
          <div style={controlStyle}>
            <button
                style={{ ...style.input, borderRadius: 5, cursor: 'pointer', borderColor: palette['base0'], minWidth: 150 }}
                type="submit"
                //disabled={submitting}
                disabled={true}
                onClick={handleSubmit}>
                Write
            </button>
          </div>
        */}
        </div>
      </form>
    )
  }
}



export default reduxForm( { form: 'page'
                          , fields: ['title', 'subtitle', 'username', 'organization', 'email', 'full', 'packageName']
                          , validate
                          }
                        , ({ visual }) => ( { initialValues:  { title: visual.text.get('title', '')
                                                              , subtitle: visual.text.get('subtitle', '')
                                                              , username: visual.text.get('username', '')
                                                              , organization: visual.text.get('organization', '')
                                                              , email: visual.text.get('email', '')
                                                              , full: visual.text.get('full', '')
                                                              , packageName: visual.text.get('packageName', '')
                                                              }
                                            } ))(PageForm)
