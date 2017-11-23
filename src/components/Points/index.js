import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Point = styled.circle`
  fill: ${props => props.color};
  stroke-width: ${props => props.strokeWidth};
  stroke: ${props => props.stroke};
`

Point.displayName = "Point"

const Zone = styled.rect`
  fill: transparent;
`

Zone.displayName = "Zone"

const Points = ({
  data,
  getX,
  getY,
  maxY,
  minX,
  minY,
  pointsColor,
  pointsIsHoverOnZone,
  pointsOnHover,
  pointsRadius,
  pointsStrokeColor,
  pointsStrokeWidth,
  pointsVisible,
}) => {
  return pointsVisible ? (
    <g>
      {data.map((point, i) => {
        return (
          <Point
            key={i}
            r={point.active ? pointsRadius * 1.2 : pointsRadius}
            cx={getX(point.x)}
            cy={getY(point.y)}
            onMouseEnter={e => pointsOnHover(point, e)}
            onMouseLeave={() => pointsOnHover(null, null)}
            color={pointsColor}
            stroke={pointsStrokeColor}
            strokeWidth={pointsStrokeWidth}
          />
        )
      })}
      {pointsIsHoverOnZone &&
        data.map((point, i) => {
          return (
            <Zone
              key={i}
              x={getX(point.x > minX ? (data[i].x + data[i - 1].x) / 2 : minX)}
              y={getY(maxY)}
              width={getX(1)}
              height={getY(minY)}
              onMouseEnter={e => pointsOnHover(point, e)}
              onMouseLeave={() => pointsOnHover(null, null)}
            >
              <title>
                x: {point.x} y: {point.y}
              </title>
            </Zone>
          )
        })}
    </g>
  ) : null
}

Points.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ).isRequired,
  getX: PropTypes.func,
  getY: PropTypes.func,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
  minX: PropTypes.number,
  minY: PropTypes.number,
  pointsColor: PropTypes.string,
  pointsIsHoverOnZone: PropTypes.bool,
  pointsOnHover: PropTypes.func,
  pointsRadius: PropTypes.number,
  pointsStrokeColor: PropTypes.string,
  pointsStrokeWidth: PropTypes.number,
  pointsVisible: PropTypes.bool,
}

Points.defaultProps = {
  getX: x => x,
  getY: y => y,
  pointsColor: "#fff",
  pointsIsHoverOnZone: false,
  pointsOnHover: () => {},
  pointsRadius: 4,
  pointsStrokeColor: "#34495e",
  pointsStrokeWidth: 2,
  pointsVisible: true,
}

export default Points
