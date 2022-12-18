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

console.log(input.reduce((exposed, [x,y,z]) => {
  return exposed + neighbours(x,y,z).filter(([nx, ny, nz]) => {
    return points[`${nx}-${ny}-${nz}`] === undefined
  }).length
}, 0))