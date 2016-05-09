import { assert } from 'chai'
import Promise from 'bluebird'
import React, { Component, PropTypes } from 'react'
//import ReactLoad from 'react-load'

/*
const Load = ReactLoad({ assert, Promise, System, React })
const renderFactory = ({ Timeout }) => <Timeout />
*/

/**
 * Index Module
 * @module Index
 */
export default class Index extends Component {
  static propTypes =  {
                      };
  render() {
    return (
      <div>INDEX (SERVER)</div>
    )
  }
}
        /*
      <Load
        browserImports={{ Timeout: 'app/containers/Timeout.js' }}
        renderFactory={renderFactory}

        />
        */
