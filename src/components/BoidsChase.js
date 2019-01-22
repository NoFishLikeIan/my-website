import React from 'react'
import { scaleLinear } from 'd3-scale'
import { range, mean, sortBy, clamp } from 'lodash'
import { Circle, Stage, Layer } from 'react-konva'

import { Ripple } from './Ripple'
import { RunnerHistory } from './RunnerHistory'
import { calculateMagnitude, vectorSubtract } from '../lib/boidsUtils'
import { colors, RADIUS } from '../lib/constants'

const WINDOW_F = 0.4
const MAX_FORCE = 2
const MAX_SPEED = 1
const ARREST_DISTANCE = 0.05
const IM_WALL = 5
const RUNNER_HISTORY_MAX = 40

const pctOfSpped = (l = 0.1, u = 0.2) => Math.random() * (u - l + 1) + l
const indexOfMaxValue = a => a.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0)

function distanceBetweenTwoAngles(alpha, beta) {
  const phi = Math.abs(beta - alpha) % (Math.PI * 2)
  const distance = phi > Math.PI ? Math.PI - phi : phi
  return distance
}

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

  innerAdd(target) {
    this.x += target.x
    this.y += target.y
  }

  limit(maxLimit) {
    if (this.innerMagnitude > maxLimit) {
      const factor = maxLimit / this.innerMagnitude
      this.multiply(factor)
    }
  }
}

function randomPointFromAngle(angle) {
  const x = clamp(Math.cos(angle) * Math.random() * 100, 10, 90)
  const y = clamp(Math.sin(angle) * Math.random() * 100, 10, 90)
  return new PVector(x, y)
}

export class Vehicle {
  constructor(velocity, location, acceleration, maxSpeed, maxForce) {
    this.velocity = new PVector(...velocity)
    this.location = new PVector(...location)
    this.acceleration = new PVector(...acceleration)
    this.maxSpeed = maxSpeed
    this.maxForce = maxForce

    this.initTarget = new PVector(Math.random() * 100, Math.random() * 100)

    this.firstRender = true
  }

  deactivateFirstRender() {
    this.firstRender = false
  }

  update() {
    this.location.innerAdd(this.velocity)

    if (this.location.x < 0) {
      this.location.x = 100 + this.location.x
    } else if (this.location.x > 100) {
      this.location.x = this.location.x - 100
    }

    if (this.location.y < 0) {
      this.location.y = 100 + this.location.y
    } else if (this.location.y > 100) {
      this.location.y = this.location.y - 100
    }

    this.velocity.innerAdd(this.acceleration)
    this.acceleration.multiply(0)
  }

  applyForce(force) {
    this.acceleration.innerAdd(force)
  }

  runFrom(target) {
    let desired = vectorSubtract(this.location, target)

    const d = calculateMagnitude(desired)
    desired.normalize()

    if (d < ARREST_DISTANCE) {
      const m = d * this.maxSpeed
      desired.multiply(m)
    } else {
      desired.multiply(this.maxSpeed)
    }

    const steer = vectorSubtract(desired, this.velocity)
    steer.limit(this.maxForce)
    this.applyForce(steer)
  }

  seek(target) {
    let desired = vectorSubtract(target, this.location)

    const d = calculateMagnitude(desired)
    desired.normalize()

    if (d < ARREST_DISTANCE) {
      const m = d * this.maxSpeed
      desired.multiply(m)
    } else {
      desired.multiply(this.maxSpeed)
    }

    const steer = vectorSubtract(desired, this.velocity)
    steer.limit(this.maxForce)

    this.applyForce(steer)
  }

  boundaries() {
    let desired
    if (this.location.x < IM_WALL) {
      desired = new PVector(this.maxSpeed, this.velocity.y)
    } else if (this.location.x > 100 - IM_WALL) {
      desired = new PVector(-this.maxspeed, this.velocity.y)
    }
    if (this.location.y < IM_WALL) {
      desired = new PVector(this.velocity.x, this.maxSpeed)
    } else if (this.location.y > 100 - IM_WALL) {
      desired = new PVector(this.velocity.x, -this.maxSpeed)
    }

    if (desired != null) {
      desired.normalize()
      desired.multiply(this.maxSpeed)
      const steer = vectorSubtract(desired, this.velocity)
      steer.limit(this.maxForce)
      this.applyForce(steer)
    }
  }

