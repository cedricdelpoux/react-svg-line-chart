import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Label = styled.g`
  fill: ${props => props.color};
`

const Labels = ({
  getX,
  getY,
  labelsColor,
  labelsCountY,
  labelsFormatX,
  labelsFormatY,
  labelsHeightX,
  labelsOffsetX,
  labelsOffsetY,
  labelsStepX,
  labelsVisible,
  maxX,
  maxY,
  minX,
}) => {
  if (labelsVisible) {
    let xLabels
    let yLabels

    const xLabelsRange = []
    const xStep = labelsStepX > 0 ? labelsStepX : 1

    for (let i = Math.floor(minX); i <= Math.ceil(maxX); i += xStep) {
      xLabelsRange.push(i)
    }

    xLabels = xLabelsRange.map(x => (
      <Label key={x} color={labelsColor}>
        <circle r="2" cx={getX(x)} cy={getY(0)} />
        <text
          x={getX(x)}
          y={getY(0) + labelsHeightX}
          transform={`translate(0, ${labelsOffsetX})`}
          textAnchor="middle"
        >
          {labelsFormatX(x)}
        </text>
      </Label>
    ))

    const yLabelsRange = []
    const yStep = labelsCountY > 0 ? labelsCountY : 1

    for (let i = 0; i <= maxY; i += Math.floor(maxY / yStep)) {
      yLabelsRange.push(i)
    }

    yLabels = yLabelsRange.map(y => (
      <Label key={y} color={labelsColor}>
        <circle r="2" cx={getX(minX)} cy={getY(y)} />
        <text
          x={getX(minX)}
          y={getY(y) + labelsHeightX / 2}
          transform={`translate(-${labelsOffsetY}, 0)`}
          textAnchor="end"
        >
          {labelsFormatY(y)}
        </text>
      </Label>
    ))

    return (
      <g>
        {xLabels && <g>{xLabels}</g>}
        {yLabels && <g>{yLabels}</g>}
      </g>
    )
  } else {
    return null
  }
}

Labels.propTypes = {
  getX: PropTypes.func,
  getY: PropTypes.func,
  labelsColor: PropTypes.string,
  labelsCountY: PropTypes.number,
  labelsFormatX: PropTypes.func,
  labelsFormatY: PropTypes.func,
  labelsHeightX: PropTypes.number,
  labelsOffsetX: PropTypes.number,
  labelsOffsetY: PropTypes.number,
  labelsStepX: PropTypes.number,
  labelsVisible: PropTypes.bool,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
  minX: PropTypes.number,
  minY: PropTypes.number,
}

Labels.defaultProps = {
  getX: x => x,
  getY: y => y,
  labelsCharacterWidth: 10,
  labelsColor: "#bdc3c7",
  labelsCountY: 5,
  labelsFormatX: x => x,
  labelsFormatY: y => y,
  labelsHeightX: 12,
  labelsOffsetX: 15,
  labelsOffsetY: 15,
  labelsStepX: 2,
  labelsVisible: true,
}

export default Labels
