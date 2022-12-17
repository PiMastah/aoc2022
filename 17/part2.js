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

let grid = {}

const pushShape = (shape, dir) => shape.map(p => [p[0]+dir,p[1]])
const changeHeight = (shape, h) => shape.map(p => [p[0],p[1]+h])

const isValidPosition = shape => shape.every(([x, y]) => x >= 0 && x < width && y>=0 && grid[`${x}-${y}`] == undefined)

const draw = (s = [], height = 10, cutoff = 0) => {
  for (let y = height;y >= cutoff; y--) {
    let line = '#'
    for (let x = 0; x < width; x++) {
      line += (grid[`${x}-${y}`] || s.some(([x1,y1]) => x1 == x && y1 == y)) ? '@' : '.'
    }
    console.log(line+'#')
  }
  console.log('#########'+EOL+EOL)
}

let done = false
let i = 0
let remainingShapes = 0
let h1 = 0

const seenStates = {}

while (!done || remainingShapes > 0) {
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

  if (!done && currHeight > 30) {
    const gridHash =
      Object.keys(grid)
      .filter(x => currHeight-30 <= +x.split('-')[1])
      .map(s => {
        const [x, y] = s.split('-').map(x => +x)
        return `${x}-${y-currHeight+30}`
      })
      .sort((a,b) => a>b ? 1 : -1)
      .join('#')
    const signature = `${iShape}-${iPush}-${gridHash}`

    if (seenStates[signature] !== undefined) {
      const length = i - seenStates[signature][0]
      const fullCycleHeight = currHeight - seenStates[signature][1]
      remainingShapes = 1000000000000 - i
      const fullCycles = Math.floor(remainingShapes / length)
      h1 = fullCycles * fullCycleHeight
      remainingShapes -= fullCycles * length
      done = true
    } else {
      seenStates[signature] = [i, currHeight]
    }
  }
  i++
  remainingShapes--
  if (currHeight >= 40) {
    for (let yDel = 0; yDel < 10; yDel++) {
      [0,1,2,3,4,5,6].forEach(xDel => delete grid[`${xDel}-${currHeight-40-yDel}`])
    }
  }
}

console.log(currHeight+1+h1)