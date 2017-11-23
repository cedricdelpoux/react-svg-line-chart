import {mount} from "enzyme"
import React from "react"
import Grid from "./index"

const commonProps = {
  minX: 1,
  maxX: 5,
  minY: 0,
  maxY: 6,
}
const GridFixture = <Grid {...commonProps} />
const NoGridFixture = <Grid {...commonProps} gridVisible={false} />
const GridWrongCountFixture = <Grid {...commonProps} labelsCountY={-1} />

describe("Grid", () => {
  it("renders", () => {
    mount(GridFixture)
    mount(NoGridFixture)
    mount(GridWrongCountFixture)
  })
})
