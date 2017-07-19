# react-svg-line-chart ![npm](https://img.shields.io/npm/v/react-svg-line-chart.svg) ![license](https://img.shields.io/npm/l/react-svg-line-chart.svg) ![github-issues](https://img.shields.io/github/issues/xuopled/react-svg-line-chart.svg)

A lightweight responsive line chart component for React using only SVG

## Install

```sh
npm install --save react-svg-line-chart
```

[![react-svg-line-chart](https://nodei.co/npm/react-svg-line-chart.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-svg-line-chart/)

## Changelog

See [changelog](./CHANGELOG.md)

## Demo

http://xuopled.github.io/react-svg-line-chart/

## Usage

### Exemple

![LineChart exemple](/screenshots/line-chart.png)

```js
import React, { Component } from 'react'
import LineChart from 'react-svg-line-chart'
import Tooltip from 'react-simple-tooltip'

export default class MyComponent extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      activePoint: null,
      tooltipTrigger: null,
    }
  }

  handlePointHover(point, trigger) {
    this.setState({
      activePoint: point,
      tooltipTrigger: trigger,
    })
  }

  render() {
    const data = []

    for (let x = 1; x <= 30; x++) {
      data.push({ x: x, y: Math.floor(Math.random() * (100)) })
    }

    return (
      <div>
        // Tooltip
        { this.state.tooltipTrigger
          ? (
            <Tooltip placement="top" trigger={ this.state.tooltipTrigger }>
              <div>y : { this.state.activePoint.y }</div>
              <div>x : { this.state.activePoint.x }</div>
            </Tooltip>
          )
          : null
        }

        // LineChart component
        <LineChart
          activePoint={ this.state.activePoint }
          data={ data }
          onPointHover={ ::this.handlePointHover }
          nogrid
        />
      </div>
    )
  }
}
```

### Props

  * `activePoint`: Object of { Number, Number } - by default is { x: null, y: null }
  * `data`: Array of [ Object of { Number, Number } ] - by default is [] - is required
  * `formatX`: Function - by default is null. To format x axis labels,
  * `formatY`: Function - by default is null. To format y axis labels,
  * `hoveredPointRadius`: Number - by default is 6,
  * `noarea`: Boolean - by default is false. To hide area,
  * `noaxis`: Boolean - by default is false. To hide axis,
  * `noXaxis`: Boolean - by default is false. To hide X axis,
  * `noYaxis`: Boolean - by default is false. To hide Y axis,
  * `noXaxisPoints`: Boolean - by default is false. To hide points on X axis,
  * `noYaxisPoints`: Boolean - by default is false. To hide points on Y axis,
  * `nogrid`: Boolean - by default is false. To hide grid,
  * `noGridXLines`: Boolean - by default is false. To hide grid X lines,
  * `noGridYLines`: Boolean - by default is false. To hide grid Y lines,
  * `nolabel`: Boolean - by default is false. To hide labels,
  * `noXlabel`: Boolean - by default is false. To hide X axis label,
  * `noYlabel`: Boolean - by default is false. To hide Y axis label,
  * `nopath`: Boolean - by default is false. To hide path,
  * `nopoint`: Boolean - by default is false. To hide points,
  * `onMouseEnter`: Function - by default is null,
  * `onMouseLeave`: Function - by default is null,
  * `onPointHover`: Function - by default is null,
  * `pointRadius`: Number - by default is 4,
  * `viewBoxHeight`: Number - by default is 300,
  * `viewBoxWidth`: Number - by default is 800,
  * `yLabelsNb`: Number - by default is 5,
  * `yLabelsWidth`: Number - by default is 40,

### Classes

 * `.linechart`
 * `.linechart-withPadding` - if `nolabel` or `nopoint` is false
 * `.linechart_grid` - if `nogrid` is false
 * `.linechart_axis` - if `nogaxis` is false
 * `.linechart_area` - if `noarea` is false
 * `.linechart_path` - if `nopath` is false
 * `.linechart_points` - if `nopoint` is false
 * `.linechart_point` - if `nopoint` is false
 * `.linechart_labels` - if `nolabel` is false
 * `.linechart_xLabels` - if `nolabel` is false
 * `.linechart_yLabels` - if `nolabel` is false
 * `.linechart_label` - if `nolabel` is false

## Development

### Clean `lib` folder

```js
npm run clean
```

### Launch demo

```js
npm run demo
```

### Build `lib` folder

```js
npm run build
```

### Watch `src` folder

```js
npm run watch
```

### Lint `src` folder

```js
npm run build
```

## License

See [MIT](./LICENCE)
