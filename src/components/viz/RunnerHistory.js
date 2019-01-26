import React from 'react'
import { Circle } from 'react-konva'
import { colors, RADIUS } from '../../lib/constants'

const opacityFactory = (totalLen, opacityRange = [0.2, 0.5]) => index => {
  const [max, min] = opacityRange
  return max - (index / totalLen) * (max - min)
}

export class RunnerHistory extends React.Component {
  render() {
    const { runnerHistory } = this.props
    const computeOpacity = opacityFactory(runnerHistory.length)

    return runnerHistory.map(([x, y], index) => (
      <Circle
        key={index}
        x={x}
        y={y}
        radius={RADIUS}
        fill={colors.red}
        opacity={computeOpacity(index)}
      />
    ))
  }
}
