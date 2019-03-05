// Code from http://www.petercollingridge.co.uk/blog/evolving-images/

import React from 'react'
import getPixels from 'get-pixels'
import { range, clamp, flatten } from 'lodash'
import GPU from 'gpu.js'
import { Circle, Stage, Layer } from 'react-konva'

const IMAGE = '/100x100.jpg'

const random = () => Math.random() * 2 - 1

const randomChannel = () => Math.floor(Math.random() * 255)

class Instance {
  constructor(maxX, maxY, id) {
    this.maxX = maxX
    this.maxY = maxY
    this.y = Math.random() * maxY
    this.x = Math.random() * maxX
    this.r = randomChannel()
    this.g = randomChannel()
    this.b = randomChannel()
    this.a = randomChannel()
    this.radius = (Math.random() * Math.min(maxX, maxY)) / 6
    this.xExtent = [
      Math.floor(clamp(this.x - this.radius, 0, maxX)),
      Math.floor(clamp(this.x + this.radius, 0, maxX)),
    ]
    this.yExtent = [
      Math.floor(clamp(this.y - this.radius, 0, maxY)),
      Math.floor(clamp(this.y + this.radius, 0, maxY)),
    ]

    this.currentFitness = 0
  }

  get rgbaValue() {
    const { r, g, b, a } = this
    return [r, g, b, a]
  }

  get instanceData() {
    const { r, g, b, a, x, y, radius } = this
    return [r, g, b, a, x, y, radius]
  }

  set newChildren({ r, g, b, a, x, y, radius }) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    this.x = x
    this.y = y
    this.radius = radius
  }

  modify(childFitness, r, g, b, a, x, y, radius) {
    if (childFitness > this.currentFitness) {
      this.newChildren = { r, g, b, a, x, y, radius }
      this.currentFitness = childFitness
    }
  }
}

class GeneticAlgorithm {
  constructor(width, height, ndPixelArray, n = 10000) {
    this.width = width
    this.height = height
    this.ndPixelArray = ndPixelArray

    this.actuallyEveryPixel = getAllPixels(ndPixelArray)
    this.offSpring = range(n).map(idx => new Instance(width, height, idx))

    this.gpu = new GPU()
    this.mutate = this.gpu.createKernel(
      function(instanceArray, nInstanceTimesFeautureRandomNumbers, maxX, maxY, allPixels) {
        const thread = this.thread.x * 7
        const r = instanceArray[thread]
        const g = instanceArray[thread + 1]
        const b = instanceArray[thread + 2]
        const a = instanceArray[thread + 3]
        const x = instanceArray[thread + 4]
        const y = instanceArray[thread + 5]
        const radius = instanceArray[thread + 6]

        const random0 = nInstanceTimesFeautureRandomNumbers[thread]
        const random1 = nInstanceTimesFeautureRandomNumbers[thread + 1]
        const random2 = nInstanceTimesFeautureRandomNumbers[thread + 2]
        const random3 = nInstanceTimesFeautureRandomNumbers[thread + 3]
        const random4 = nInstanceTimesFeautureRandomNumbers[thread + 4]
        const random5 = nInstanceTimesFeautureRandomNumbers[thread + 5]
        const random6 = nInstanceTimesFeautureRandomNumbers[thread + 6]

        const newR = Math.floor(Math.max(Math.min(r + random0 * 255, 255), 0))
        const newG = Math.floor(Math.max(Math.min(g + random1 * 255, 255), 0))
        const newB = Math.floor(Math.max(Math.min(b + random2 * 255, 255), 0))
        const newA = Math.floor(Math.max(Math.min(a + random3 * 255, 255), 0))
        const newX = Math.floor(Math.max(Math.min(x + random4 * radius, maxX), 0))
        const newY = Math.floor(Math.max(Math.min(y + random5 * radius, maxY), 0))
        const newRadius = Math.floor(Math.max(Math.min(radius + random6 * radius, 5), 1))

        const extentX = [Math.floor(newX - newRadius), Math.floor(newX + radius)]
        const extentY = [Math.floor(newY - newRadius), Math.floor(newY + radius)]
        const baseX = extentX[0]
        const baseY = extentY[0]

        const deltaX = Math.abs(extentX[1] - extentX[0])
        const deltaY = Math.abs(extentY[1] - extentY[0])

        let sumSquare = 0
        const numberOfPixels = deltaX + deltaY

        for (let i = 0; i < numberOfPixels; i++) {
          const currentPixelIndex = (baseX + maxX * (baseY + Math.floor(i / deltaX)) + i) * 4
          const rCurrent = allPixels[currentPixelIndex]
          const gCurrent = allPixels[currentPixelIndex + 1]
          const bCurrent = allPixels[currentPixelIndex + 2]
          const aCurrent = allPixels[currentPixelIndex + 3]

          const squaredErrorR = (newR - rCurrent) * (newR - rCurrent)
          const squaredErrorG = (newG - gCurrent) * (newG - gCurrent)
          const squaredErrorB = (newB - bCurrent) * (newB - bCurrent)
          const squaredErrorA = (newA - aCurrent) * (newA - aCurrent)

          sumSquare = sumSquare + squaredErrorR + squaredErrorG + squaredErrorB + squaredErrorA
        }

        const fitness = Math.floor(sumSquare / numberOfPixels)
        const binaryEncoded = newR + newG * 256 + newB * 256 * 256 * newA * 256 * 256 * 256
        const location = newX + newY * maxX

        return 1

        // return [fitness, binaryEncoded, location, newRadius]
      },
      {
        output: [n],
      },
    )
  }

