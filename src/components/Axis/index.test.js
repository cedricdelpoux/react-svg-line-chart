import {mount} from "enzyme"
import React from "react"
import Axis from "./index"

const AxisFixture = <Axis />
const NoAxisFixture = <Axis axisVisible={false} />

describe("Axis", () => {
  it("renders", () => {
    mount(AxisFixture)
    mount(NoAxisFixture)
  })
})
