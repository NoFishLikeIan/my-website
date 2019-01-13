import { PVector } from '../components/BoidsChase'

export function calculateMagnitude(vector) {
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
}

export function vectorSubtract(first, second) {
  const x = first.x - second.x
  const y = first.y - second.y

  return new PVector(x, y)
}