  get allData() {
    return this.offSpring.map(children => {
      const { r, g, b, a, radius, x, y } = children
      return { r, g, b, a, radius, x, y }
    })
  }

  newGeneration() {
    const instanceArray = this.offSpring.map(instance => instance.instanceData)
    const nInstanceTimesFeautureRandomNumbers = range(this.offSpring.length).map(random)
    const maxX = this.width
    const maxY = this.height
    const allPixels = flatten(this.actuallyEveryPixel)

    const allNewData = this.mutate(
      flatten(instanceArray),
      nInstanceTimesFeautureRandomNumbers,
      maxX,
      maxY,
      allPixels,
    )
    console.log({ allNewData })

    // this.offSpring.forEach((instance, index) => instance.modify(...allNewData[index]))
  }
}

function getAllPixels(pixels) {
  const [width, height, n] = pixels.shape

  const allPixelData = range(width * height).map(c => {
    const x = c % width
    const y = Math.floor(c / width)
    return range(n).map(channel => {
      const pixelDatum = pixels.get(x, y, channel)
      return pixelDatum
    })
  })

  return allPixelData
}

export class GeneticPicture extends React.Component {
  state = { pixels: [], genAlgo: null, frame: 0 }

  genId = 0

  updateGeneration = () => {
    const { genAlgo, frame } = this.state
    genAlgo.newGeneration()
    this.setState({ frame: frame + 1 })
  }

  handlePictureFetch = (err, pixels) => {
    if (err) {
      console.log('Could not fetch image')
      return
    }
    console.log('Fetched pixels')
    const genAlgo = new GeneticAlgorithm(pixels.shape[0], pixels.shape[1], pixels)

    this.genId = setInterval(this.updateGeneration, 16)
    this.setState({ pixels, genAlgo })
  }

  componentDidMount() {
    getPixels(IMAGE, this.handlePictureFetch)
  }

  componentWillUnmount() {
    clearInterval(this.genId)
  }

  render() {
    const { genAlgo, pixels } = this.state

    return (
      pixels &&
      genAlgo &&
      genAlgo.allData.length && (
        <>
          <Stage width={pixels.shape[0]} height={pixels.shape[1]}>
            <Layer>
              {genAlgo.allData.map((datum, idx) => {
                const { r, g, b, a, x, y, radius } = datum
                const color = `rgba(${r},${g},${b},${a})`
                return <Circle key={idx} x={x} y={y} radius={radius} fill={color} />
              })}
            </Layer>
          </Stage>
          <img src={IMAGE} />
        </>
      )
    )
  }
}
