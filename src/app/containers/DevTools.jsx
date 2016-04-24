import React from 'react'

import { createDevTools } from 'redux-devtools'

import DockMonitor from 'redux-devtools-dock-monitor'
/*
import LogMonitor from 'redux-devtools-log-monitor'
import SliderMonitor from 'redux-slider-monitor'
import DiffMonitor from 'redux-devtools-diff-monitor'
import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor'
*/
import ChartMonitor from 'redux-devtools-chart-monitor'

/*
const LogDock = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultPosition="right"
    defaultSize={0.4}>
    <LogMonitor theme="solarized" />
  </DockMonitor>
)

const SliderDock = createDevTools(
  <DockMonitor
          toggleVisibilityKey="ctrl-h"
          changePositionKey="ctrl-q"
          defaultPosition="bottom"
          defaultSize={0.15}>
    <SliderMonitor keyboardEnabled theme="solarized" />
  </DockMonitor>
)

const DiffDock = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultPosition="right"
    defaultSize={0.4}>
      <DiffMonitor />
  </DockMonitor>
)
*/

const FilterableLogDock = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultPosition="bottom"
    defaultIsVisible={false}
    defaultSize={0.4}>
    <ChartMonitor theme="solarized" />
  </DockMonitor>
)

/*
const ChartDock = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultPosition="bottom"
    defaultIsVisible={false}
    defaultSize={0.4}>
    <ChartMonitor theme="solarized" invertTheme={true} hasImmutables={true} />
  </DockMonitor>
)
*/

export default FilterableLogDock
