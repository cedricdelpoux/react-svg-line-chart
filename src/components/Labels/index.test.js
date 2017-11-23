import {mount} from "enzyme"
import React from "react"
import Labels from "./index"

const commonProps = {
  minX: 1,
  maxX: 5,
  minY: 0,
  maxY: 6,
}
const LabelsFixture = <Labels {...commonProps} />
const NoLabelsFixture = <Labels {...commonProps} labelsVisible={false} />
const LabelsWrongStepFixture = <Labels {...commonProps} labelsStepX={-1} />
const LabelsWrongCountFixture = <Labels {...commonProps} labelsCountY={-1} />

describe("Labels", () => {
  it("renders", () => {
    mount(LabelsFixture)
    mount(NoLabelsFixture)
    mount(LabelsWrongStepFixture)
    mount(LabelsWrongCountFixture)
  })
})
