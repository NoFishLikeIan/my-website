import React from 'react'
import { scaleLinear } from 'd3-scale'
import { range } from 'lodash'
import { Circle, Stage, Layer } from 'react-konva'

import { Vehicle } from './BoidsChase'
import { colors } from '../../lib/constants'

const WINDOW_F = 0.4
const RADIUS = 5
const MAX_FORCE = 1
const MAX_SPEED = 0.5

function createPolygon(n, radius, offSet = 50) {
  const polygon = range(n).map((_, i) => {
    const theta = (i / n) * 2 * Math.PI
    const x = radius * Math.cos(theta) + offSet
    const y = radius * Math.sin(theta) + offSet
    return [x, y]
  })
  return polygon
}

export class MiceWithBoids extends React.Component {
  state = {
    frame: 0,
    width: window.innerWidth * WINDOW_F,
    runner: null,
    seekers: [],
  }

  interval = 0
  stage = React.createRef()

  recomputeWindow = () => this.setState({ width: window.innerWidth * WINDOW_F })

  recomputeSeekers = () => {
    const { numberOfSeekers } = this.props

    const seekers = createPolygon(numberOfSeekers, 50).map(
      pos => new Vehicle([0, 0], pos, [0, 0], MAX_SPEED, MAX_FORCE),
    )
    this.setState({ seekers })
  }

  componentDidMount() {
    window.addEventListener('resize', this.recomputeWindow)
    this.interval = setInterval(this.updateFrame, 15)
    this.recomputeSeekers()
  }

  updateFrame = () => {
    const { seekers, frame } = this.state
    seekers.forEach((_, idx, allSeekers) => {
      const whoToSeek = idx === 0 ? allSeekers[allSeekers.length - 1] : allSeekers[idx - 1]

      allSeekers[idx].seek(whoToSeek.location)
    })

    seekers.forEach(s => s.update())

    this.setState({ frame: frame + 1 })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.recomputeWindow)

    clearInterval(this.interval)
  }

  render() {
    const { width: side, seekers } = this.state
    const scale = scaleLinear()
      .domain([0, 100])
      .range([RADIUS, side - RADIUS])

    const totalNumberOfSeekers = seekers.length
    const baseOpacity = 0.8 / totalNumberOfSeekers
    return (
      seekers.length !== 0 && (
        <Stage width={side} height={side} ref={this.stage} onClick={this.appendRandomSeeker}>
          <Layer>
            {seekers.map((s, i) => {
              const x = scale(s.location.x)
              const y = scale(s.location.y)
              const opacity = 0.2 + baseOpacity * i
              if (x && y) {
                return (
                  <Circle
                    key={i}
                    x={x}
                    y={y}
                    radius={RADIUS}
                    fill={colors.blue}
                    opacity={x && y ? opacity : 0}
                  />
                )
              }
            })}
          </Layer>
        </Stage>
      )
    )
  }
}
