import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(',').map(x => +x))

const neighbours = (x,y,z) => [[x+1,y,z], [x-1,y,z], [x,y+1,z], [x,y-1,z], [x,y,z+1], [x,y,z-1]]
const points = input.reduce((g, [x,y,z]) => {
  g[`${x}-${y}-${z}`] = 1
  return g
}, {})

const reachable = input.reduce((g, [x,y,z]) => {
  g[`${x}-${y}-${z}`] = 1
  return g
}, {})

const q = [[0,0,0]]

const emptyNeighbours = p => ([nx, ny, nz]) => {
  return p[`${nx}-${ny}-${nz}`] === undefined
}

const allV = input.flatMap(x => x)
const maxV = Math.max.apply(allV, allV)
const minV = Math.min.apply(allV, allV)

while (q.length > 0) {
  const [x,y,z] = q.pop()
  const newNeighbours = neighbours(x,y,z).filter((p) => p.every(c => c >= minV-1 && c <= maxV+1)).filter(emptyNeighbours(reachable))
  newNeighbours.reduce((g, [x,y,z]) => {
    g[`${x}-${y}-${z}`] = 1
    return g
  }, reachable)
  q.push(...newNeighbours)
}

console.log(input.reduce((exposed, [x,y,z]) => {
  return exposed + neighbours(x,y,z).filter(([nx, ny, nz]) => {
    return reachable[`${nx}-${ny}-${nz}`] === 1 && points[`${nx}-${ny}-${nz}`] === undefined
  }).length
}, 0))