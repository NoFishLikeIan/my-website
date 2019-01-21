// Code from http://www.petercollingridge.co.uk/blog/evolving-images/

import React from 'react'
import getPixels from 'get-pixels'
import { range, clamp } from 'lodash'
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
        return [0.0, 0.0, 0.0]
      },
      {
        output: [n],
        paramTypes: {
          instanceArray: 'Array(2)',
          nInstanceTimesFeautureRandomNumbers: 'Array',
          maxX: 'Number',
          maxY: 'Number',
          allPixels: 'Array(2)',
        },
        returnType: 'Array',
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
    const allPixels = this.actuallyEveryPixel

    const allNewData = this.mutate(
      instanceArray,
      nInstanceTimesFeautureRandomNumbers,
      maxX,
      maxY,
      allPixels,
    )

    this.offSpring.forEach((instance, index) => instance.modify(...allNewData[index]))
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
