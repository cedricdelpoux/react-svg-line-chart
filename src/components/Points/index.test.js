import {mount, shallow} from "enzyme"
import React from "react"
import Points from "./index"

const pointsOnHover = jest.fn()
const point1 = {x: 1, y: 2, active: true}
const commonProps = {
  data: [point1, {x: 2, y: 3}, {x: 3, y: 0}, {x: 4, y: 6}, {x: 5, y: 2}],
  minX: 1,
  maxX: 5,
  minY: 0,
  maxY: 6,
  pointsOnHover: pointsOnHover,
  pointsRadius: 4,
  pointFill: "#34495e",
}
const PointsFixture = <Points {...commonProps} />
const ZonesFixture = <Points {...commonProps} pointsIsHoverOnZone />
const NoPointsFixture = <Points {...commonProps} pointsVisible={false} />

describe("Points", () => {
  it("renders", () => {
    mount(PointsFixture)
    mount(ZonesFixture)
    mount(NoPointsFixture)
  })

  it("calls pointsOnHover when mouse enter on point", () => {
    const points = shallow(PointsFixture)
    points
      .find("Point")
      .first()
      .simulate("mouseEnter")

    expect(pointsOnHover).toHaveBeenCalled()
    expect(pointsOnHover).toHaveBeenCalledTimes(1)
    expect(pointsOnHover).toHaveBeenCalledWith(point1, undefined)
  })

  it("calls pointsOnHover when mouse leave point", () => {
    const points = shallow(PointsFixture)
    points
      .find("Point")
      .first()
      .simulate("mouseLeave")

    expect(pointsOnHover).toHaveBeenCalled()
    expect(pointsOnHover).toHaveBeenCalledTimes(2)
  })

  it("calls pointsOnHover when mouse enter on zone", () => {
    const points = shallow(ZonesFixture)
    points
      .find("Zone")
      .first()
      .simulate("mouseEnter")

    expect(pointsOnHover).toHaveBeenCalled()
    expect(pointsOnHover).toHaveBeenCalledTimes(3)
    expect(pointsOnHover).toHaveBeenCalledWith(point1, undefined)
  })

  it("calls pointsOnHover when mouse leave zone", () => {
    const points = shallow(ZonesFixture)
    points
      .find("Zone")
      .first()
      .simulate("mouseLeave")

    expect(pointsOnHover).toHaveBeenCalled()
    expect(pointsOnHover).toHaveBeenCalledTimes(4)
  })
})
