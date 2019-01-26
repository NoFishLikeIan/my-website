import React from 'react'
import { scaleLinear } from 'd3-scale'
import { Circle, Stage, Layer } from 'react-konva'

const WINDOW_F = 0.4
const RADIUS = 5
const ONE_TURN_IN_FRAMES = 12
const DELTA_THETA = Math.PI / ONE_TURN_IN_FRAMES
const INIT_A = 1e-1
const INIT_B = 1e-1
function computePosition(theta, a, b, prevDistance) {
  // distance equivalent to "r"
  const addX = prevDistance * Math.cos(theta)
  const addY = prevDistance * Math.sin(theta)
  return {
    x: a * Math.cos(theta) * Math.pow(Math.E, b * theta) + addX,
    y: a * Math.sin(theta) * Math.pow(Math.E, b * theta) + addY,
  }
}

export class MiceProblem extends React.Component {
  frame = 0

  recomputeWindow = () => this.setState({ width: window.innerWidth * WINDOW_F })

  state = {
    width: window.innerWidth * WINDOW_F,
    a: INIT_A,
    b: INIT_B,
    angle: 0,
    indexFrame: 0,
    distance: 0,
  }

  passed = false

  updateFrame = () => {
    const { a, b, angle, initX, initY, indexFrame, distance } = this.state
    const newAngle = DELTA_THETA + angle
    const completeTurns = Math.floor(indexFrame / ONE_TURN_IN_FRAMES)
    const isNewTurn = indexFrame % ONE_TURN_IN_FRAMES === 0
    const { x, y } = computePosition(newAngle, a, b, 0)
    const newDistance = isNewTurn
      ? completeTurns * Math.sqrt(Math.pow(initX - x, 2) + Math.pow(initY - y, 2))
      : distance

    this.setState({
      x,
      y,
      angle: newAngle,
      indexFrame: indexFrame + 1,
      distance: newDistance,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.recomputeWindow)
    const { a, b, angle } = this.state
    const { x, y } = computePosition(angle, a, b, 0)

    this.frame = setInterval(this.updateFrame, 16)

    this.setState({ x, y, initX: x, initY: y })
  }

  componendWillUnmount() {
    clearInterval(this.frame)
  }

  render() {
    const { x, y, width: side } = this.state
    const scale = scaleLinear()
      .domain([-10, +10])
      .range([RADIUS, side - RADIUS])

    return (
      <Stage width={side} height={side}>
        <Layer>
          <Circle x={scale(x)} y={scale(y)} radius={RADIUS} fill={'red'} opacity={0.8} />
        </Layer>
      </Stage>
    )
  }
}
