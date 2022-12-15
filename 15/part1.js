import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(': ').map(p => p.split('x=')[1].split(', y=').map(x => +x)))

const mh = (a, b) => Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1])

const row = 2000000
const excluded = new Set()

const beaconsInRow = new Set()

input.forEach(pair => {
  const [sensor, closestBeacon] = pair
  if (closestBeacon[1] == row) beaconsInRow.add(closestBeacon[0])
  const dist = mh(sensor, closestBeacon)
  const xDist = mh(sensor, [sensor[0], row])

  let i = dist - xDist + 1

  while (i-->=0) {
    if (!beaconsInRow.has(sensor[0]+i)) excluded.add(sensor[0]+i)
    if (!beaconsInRow.has(sensor[0]-i)) excluded.add(sensor[0]-i)
  }
})

console.log(excluded.size)