import {mount} from "enzyme"
import React from "react"
import Path from "./index"

const commonProps = {
  data: [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 0}, {x: 4, y: 6}, {x: 5, y: 2}],
  minX: 1,
  maxX: 5,
  minY: 0,
  maxY: 6,
}
const PathFixture = <Path {...commonProps} />
const PathSmoothFixture = <Path {...commonProps} pathSmoothing={0.5} />
const AreaFixture = <Path {...commonProps} areaVisible />
const NoPathNoAreaFixture = (
  <Path {...commonProps} pathVisible={false} areaVisible={false} />
)

describe("Path", () => {
  it("renders", () => {
    mount(PathFixture)
    mount(PathSmoothFixture)
    mount(AreaFixture)
    mount(NoPathNoAreaFixture)
  })
})
