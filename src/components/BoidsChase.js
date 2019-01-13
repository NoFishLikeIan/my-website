import React from 'react'
import { scaleLinear } from 'd3-scale'
import { range, mean } from 'lodash'
import { Circle, Stage, Layer } from 'react-konva'

import { calculateMagnitude, vectorSubtract } from '../lib/boidsUtils'

const WINDOW_F = 0.4
const RADIUS = 5
const MAX_SPEED = 0.001
const MAX_FORCE = 0.01

export class PVector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  get innerMagnitude() {
    return calculateMagnitude(this)
  }

  normalize() {
    this.x = this.x / this.innerMagnitude
    this.y = this.y / this.innerMagnitude
  }

  multiply(factor) {
    this.x = this.x * factor
    this.y = this.y * factor
  }

  innerSub(target) {
    this.x -= target.x
    this.y -= target.y
  }

  innerAdd(target, xLim = [], yLim = []) {
    if (xLim.length && yLim) {
      const expectedX = target.x + this.x
      const expectedY = target.y + this.y

      this.x =
        expectedX > xLim[1]
          ? expectedX % xLim[1]
          : (xLim[1] / expectedX) * expectedX + (xLim[1] % expectedX)
      this.y =
        expectedY > yLim[1]
          ? expectedY % yLim[1]
          : (yLim[1] / expectedY) * expectedY + (yLim[1] % expectedY)
    } else {
      this.x += target.x
      this.y += target.y
    }
  }

  limit(maxLimit) {
    if (this.innerMagnitude > maxLimit) {
      const factor = maxLimit / this.innerMagnitude
      this.multiply(factor)
    }
  }
}

class Vehicle {
  constructor(velocity, location, acceleration, maxSpeed, maxForce) {
    this.velocity = new PVector(...velocity)
    this.location = new PVector(...location)
    this.acceleration = new PVector(...acceleration)
    this.maxSpeed = maxSpeed
    this.maxForce = maxForce
  }

  update() {
    this.location.innerAdd(this.velocity)
    this.velocity.innerAdd(this.acceleration)
    this.acceleration.multiply(0)
  }

  applyForce(force) {
    this.acceleration.innerAdd(force)
  }

  seek(target) {
    const desired = vectorSubtract(target, this.location)
    desired.normalize()
    desired.multiply(this.maxSpeed)
    const steer = vectorSubtract(desired, this.velocity)
    steer.limit(this.maxForce)

    this.applyForce(steer)
  }

  runFrom(target) {
    const desired = vectorSubtract(this.location, target)
    desired.normalize()
    desired.multiply(this.maxSpeed)
    const steer = vectorSubtract(desired, this.velocity)
    steer.limit(this.maxForce)

    this.applyForce(steer)
  }
}

export class BoidsChase extends React.Component {
  state = {
    frame: 0,
    width: window.innerWidth * WINDOW_F,
    runner: null,
    seekers: [],
    mousePosition: [0.5, 0.5],
  }

  stage = React.createRef()

  recomputeWindow = () => this.setState({ width: window.innerWidth * WINDOW_F })

  componentDidMount() {
    window.addEventListener('resize', this.recomputeWindow)
    const runner = new Vehicle([0, 0], [0.5, 0.5], [0, 0], MAX_SPEED, MAX_FORCE)
    const seekers = range(3).map(
      _ => new Vehicle([0, 0], [Math.random(), Math.random()], [0, 0], MAX_SPEED, MAX_FORCE),
    )

    this.setState({ runner, seekers })
    const frame = setInterval(this.updateFrame, 150)
    this.setState({ runner, seekers, frame })
  }

  updateFrame = () => {
    const { runner, seekers, frame } = this.state
    seekers.map(s => {
      s.seek(runner.location)
      s.update()
    })

    const xS = seekers.map(s => s.location.x)
    const yS = seekers.map(s => s.location.y)

    const meanX = mean(xS)
    const meanY = mean(yS)
    runner.runFrom(new PVector(meanX, meanY))
    runner.update()
    setInterval(this.updateFrame, 60)
    this.setState({ frame: frame + 1 })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.recomputeWindow)
    this.updateFrame()
  }

  render() {
    const { width: side, runner, seekers } = this.state
    const scale = scaleLinear()
      .domain([0, 1])
      .range([0, side])

    return (
      runner &&
      seekers.length && (
        <Stage width={side} height={side} className="ma4 ba b--gray" ref={this.stage}>
          <Layer>
            <Circle
              x={scale(runner.location.x)}
              y={scale(runner.location.y)}
              radius={RADIUS}
              fill={'red'}
              opacity={0.8}
            />
            {seekers.map((s, i) => (
              <Circle
                key={i}
                x={scale(s.location.x)}
                y={scale(s.location.y)}
                radius={RADIUS}
                fill={'blue'}
                opacity={0.8}
              />
            ))}
          </Layer>
        </Stage>
      )
    )
  }
}
