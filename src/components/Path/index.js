import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const SvgArea = styled.path`
  fill: ${props => props.color};
  opacity: ${props => props.opacity};
  stroke: none;
`

const SvgPath = styled.path`
  fill: none;
  opacity: ${props => props.opacity};
  stroke-width: ${props => props.width};
  stroke: ${props => props.color};
`

class Path extends React.Component {
  getBasisPoint(i) {
    const {data, pathSmoothing} = this.props
    const totalData = data.length - 1
    const iPoint = i < 0 ? 0 : i > totalData ? totalData : i
    const point = data[iPoint]
    const ratio = 1 - pathSmoothing
    const tangent = iPoint / totalData
    const firstPoint = data[0]
    const distance = {
      x: data[totalData].x - firstPoint.x,
      y: data[totalData].y - firstPoint.y,
    }
    return {
      x: ratio * point.x + (1 - ratio) * (firstPoint.x + tangent * distance.x),
      y: ratio * point.y + (1 - ratio) * (firstPoint.y + tangent * distance.y),
    }
  }

  getCurvePath(i) {
    const {getX, getY} = this.props
    const pCurrent = this.getBasisPoint(i)
    const pMinus1 = this.getBasisPoint(i - 1)
    const pMinus2 = this.getBasisPoint(i - 2)

    const x1 = (2 * pMinus2.x + pMinus1.x) / 3
    const y1 = (2 * pMinus2.y + pMinus1.y) / 3
    const x2 = (pMinus2.x + 2 * pMinus1.x) / 3
    const y2 = (pMinus2.y + 2 * pMinus1.y) / 3
    const x3 = (pMinus2.x + 4 * pMinus1.x + pCurrent.x) / 6
    const y3 = (pMinus2.y + 4 * pMinus1.y + pCurrent.y) / 6

    return `C
      ${getX(x1)}
      ${getY(y1)}
      ${getX(x2)}
      ${getY(y2)}
      ${getX(x3)}
      ${getY(y3)}
    `
  }

  getLinePath(point) {
    const {getX, getY} = this.props
    return `L ${getX(point.x)} ${getY(point.y)}`
  }

  getPath() {
    const {data, getX, getY, pathSmoothing} = this.props
    const isSmooth =
      pathSmoothing !== null &&
      pathSmoothing >= 0 &&
      pathSmoothing <= 1 &&
      data.length > 1
    let d = data.reduce((acc, point, i) => {
      const partialPath = isSmooth
        ? this.getCurvePath(i)
        : this.getLinePath(point)
      return i === 0
        ? `M ${getX(point.x)} ${getY(point.y)} `
        : `${acc} ${partialPath} `
    }, ``)

    if (isSmooth) {
      d += this.getCurvePath(data.length)
      d += `L ${getX(data[data.length - 1].x)} ${getY(
        data[data.length - 1].y
      )} `
    }

    return d
  }

  getAreaPath() {
    const {data, getX, getY} = this.props
    return `
      ${this.getPath()}
      L ${getX(data[data.length - 1].x)} ${getY(0)}
      L ${getX(data[0].x)} ${getY(0)}
    `
  }

  render() {
    const {
      areaColor,
      areaOpacity,
      areaVisible,
      pathColor,
      pathOpacity,
      pathVisible,
      pathWidth,
    } = this.props
    return pathVisible || areaVisible ? (
      <g>
        {pathVisible && (
          <SvgPath
            d={this.getPath()}
            opacity={pathOpacity}
            color={pathColor}
            width={pathWidth}
          />
        )}
        {areaVisible && (
          <SvgArea
            d={this.getAreaPath()}
            color={areaColor}
            opacity={areaOpacity}
          />
        )}
      </g>
    ) : null
  }
}

Path.propTypes = {
  areaColor: PropTypes.string,
  areaOpacity: PropTypes.number,
  areaVisible: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ).isRequired,
  getX: PropTypes.func,
  getY: PropTypes.func,
  pathColor: PropTypes.string,
  pathOpacity: PropTypes.number,
  pathSmoothing: PropTypes.number,
  pathVisible: PropTypes.bool,
  pathWidth: PropTypes.number,
}

Path.defaultProps = {
  areaColor: "#34495e",
  areaOpacity: 0.5,
  areaVisible: false,
  getX: x => x,
  getY: y => y,
  pathColor: "#34495e",
  pathOpacity: 1,
  pathSmoothing: null,
  pathVisible: true,
  pathWidth: 2,
}

export default Path
