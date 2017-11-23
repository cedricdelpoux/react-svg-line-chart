import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Wrapper = styled.g`
  opacity: ${props => props.opacity};
  stroke-width: ${props => props.width};
  stroke: ${props => props.color};
`

const Grid = ({
  getX,
  getY,
  gridColor,
  gridOpacity,
  gridVisible,
  gridWidth,
  labelsCountY,
  maxX,
  maxY,
  minX,
  minY,
}) => {
  if (gridVisible) {
    let gridX = []
    let gridY = []

    for (let i = minX; i <= maxX; i++) {
      gridX.push(
        <line
          key={i}
          x1={getX(i)}
          y1={getY(minY)}
          x2={getX(i)}
          y2={getY(maxY)}
        />
      )
    }

    const yStep = labelsCountY > 0 ? labelsCountY : 1
    for (let i = minY; i <= maxY; i += Math.floor(maxY / yStep)) {
      gridY.push(
        <line
          key={i}
          x1={getX(minX)}
          y1={getY(i)}
          x2={getX(maxX)}
          y2={getY(i)}
        />
      )
    }

    return (
      <Wrapper color={gridColor} width={gridWidth} opacity={gridOpacity}>
        {gridX}
        {gridY}
      </Wrapper>
    )
  } else {
    return null
  }
}

Grid.propTypes = {
  getX: PropTypes.func,
  getY: PropTypes.func,
  gridColor: PropTypes.string,
  gridOpacity: PropTypes.number,
  gridVisible: PropTypes.bool,
  gridWidth: PropTypes.number,
  labelsCountY: PropTypes.number,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
  minX: PropTypes.number,
  minY: PropTypes.number,
}

Grid.defaultProps = {
  getX: x => x,
  getY: y => y,
  gridColor: "#34495e",
  gridOpacity: 0.2,
  gridVisible: true,
  gridWidth: 1,
  labelsCountY: 5,
}

export default Grid
