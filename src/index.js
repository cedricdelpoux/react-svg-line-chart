import './index.css';

import React, { PropTypes } from 'react';
import classNames from 'classnames';

const { arrayOf, bool, func, number, shape } = PropTypes;

export default class LineChart extends React.Component {
  static propTypes = {
    activePoint: shape({
      x: number,
      y: number,
    }),
    data: arrayOf(shape({
      x: number,
      y: number,
    })).isRequired,
    formatX: func,
    formatY: func,
    hoveredPointRadius: number,
    noarea: bool,
    noaxis: bool,
    noXaxis: bool,
    noXaxisPoints: bool,
    noYaxis: bool,
    noYaxisPoints: bool,
    nogrid: bool,
    noGridXLines: bool,
    noGridYLines: bool,
    nolabel: bool,
    noXlabel: bool,
    noYlabel: bool,
    nopath: bool,
    nopoint: bool,
    onPointHover: func,
    pointRadius: number,
    viewBoxHeight: number,
    viewBoxWidth: number,
    yLabelsNb: number,
    xLabelsStep:number,
    yLabelsWidth: number,
  }

  static defaultProps = {
    activePoint: {
      x: null,
      y: null,
    },
    data: [],
    hoveredPointRadius: 6,
    noarea: false,
    noaxis: false,
    noXaxis: false,
    noXaxisPoints: false,
    noYaxis: false,
    noYaxisPoints: false,
    nogrid: false,
    noGridXLines: false,
    noGridYLines: false,
    nolabel: false,
    noXlabel: false,
    noYlabel: false,
    nopath: false,
    nopoint: false,
    onPointHover: () => {},
    pointRadius: 4,
    viewBoxHeight: 300,
    viewBoxWidth: 800,
    yLabelsNb: 5,
    xLabelsStep: -1,
    yLabelsWidth: 40,
  }

  /**
   * Chart coordinates
   */

  getMinX() {
    const { data } = this.props
    return data.length > 0 ? data[0].x : 0
  }

  getMaxX() {
    const { data } = this.props
    return data.length > 0 ? data[data.length - 1].x : 0
  }

  getMinY() {
    return 0
  }

  getMaxY() {
    const { data, yLabelsNb } = this.props
    const maxY = data.length > 0 ? data.reduce((max, point) => point.y > max ? point.y : max, data[0].y) : 0
    return Math.ceil(maxY / yLabelsNb) * yLabelsNb
  }

  /**
   * Svg coordinates
   */

  getSvgX(x) {
    const { data, nolabel, viewBoxWidth, yLabelsWidth } = this.props
    const maxX = this.getMaxX()
    const margin = (!nolabel ? yLabelsWidth * 2 : 0)
    return (x / maxX * (viewBoxWidth - margin))
  }

  getSvgY(y) {
    const { data, nolabel, viewBoxHeight } = this.props
    const heightWithoutLabels = viewBoxHeight - (!nolabel ? 20 : 0)
    const maxY = this.getMaxY()
    return heightWithoutLabels - (y / maxY * heightWithoutLabels)
  }

  /**
   * Svg components
   */

  getGrid(chart) {
    const { data, yLabelsNb, noGridXLines, noGridYLines } = this.props
    const minX = this.getMinX()
    const maxX = this.getMaxX()
    const minY = 0
    const gridX = []
    const gridY = []
    const maxY = this.getMaxY()

    if(noGridXLines === false) {
      for (let i = minX; i <= maxX; i++) {
        gridX.push(
          <line
            key={ 'linechart_grid_x_' + i }
            x1={ this.getSvgX(i) }
            y1={ this.getSvgY(minY) }
            x2={ this.getSvgX(i) }
            y2={ this.getSvgY(maxY) }
          />
        )
      }
   }

   if(noGridYLines === false) {
      for (let i = minY; i <= maxY; i += Math.floor(maxY / yLabelsNb)) {
        gridY.push(
          <line
            key={ 'linechart_grid_y_' + i }
            x1={ this.getSvgX(minX) }
            y1={ this.getSvgY(i) }
            x2={ this.getSvgX(maxX) }
            y2={ this.getSvgY(i) }
          />
        )
      }
   }

    return (
      <g className="linechart_grid">
        { gridX }
        { gridY }
      </g>
    )
  }

  getPath() {
    const { area, data } = this.props
    let pathD = 'M ' + this.getSvgX(data[0].x) + ' ' + this.getSvgY(data[0].y) + ' '

    data.map((point, i) => {
      pathD += 'L ' + this.getSvgX(point.x) + ' ' + this.getSvgY(point.y) + ' '
    })

    return (
      <path className="linechart_path" d={ pathD } />
    )
  }

  getArea() {
    const { data } = this.props
    let pathD = 'M ' + this.getSvgX(data[0].x) + ' ' + this.getSvgY(data[0].y) + ' '

    data.map((point, i) => {
      pathD += 'L ' + this.getSvgX(point.x) + ' ' + this.getSvgY(point.y) + ' '
    })

    pathD += 'L ' + this.getSvgX(data[data.length - 1].x) + ' ' + this.getSvgY(0) + ' '
    pathD += 'L ' + this.getSvgX(data[0].x) + ' ' + this.getSvgY(0) + ' '

    return (
      <path className="linechart_area" d={ pathD } />
    )
  }

