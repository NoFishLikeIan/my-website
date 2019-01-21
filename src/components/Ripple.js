import React from 'react'
import { Circle } from 'react-konva'

const RIPPLE_ITERATIONS = 120
const RADIUS_RANGE = [5, 10]

export class Ripple extends React.Component {
  intervalId = 0
  frame = 0

  state = {
    opacity: null,
    radius: null,
  }

  computeData = () => {
    if (this.frame === 6) {
      clearInterval(this.intervalId)
    }
    const opacity = this.frame / RIPPLE_ITERATIONS
    const radius = (RADIUS_RANGE[1] - RADIUS_RANGE[0]) * opacity + RADIUS_RANGE[0]
    this.frame = this.frame + 1
    this.setState({ opacity, radius })
  }

  componentDidMount() {
    this.intervalId = setInterval(this.computeData, 16)
  }

  render() {
    const { x, y } = this.props
    const { radius, opacity } = this.state
    return <Circle x={x} y={y} fill={'transparent'} radius={radius} opacity={opacity} stroke={2} />
  }
}
