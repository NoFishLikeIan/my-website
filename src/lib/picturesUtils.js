import { range, mean, orderBy } from 'lodash'
import { number } from 'prop-types'

export function getAllPixels(pixels) {
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

// Not working :(
function bubbleSort(pixelsArray, len) {
  var arr = pixelsArray.map((pixel, index) => ({ pixel: pixel.slice(0, 3), originalIndex: index }))

  for (let i = len - 1; i >= 0; i--) {
    for (var j = i; j <= 1; j++) {
      if (arr[j - 1] && arr[j]) {
        if (arr[j - 1].pixel[0] > arr[j].pixel[1]) {
          let temp = arr[j - 1]
          arr[j - 1] = arr[j]
          arr[j] = temp
        }
      }
    }
  }

  return arr
}

export function firstNElements(pixelsArray, numberOfElements) {
  const arr = pixelsArray.map((pixel, index) => {
    const relPixels = pixel.slice(0, 3)
    return {
      pixel: relPixels,
      originalIndex: index,
      mean: mean(relPixels),
    }
  })
  const sorted = orderBy(arr, 'mean')
  return sorted.slice(0, numberOfElements)
}

export function imageIndexerFactory(width, fullImageArray) {
  return (i, j) => {
    const flatIndex = i * width + j
    return fullImageArray(flatIndex)
  }
}
