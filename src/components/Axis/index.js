import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const SvgGroup = styled.g`
  stroke: ${props => props.color};
  stroke-width: ${props => props.width};
  opacity: ${props => props.opacity};
`

const Axis = ({
  axisColor,
  axisOpacity,
  axisVisible,
  axisWidth,
  getX,
  getY,
  maxX,
  maxY,
  minX,
  minY,
}) => {
  return axisVisible ? (
    <SvgGroup color={axisColor} width={axisWidth} opacity={axisOpacity}>
      <line x1={getX(minX)} y1={getY(minY)} x2={getX(maxX)} y2={getY(minY)} />
      <line x1={getX(minX)} y1={getY(minY)} x2={getX(minX)} y2={getY(maxY)} />
    </SvgGroup>
  ) : null
}

Axis.propTypes = {
  axisColor: PropTypes.string,
  axisOpacity: PropTypes.number,
  axisVisible: PropTypes.bool,
  axisWidth: PropTypes.number,
  getX: PropTypes.func,
  getY: PropTypes.func,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
  minX: PropTypes.number,
  minY: PropTypes.number,
}

Axis.defaultProps = {
  axisColor: "#34495e",
  axisOpacity: 0.3,
  axisVisible: true,
  axisWidth: 1,
  getX: x => x,
  getY: y => y,
}

export default Axis
