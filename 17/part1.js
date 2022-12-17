import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split('').map(x => x == '>' ? 1 : -1)

const shapes = [
  [[0,0],[1,0],[2,0],[3,0]],
  [[1,0],[0,1],[1,1],[2,1],[1,2]],
  [[0,0],[1,0],[2,0],[2,1],[2,2]],
  [[0,0],[0,1],[0,2],[0,3]],
  [[0,0],[1,0],[0,1],[1,1]]
]

const width = 7

let iShape = 0
let iPush = 0
let currHeight = -1

const grid = {}

const pushShape = (shape, dir) => shape.map(p => [p[0]+dir,p[1]])
const changeHeight = (shape, h) => shape.map(p => [p[0],p[1]+h])

const isValidPosition = shape => shape.every(([x, y]) => x >= 0 && x < width && y>=0 && grid[`${x}-${y}`] == undefined)

const draw = (s = []) => {
  for (let y = 10;y >= 0; y--) {
    let line = '#'
    for (let x = 0; x < width; x++) {
      line += (grid[`${x}-${y}`] || s.some(([x1,y1]) => x1 == x && y1 == y)) ? '@' : '.'
    }
    console.log(line+'#')
  }
  console.log('#########'+EOL+EOL)
}

for (let i = 0; i < 2022; i++) {
  const s = shapes[iShape].map(p => p.map(c => c))
  iShape = (iShape+1)%shapes.length
  let pos = changeHeight(pushShape(s, 2), currHeight+4)
  let hasStopped = false

  while (!hasStopped) {
    const pushed = pushShape(pos, input[iPush])
    iPush = (iPush+1)%input.length
    if (isValidPosition(pushed)) pos = pushed
    const fallen = changeHeight(pos, -1)
    if (isValidPosition(fallen)) {
      pos = fallen
    } else {
      hasStopped = true
    }
  }

  let maxH =  0

  pos.reduce((g, c) => {
    g[`${c[0]}-${c[1]}`] = 1
    maxH = Math.max(maxH, c[1])
    return g
  }, grid)

  currHeight = Math.max(currHeight, maxH)
}
console.log(currHeight+1)
