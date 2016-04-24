import React, { Component, PropTypes } from 'react'
import { Well, Grid, Row, Col, Label, Panel, Button, ButtonGroup } from 'react-bootstrap'
import bindAll from 'lodash.bindall'

export default class DebugPanel extends Component {
  static propTypes =  { godMode: PropTypes.bool
                      };
  static defaultProps = { godMode: false
                        };
  constructor(props) {
    super(props)
    this.state =  { godMode: props.godMode
                  , version: '2.0'
                  , title: 'Debug Panel'
                  }

    bindAll(this, ['getLabels'])
  }

  getLabels() {
    let godModeLabel = () => this.state.godMode ? <Label bsStyle="danger">GOD MODE</Label> : null
    return (<div>
      {this.state.title}
      <span className="pull-right">
        {godModeLabel()}
        {' '}
        <Label>{this.state.version}</Label>
      </span>
    </div>)
  }
  render() {
    return (<Row>
      <Col xs={12} lg={10} >
        <Panel header={this.getLabels()}>
          <Row>
            <Col xs={12}>
              <h4 className="pull-left">Actions</h4>
            {/* TODO: ADD FUNCTIONS HERE */}

            </Col>
          </Row>
        </Panel>
      </Col>
    </Row>)
  }
}
