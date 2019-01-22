export function* fibonacciGenerator(n, current = 0, next = 1) {
  if (!n) return current
  yield current
  yield* fibonacciGenerator(n - 1, next, current + next)
}
