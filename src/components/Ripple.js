import React from 'react'
import { Circle } from 'react-konva'

import { colors } from '../lib/constants'

const RIPPLE_ITERATIONS = 100
const RADIUS_RANGE = [5, 50]
export class Ripple extends React.Component {
  intervalId = 0
  frame = 0

  state = {
    opacity: null,
    radius: null,
  }

  computeData = () => {
    if (this.frame === RIPPLE_ITERATIONS) {
      const { fatherContext } = this.props
      clearInterval(this.intervalId)
      fatherContext.deactivateFirstRender()
    }
    const opacity = 1 - this.frame / RIPPLE_ITERATIONS
    const radius = (RADIUS_RANGE[1] - RADIUS_RANGE[0]) * (1 - opacity) + RADIUS_RANGE[0]
    this.frame = this.frame + 1
    this.setState({ opacity, radius })
  }

  componentDidMount() {
    const { x, y } = this.props
    this.intervalId = setInterval(this.computeData, 16)
    this.setState({ x, y })
  }

  render() {
    const { x, y, radius, opacity } = this.state
    return (
      <Circle
        x={x}
        y={y}
        fill={'transparent'}
        radius={radius}
        opacity={opacity}
        stroke={colors.lightBlue}
      />
    )
  }
}
