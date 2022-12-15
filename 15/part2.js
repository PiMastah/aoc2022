import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(': ').map(p => p.split('x=')[1].split(', y=').map(x => +x)))

const mh = (a, b) => Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1])

const maxV = 4000000
const excluded = {}

const merge = intervals => {
  if (intervals.length < 2) return intervals

  intervals.sort((a, b) => a[0] - b[0])

  const result = []
  let previous = intervals[0]

  for (let i = 1; i < intervals.length; i += 1) {
    if (previous[1] + 1 >= intervals[i][0]) {
      previous = [previous[0], Math.max(previous[1], intervals[i][1])]
    } else {
      result.push(previous)
      previous = intervals[i]
    }
  }

  result.push(previous)

  return result
}

for (let y = 0; y <= maxV; y++) {
  let done = false
  input.forEach(pair => {
    if (done) return
    const [sensor, closestBeacon] = pair
    const dist = mh(sensor, closestBeacon)

    const xO = dist - Math.abs(sensor[1]-y)

    if (xO >=0) {
      if (!excluded[y]) {
        excluded[y] = [[sensor[0]-xO, sensor[0]+xO]]
      } else {
        excluded[y].push([sensor[0]-xO, sensor[0]+xO])
        excluded[y] = merge(excluded[y])
        if (excluded[y].length == 1 && excluded[y][0][0] <= 0 && excluded[y][0][1] >= maxV) done = true
      }
    }
  })
  if (excluded[y].length == 2 && excluded[y][0][0] <= 0 && excluded[y][1][1] >= maxV && excluded[y][1][0]-excluded[y][0][1] == 2) {
    console.log(y + 4000000 * (excluded[y][0][1]+1))
    process.exit()
  }
}