  randomSeek(seekers) {
    const closeEnough =
      Math.sqrt(
        Math.pow(this.location.x - this.initTarget.x, 2),
        Math.pow(this.location.y - this.initTarget.y, 2),
      ) < 2

    if (closeEnough) {
      const angles = sortBy(angleBetween(seekers, this))

      const deltaAngles = angles.map((_, i, ang) => {
        const dist =
          i === 0
            ? distanceBetweenTwoAngles(ang[i], ang[ang.length]) || 0
            : distanceBetweenTwoAngles(ang[i], ang[i - 1])
        return dist
      })

      const maxIndex = indexOfMaxValue(deltaAngles)

      const widerAngle =
        maxIndex !== 0
          ? mean([angles[maxIndex - 1], angles[maxIndex]])
          : mean([Math.PI - angles[angles.length], angles[maxIndex]])

      const noise = ((Math.random() * 2 - 1) * Math.PI) / 24
      const noiseyWiderAngle = widerAngle + noise
      const target = randomPointFromAngle(noiseyWiderAngle)

      this.initTarget = target
      this.seek(this.initTarget)
    } else {
      this.seek(this.initTarget)
    }
  }

  randomMovement() {
    const desired = new PVector(Math.random() * 100, Math.random() * 100)
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
    mousePosition: [50, 50],
    interval: 0,
    runnerHistory: [],
  }

  interval = 0
  stage = React.createRef()

  recomputeWindow = () => this.setState({ width: window.innerWidth * WINDOW_F })

  randomSeeker = () => {
    return new Vehicle(
      [0, 0],
      [Math.random() * 100, Math.random() * 100],
      [0, 0],
      MAX_SPEED * pctOfSpped(0.05, 0.1),
      MAX_FORCE * pctOfSpped(0.05, 0.1),
    )
  }

  appendRandomSeeker = () => {
    const { seekers } = this.state
    const newSeeker = this.randomSeeker()
    const newSeekers = seekers.slice()
    newSeekers.push(newSeeker)
    this.setState({ seekers: newSeekers })
  }

  componentDidMount() {
    window.addEventListener('resize', this.recomputeWindow)
    const runner = new Vehicle([0, 0], [50, 50], [0, 0], MAX_SPEED, MAX_FORCE)
    const seekers = range(10).map(
      _ =>
        new Vehicle(
          [0, 0],
          [Math.random() * 100, Math.random() * 100],
          [0, 0],
          MAX_SPEED * pctOfSpped(0.05, 0.06),
          MAX_FORCE * pctOfSpped(0.05, 0.06),
        ),
    )

    this.setState({ runner, seekers })
    const frame = setInterval(this.updateFrame, 15)
    this.setState({ runner, seekers, frame })
  }

  updateFrame = () => {
    const { runner, seekers, frame, runnerHistory } = this.state
    seekers.forEach(s => {
      s.seek(runner.location)
      s.update()
    })

    runner.randomSeek(seekers)
    runner.update()
    const newPoints = [runner.location.x, runner.location.y]
    const currentHistoryLen = runnerHistory.length
    const newHistory =
      currentHistoryLen > RUNNER_HISTORY_MAX
        ? runnerHistory.slice()
        : runnerHistory.slice(currentHistoryLen - RUNNER_HISTORY_MAX + 1, currentHistoryLen)

    newHistory.push(newPoints)
    this.setState({ frame: frame + 1, runnerHistory: newHistory })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.recomputeWindow)
    this.updateFrame()
    clearInterval(this.interval)
  }

  render() {
    const { width: side, runner, seekers, runnerHistory } = this.state
    const scale = scaleLinear()
      .domain([0, 100])
      .range([0, side])

    const runnerHistoryScaled = runnerHistory.map(coords => coords.map(scale))

    return (
      runner &&
      seekers.length && (
        <Stage
          width={side}
          height={side}
          ref={this.stage}
          onClick={this.appendRandomSeeker}
          className="pointer"
        >
          <Layer>
            <Circle
              x={scale(runner.location.x) || 0}
              y={scale(runner.location.y) || 0}
              radius={RADIUS}
              fill={colors.red}
              opacity={0.8}
            />
            <RunnerHistory runnerHistory={runnerHistoryScaled} />
            {seekers.map((s, i) => {
              const x = scale(s.location.x)
              const y = scale(s.location.y)
              if (x && y) {
                return (
                  <>
                    <Circle
                      x={x}
                      y={y}
                      radius={RADIUS}
                      fill={colors.blue}
                      opacity={x && y ? 0.8 : 0}
                      key={`${i}_circle`}
                    />
                    {s.firstRender && <Ripple x={x} y={y} fatherContext={s} key={`${i}_ripple`} />}
                  </>
                )
              }
            })}
          </Layer>
        </Stage>
      )
    )
  }
}

function angleBetween(seekers, target) {
  return seekers
    .map(s => {
      const deltaX = s.location.x - target.location.x
      const deltaY = s.location.y - target.location.y
      const angle = Math.atan2(deltaY, deltaX)
      return angle < 0 ? Math.PI * 2 + angle : angle
    })
    .filter(angles => !Number.isNaN(angles))
}
