// Code from http://www.petercollingridge.co.uk/blog/evolving-images/

import React from 'react'
import getPixels from 'get-pixels'
import { range, clamp, flatten, sum } from 'lodash'
import { Circle, Stage, Layer, Image } from 'react-konva'

const STEP = 255 * 0.1
const IMAGE = '/slack.png'
const MIN_RADIUS = 1
const MAX_RADIUS = 5
const random = () => Math.random() * 2 - 1

const modifyChannel = c => Math.floor(clamp(c + random() * STEP, 0, 255))

const modifyCoord = (c, radius, max) => Math.floor(clamp(c + random() * radius, 0, max))

const modifyRadius = currentRadius =>
  Math.floor(clamp(currentRadius + random(), MIN_RADIUS, MAX_RADIUS))

const randomChannel = () => Math.floor(Math.random() * 255)

const squaredError = (trueArray, predictedArray) => {
  return trueArray.reduce(
    (acc, _, index, array) => acc + Math.pow(array[index] - predictedArray[index], 2),
  )
}

class Instance {
  constructor(maxX, maxY, getPixelFn, id) {
    this.getPixel = getPixelFn
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

    this.currentFitness = this.fitness(this.xExtent, this.yExtent, this.rgbaValue, this.radius)
    this.id = id
  }

  get rgbaValue() {
    const { r, g, b, a } = this
    return [r, g, b, a]
  }

  fitness(xExtent, yExtent, rgbaValue, radius) {
    // Circle
    const allPixels = flatten(
      range(...xExtent).map(x =>
        range(...yExtent).map(y => this.getPixel(Math.floor(x), Math.floor(y))),
      ),
    )

    const pixelLength = allPixels.length || 1
    const squareErrors =
      sum(allPixels.map(pixel => squaredError(pixel, rgbaValue))) / pixelLength + radius * 0.01

    return 1 / Math.sqrt(squareErrors)
  }

  set newChildren({ r, g, b, a, x, y, radius, xExtent, yExtent }) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    this.x = x
    this.y = y
    this.radius = radius
    this.xExtent = xExtent
    this.yExtent = yExtent
  }

  modify() {
    const r = modifyChannel(this.r)
    const g = modifyChannel(this.g)
    const b = modifyChannel(this.b)
    const a = modifyChannel(this.a)
    const x = modifyCoord(this.x, this.radius, this.maxX)
    const y = modifyCoord(this.y, this.radius, this.maxY)
    const radius = modifyRadius(this.radius)

    const xExtent = [
      Math.floor(clamp(x - radius, 0, this.maxX)),
      Math.floor(clamp(x + radius, 0, this.maxX)),
    ]
    const yExtent = [
      Math.floor(clamp(y - radius, 0, this.maxY)),
      Math.floor(clamp(y + radius, 0, this.maxY)),
    ]

    const rgb = [r, g, b, a]

    const childFitness = this.fitness(xExtent, yExtent, rgb, radius)

    if (childFitness > this.currentFitness) {
      this.newChildren = { r, g, b, a, x, y, radius, xExtent, yExtent }
      this.currentFitness = childFitness
    }
  }
}

class GeneticAlgorithm {
  constructor(width, height, getPixelFn, n = 10000) {
    this.width = width
    this.height = height
    this.getPixelFn = getPixelFn
    this.offSpring = range(n).map(idx => new Instance(width, height, getPixelFn, idx))
  }

  get allData() {
    return this.offSpring.map(children => {
      const { r, g, b, a, radius, x, y } = children
      return { r, g, b, a, radius, x, y }
    })
  }

  newGeneration() {
    this.offSpring.forEach(_ => _.modify())
  }
}

function getPixel(pixels) {
  if (!pixels.hasOwnProperty('shape')) return (_, __) => null

  return (i, j) => {
    return range(4).map(n => pixels.get(i, j, n))
  }
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
    const pixelGetter = getPixel(pixels)
    const genAlgo = new GeneticAlgorithm(pixels.shape[0], pixels.shape[1], pixelGetter)

    this.genId = setInterval(this.updateGeneration, 16)
    this.setState({ pixels, genAlgo })
  }

  generateAlgorithm(width, height, pixelGetter) {
    const genAlgo = new GeneticAlgorithm(width, height, pixelGetter)
    return genAlgo
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
