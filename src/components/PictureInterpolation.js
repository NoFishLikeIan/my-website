import React from 'react'
import getPixels from 'get-pixels'
import { getAllPixels, firstNElements } from '../lib/picturesUtils'

const IMAGES = [
  'images/cactus.jpeg',
  'images/cera.jpg',
  'images/ermm.jpg',
  'images/fennec_7.jpg',
  'images/fish.jpg',
  'images/mice.jpg',
  'images/tonno.jpg',
]
const N_OF_PIXELS = 50_000
const WIDTH = 640
const TIME_TO_CHANGE = 2 * 1000 // in milliseconds

function interpolatePixels(step, width) {
  return (firstPixels, secondPixels, frame) => {
    const stepInPercentage = step * frame
    return firstPixels.map((_, index, start) => {
      const initPoint = start[index]
      const endPoint = secondPixels[index]
      const initX = initPoint.originalIndex % width
      const initY = Math.floor(initPoint.originalIndex / width)
      const endX = endPoint.originalIndex % width
      const endY = Math.floor(endPoint.originalIndex / width)
      const newChannels = initPoint.pixel.map((channel, j) =>
        Math.abs((channel - endPoint.pixel[j]) * stepInPercentage + channel),
      )
      const newX = Math.abs(initX - endX) * stepInPercentage + initX
      const newY = Math.abs(initY - endY) * stepInPercentage + initY

      return { originalIndex: newX * width + newY, pixel: newChannels }
    })
  }
}

export class PictureInterpolation extends React.Component {
  state = { imagePixels: [], currentIndex: 0, imageAtTheMoment: null }
  animationId = 0
  frame = 0

  canvas = React.createRef()

  fetchedAllStartInterpolation = () => {
    this.animationId = setInterval(this.updatePicture, 16)
    this.paintCanvas()
  }

  handlePictureFetch = (err, pixels) => {
    if (err) {
      console.log('Could not fetch image')
      return
    }
    console.log('Fetched pixels')

    const fullPicture = getAllPixels(pixels)
    const brightestNPictures = firstNElements(fullPicture, N_OF_PIXELS)
    const imagePixels = this.state.imagePixels.slice()
    imagePixels.push(brightestNPictures)

    this.setState(
      { imagePixels },
      imagePixels.length === IMAGES.length ? this.fetchedAllStartInterpolation : () => null,
    )
  }

  updatePicture = () => {
    const { currentIndex, imagePixels } = this.state
    const indexFrom = currentIndex
    const indexTo = currentIndex === imagePixels.length - 1 ? 0 : currentIndex + 1
    const comingFromPicture = imagePixels[indexFrom]
    const goingToPicture = imagePixels[indexTo]

    const imageAtTheMoment = this.interpolator(comingFromPicture, goingToPicture, this.frame)

    if (this.frame * 16 === TIME_TO_CHANGE) {
      this.frame = 0
      this.setState({ currentIndex: indexTo, imageAtTheMoment }, this.paintCanvas)
    } else {
      this.frame += 1
      this.setState({ imageAtTheMoment }, this.paintCanvas)
    }
  }

  renderImage = ctx => {
    const { imageAtTheMoment, imagePixels, currentIndex } = this.state
    const currentImage = imageAtTheMoment || imagePixels[currentIndex]

    currentImage.forEach(pixelData => {
      const j = Math.floor(pixelData.originalIndex / WIDTH)
      const i = pixelData.originalIndex % WIDTH
      const rgb = pixelData.pixel.join(', ')
      ctx.fillStyle = `rgba(${rgb}, 1)`
      ctx.fillRect(i, j, 1, 1)
    })
  }

  paintCanvas = () => {
    const canvas = this.canvas.current
    const ctx = canvas.getContext('2d')
    this.renderImage(ctx)
  }

  componentDidMount() {
    IMAGES.forEach(imUrl => getPixels(imUrl, this.handlePictureFetch))
    this.interpolator = interpolatePixels(16 / TIME_TO_CHANGE, WIDTH)
  }

  componentWillUnmount() {
    clearInterval(this.animationId)
  }

  canvasRef = canvas => (this.canvas = this.canvas || canvas)

  render() {
    const { className = '' } = this.props
    const { imagePixels } = this.state
    const fetchedAll = imagePixels.length === IMAGES.length

    return (
      <div className={`mh2 ${className}`}>
        {fetchedAll ? (
          <canvas ref={this.canvas} width={700} height={700} />
        ) : (
          'inefficiently loading again, read left in the meantime...'
        )}
      </div>
    )
  }
}
