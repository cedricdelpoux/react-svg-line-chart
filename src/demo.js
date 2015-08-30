import './demo.css'
import 'react-svg-line-chart/lib/index.css'
import 'react-simple-tooltip/lib/index.css'

import React, { Component } from 'react'
import LineChart from 'react-svg-line-chart'
import Tooltip from 'react-simple-tooltip'

const data = []

for (let x = 1; x <= 30; x++) {
  data.push({ x: x, y: Math.floor(Math.random() * (100)) })
}

export default class Demo extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      activePoint: null,
      hoveredPointRadius: 6,
      noarea: false,
      noaxis: false,
      nogrid: false,
      nolabel: false,
      nopath: false,
      nopoint: false,
      pointRadius: 4,
      tooltipTrigger: null,
      viewBoxHeight: 300,
      viewBoxWidth: 800,
      yLabelsNb: 5,
      yLabelsWidth: 40,
    }
  }

  handlePointHover(point, trigger) {
    this.setState({
      activePoint: point,
      tooltipTrigger: trigger,
    })
  }

  render() {
    const {
      activePoint,
      hoveredPointRadius,
      noarea,
      noaxis,
      nogrid,
      nolabel,
      nopath,
      nopoint,
      pointRadius,
      tooltipTrigger,
      viewBoxHeight,
      viewBoxWidth,
      yLabelsNb,
      yLabelsWidth,
    } = this.state

    return (
      <div className="demo">
        <div className="demo_options">
          <label className="demo_label">Area :</label>
          <select
            className="demo_select"
            defaultValue={ noarea }
            onChange={ (e) => this.setState({ noarea: JSON.parse(e.target.value) }) }
          >
            <option value="false">True</option>
            <option value="1">False</option>
          </select>

          <label className="demo_label">Grid :</label>
          <select
            className="demo_select"
            defaultValue={ nogrid }
            onChange={ (e) => this.setState({ nogrid: JSON.parse(e.target.value) }) }
          >
            <option value="false">True</option>
            <option value="true">False</option>
          </select>

          <label className="demo_label">Labels :</label>
          <select
            className="demo_select"
            defaultValue={ nolabel }
            onChange={ (e) => this.setState({ nolabel: JSON.parse(e.target.value) }) }
          >
            <option value="false">True</option>
            <option value="true">False</option>
          </select>

          <label className="demo_label">Path :</label>
          <select
            className="demo_select"
            defaultValue={ nopath }
            onChange={ (e) => this.setState({ nopath: JSON.parse(e.target.value) }) }
          >
            <option value="false">True</option>
            <option value="true">False</option>
          </select>

          <label className="demo_label">Points :</label>
          <select
            className="demo_select"
            defaultValue={ nopoint }
            onChange={ (e) => this.setState({ nopoint: JSON.parse(e.target.value) }) }
          >
            <option value="false">True</option>
            <option value="true">False</option>
          </select>

          <label className="demo_label">Axis :</label>
          <select
            className="demo_select"
            defaultValue={ noaxis }
            onChange={ (e) => this.setState({ noaxis: JSON.parse(e.target.value) }) }
          >
            <option value="false">True</option>
            <option value="true">False</option>
          </select>

          <label className="demo_label">Y labels number :</label>
          <select
            className="demo_select"
            defaultValue={ yLabelsNb }
            onChange={ (e) => this.setState({ yLabelsNb: Number.parseInt(e.target.value) }) }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <label className="demo_label">Point radius :</label>
          <select
            className="demo_select"
            defaultValue={ pointRadius }
            onChange={ (e) => this.setState({ pointRadius: Number.parseInt(e.target.value) }) }
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <label className="demo_label">Hover point radius :</label>
          <select
            className="demo_select"
            defaultValue={ hoveredPointRadius }
            onChange={ (e) => this.setState({ hoveredPointRadius: Number.parseInt(e.target.value) }) }
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div>
          { tooltipTrigger
            ? (
              <Tooltip placement="top" theme="green" trigger={ tooltipTrigger }>
                <div>y : { activePoint.y }</div>
                <div>x : { activePoint.x }</div>
              </Tooltip>
            )
            : null
          }

          <LineChart
            activePoint={ this.state.activePoint }
            data={ data }
            hoveredPointRadius={ this.state.hoveredPointRadius }
            noarea={ this.state.noarea }
            noaxis={ this.state.noaxis }
            nogrid={ this.state.nogrid }
            nolabel={ this.state.nolabel }
            nopath={ this.state.nopath }
            nopoint={ this.state.nopoint }
            onPointHover={ ::this.handlePointHover }
            pointRadius={ this.state.pointRadius }
            tooltipTrigger={ this.state.tooltipTrigger }
            viewBoxHeight={ this.state.viewBoxHeight }
            viewBoxWidth={ this.state.viewBoxWidth }
            yLabelsNb={ this.state.yLabelsNb }
            yLabelsWidth={ this.state.yLabelsWidth }
          />
        </div>
      </div>
    )
  }
}
