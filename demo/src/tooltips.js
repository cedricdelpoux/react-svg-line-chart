import PropTypes from "prop-types"
import React, {Component} from "react"
import Tooltip from "react-simple-tooltip"

import ReactSvgLineChart from "../../src"

class WithTooltips extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      tooltipTrigger: null,
      point: null,
    }
  }

  handlePointHover = (point, e) => {
    if (e) {
      this.setState({
        tooltipTrigger: e.target.getBoundingClientRect(),
        point: point,
      })
    } else {
      this.setState({
        tooltipTrigger: null,
        point: null,
      })
    }
  }

  render() {
    const {tooltipTrigger, point} = this.state
    const {data} = this.props
    return (
      <div
        style={{
          position: "relative",
        }}
      >
        {tooltipTrigger ? (
          <Tooltip
            fixed
            placement="top"
            style={{
              position: "fixed",
              top: tooltipTrigger.top + "px",
              left:
                tooltipTrigger.left +
                (tooltipTrigger.right - tooltipTrigger.left) / 2 +
                "px",
            }}
            content={point && `x:${point.x},y:${point.y}`}
          />
        ) : null}

        <ReactSvgLineChart
          data={data}
          pointsStrokeColor="#44B39D"
          pathColor="#44B39D"
          areaColor="#44B39D"
          areaVisible
          gridVisible
          axisVisible
          labelsVisible
          pathVisible
          pointsVisible
          pointsOnHover={this.handlePointHover}
        />
      </div>
    )
  }
}

WithTooltips.propTypes = {
  data: PropTypes.array,
}

export default WithTooltips
