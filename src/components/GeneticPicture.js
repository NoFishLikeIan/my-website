// Code from http://www.petercollingridge.co.uk/blog/evolving-images/

import React from 'react'
import getPixels from 'get-pixels'
import { range } from 'lodash'

function getPixel(pixels) {
  if (!pixels.hasOwnProperty('shape')) return (_, __) => null
  return (i, j) => range(4).map(n => pixels.get(i, j, n))
}

const wrapperAroundFunction = scope => {
  const fn = function(err, pixels) {
    if (err) {
      console.log('Could not fetch image')
      return
    }
    console.log('Fetched pixels')
    scope.setState({ pixels })
  }
  return fn
}

export class GeneticPicture extends React.Component {
  state = { pixels: [], pixelShape: [] }

  componentDidMount() {
    getPixels('/at_pic.png', wrapperAroundFunction(this))
  }

  render() {
    const { pixels } = this.state
    const pixelGetter = getPixel(pixels)

    return <></>
  }
}