  getLabels() {
    const { data, formatX, formatY, yLabelsNb, noXaxisPoints, noYaxisPoints, noXlabel, noYlabel } = this.props;
    const minX = this.getMinX()
    const maxY = this.getMaxY()
    const yLabelsRange = []
    const intMaxX = Math.ceil(this.getMaxX())
    const intMinX = Math.floor(minX)
    
    for (let i = 0; i <= maxY; i += Math.floor(maxY / yLabelsNb)) {
      yLabelsRange.push(i)
    }

    let xLabels = !noXlabel ? data.filter((point) => (point.x & 1)).map((point) => (
      <g
        key={ 'linechart_label_x_' + point.x }
        className="linechart_label"
        transform={`translate(${ this.getSvgX(point.x) },${ this.getSvgY(0) })`}
      >
        { !noXaxisPoints ? <circle r="2" cx="0" cy="0" /> : null }
        <text transform="translate(0, 20)" textAnchor="middle">
          { formatX ? formatX(point.x) : point.x }
        </text>
      </g>
    )) : null;
    if (this.props.xLabelsStep > 0) {
      for (let i = intMinX; i <= intMaxX; i += this.props.xLabelsStep) {
        xLabelsRange.push(i)
      }
      xLabels = xLabelsRange.map((x) => (
        <g key={'linechart_label_x_' + x} className="linechart_label" transform={`translate(${this.getSvgX(x)},${this.getSvgY(0)})`}>
          <circle r="2" cx="0" cy="0"/>
          <text transform="translate(0, 20)" textAnchor="middle">
            {formatX
              ? formatX(x)
              : x}
          </text>
        </g>
      ))
    }
const yLabels = !noYlabel ? yLabelsRange.map((y) => (
      <g
        key={ 'linechart_label_y_' + y }
        className="linechart_label"
        transform={`translate(${ this.getSvgX(minX) },${ this.getSvgY(y) })`}
      >
        { !noYaxisPoints ? <circle r="2" cx="0" cy="0" /> : null }
        <text transform="translate(-10, 5)" textAnchor="end">
          { formatY ? formatY(y) : y }
        </text>
      </g>
    )): null;

    return (
      <g className="linechart_labels">
        <g className="linechart_xLabels">{ xLabels }</g>
        <g className="linechart_yLabels">{ yLabels }</g>
      </g>
    )
  }

  getAxis() {
    const { data, noXaxis, noYaxis } = this.props
    const minX = this.getMinX()
    const maxX = this.getMaxX()
    const minY = this.getMinY()
    const maxY = this.getMaxY()

    return (
      <g className="linechart_axis">
        { !noXaxis ? <line
          x1={ this.getSvgX(minX) }
          y1={ this.getSvgY(minY) }
          x2={ this.getSvgX(maxX) }
          y2={ this.getSvgY(minY) }
        /> : null }
        { !noYaxis ? <line
          x1={ this.getSvgX(minX) }
          y1={ this.getSvgY(minY) }
          x2={ this.getSvgX(minX) }
          y2={ this.getSvgY(maxY) }
        /> : null }
      </g>
    )
  }

  getPoints() {
    const { activePoint, data, hoveredPointRadius, pointRadius } = this.props

    return (
      <g className="linechart_points">
      {
        data.map((point, i) => {
          return (
            <circle
              key={ 'linechart_point_' + i }
              className="linechart_point"
              r={ activePoint && activePoint.x === point.x && activePoint.y === point.y ? hoveredPointRadius : pointRadius }
              cx={ this.getSvgX(point.x) }
              cy={ this.getSvgY(point.y) }
              onMouseEnter={ (e) => this.props.onPointHover(point, e.target) }
              onMouseLeave={ (e) => this.props.onPointHover(null, null) }
            />
          )
        })
      }
      </g>
    )
  }

  render() {
    const {
      className,
      noarea,
      noaxis,
      nodata,
      nogrid,
      nolabel,
      nopath,
      nopoint,
      onClick,
      viewBoxHeight,
      viewBoxWidth,
      yLabelsWidth,
      ...props,
    } = this.props

    return (
      <svg
        className={ classNames('linechart', (!nolabel || !nopoint) && 'linechart-withPadding', className) }
        viewBox={ `0 0 ${viewBoxWidth} ${viewBoxHeight}` }

      >
        <g transform={`translate(${!nolabel ? yLabelsWidth : 0}, 0)`}>
          { !nogrid ? this.getGrid() : null }
          { !noaxis ? this.getAxis() : null }
          { !nolabel ? this.getLabels() : null }
          { !nopath ? this.getPath() : null }
          { !noarea ? this.getArea() : null }
          { !nopoint ? this.getPoints() : null }
        </g>
      </svg>
    )
  }
}
