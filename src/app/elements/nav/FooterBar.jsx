import React, { Component, PropTypes } from 'react'
import Label from 'elements/forms/controls/Label'
import classNames from 'classnames'
import Identity from 'controls/Identity'

import DevMicro from 'elements/micro/DevMicro'
import HotMicro from 'elements/micro/HotMicro'

import FA from 'elements/visual/FA'

import contextTypes from 'app/context'
import './FooterBar.css'

const inlineStyle = { display: 'inline-block' }

const AttributesBar = props => (
  <div style={inlineStyle}>
    {__DEV__ ? <DevMicro /> : null}
    {__HOT__ ? <HotMicro /> : null}
  </div>
)


export default class FooterBar extends Component {
  static propTypes =  { showCopyright: PropTypes.bool.isRequired
                      , showLegal: PropTypes.bool.isRequired
                      , showAttributes: PropTypes.bool.isRequired
                      , errors: PropTypes.array
                      };
  static defaultProps = { showCopyright: true
                        , showLegal: true
                        , showAttributes: !__PROD__
                        };
  static contextTypes = contextTypes;
  render() {
    const { showAttributes, showLegal, showCopyright } = this.props
    const { palette, color, brand, style } = this.context.theme
    const { footer } = style

    return (
      <div style={footer.wrapper}>
        <div style={footer.left}>
          <div style={footer.row}>
            <a href="https://js.org" target="_blank" title="JS.ORG | JavaScript Community">
              <img src="https://logo.js.org/dark_horz.png" width="102" alt="JS.ORG Logo"/>
            </a>
            {/* alternatives [bright|dark]_[horz|vert|tiny].png (width[horz:102,vert:50,tiny:77]) */}
          </div>
          <div style={footer.row}>
            <Identity />
          </div>
        </div>
        <div style={footer.right}>
          <div style={footer.row}>
          </div>
          <div style={footer.row}>
            <AttributesBar />
          </div>
        </div>
      </div>
    )
  }
}
