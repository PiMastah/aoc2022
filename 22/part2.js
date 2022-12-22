import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL+EOL)

const map = input[0].split(EOL).map(l => l.split(''))
const instructions = input[1].split('R').join('-R-').split('L').join('-L-').split('-').map(i => ['R', 'L'].includes(i) ? i : +i)

let maxY = map.length
let maxX = Math.max.apply([], map.map(l => l.length))
const faceDim = 50
let currentY = 0
let currentX = map[0].findIndex(x => x == '.')
let direction = 0

const nextDir = {
  '0': {'L': 3, 'R': 1},
  '1': {'L': 0, 'R': 2},
  '2': {'L': 1, 'R': 3},
  '3': {'L': 2, 'R': 0}
}

const cubeData = {
  A: { origin: [1, 0], 3: ["F", 1], 1: ["C", 0], 2: ["E", 2], 0: ["B", 0] },
  B: { origin: [2, 0], 3: ["F", 0], 1: ["C", 1], 2: ["A", 0], 0: ["D", 2] },
  C: { origin: [1, 1], 3: ["A", 0], 1: ["D", 0], 2: ["E", 3], 0: ["B", 3] },
  D: { origin: [1, 2], 3: ["C", 0], 1: ["F", 1], 2: ["E", 0], 0: ["B", 2] },
  E: { origin: [0, 2], 3: ["C", 1], 1: ["F", 0], 2: ["A", 2], 0: ["D", 0] },
  F: { origin: [0, 3], 3: ["E", 0], 1: ["B", 0], 2: ["A", 3], 0: ["D", 3] }
}

const draw = () => {
  map.forEach((l, y) => {
    let out = ''
    l.forEach((c, x) => {
      const isCurrent = x == currentX && y == currentY
      const isVisited = visited[`${x}-${y}`] !== undefined
      out += isCurrent ? '\x1b[41m@\x1b[40m' : isVisited ? `\x1b[42m${visited[`${x}-${y}`]}\x1b[40m` : c
    })
    console.log(out)
  })
  console.log(EOL)
}

const rotateRight = (x, y) =>  [(faceDim-y)%faceDim, x]

const getNextCoord = (currentX, currentY, direction) => {
  const currentTileX = Math.floor(currentX/faceDim)
  const currentTileY = Math.floor(currentY/faceDim)
  const oX = currentX
  const oY = currentY

  switch (direction) {
    case 0:
      currentX = (currentX+1)%maxX
      break
    case 1:
      currentY = (currentY+1)%maxY
      break
    case 2:
      currentX = (maxX+currentX-1)%maxX
      break
    case 3:
      currentY = (maxY+currentY-1)%maxY
      break
  }

  let r = 0

  if ([undefined, ' '].includes(map[currentY][currentX])) {
    let nextOffsetX = oX%faceDim
    let nextOffsetY = oY%faceDim

    const currentFace = Object.keys(cubeData).find(k => cubeData[k].origin[0] == currentTileX && cubeData[k].origin[1] == currentTileY)
    const nextFace = cubeData[cubeData[currentFace][direction][0]]
    let rotations = cubeData[currentFace][direction][1]
    r = rotations

    while (rotations-- > 0) {
      [nextOffsetX, nextOffsetY] = rotateRight(nextOffsetX, nextOffsetY)
      direction = nextDir[direction]['R']
    }

    switch (r) {
      case 0:
        nextOffsetY = (faceDim-nextOffsetY-1)%faceDim
        break
      case 1:
        nextOffsetX = (faceDim-nextOffsetX)%faceDim
        break
      case 2:
        nextOffsetX = (faceDim-nextOffsetX)%faceDim
        nextOffsetY = (faceDim+nextOffsetY-1)%faceDim
        break
      case 3:
        nextOffsetY = (faceDim-nextOffsetY)%faceDim
        break
    }

    currentX = nextFace.origin[0]*faceDim + nextOffsetX
    currentY = nextFace.origin[1]*faceDim + nextOffsetY
  }
  return [currentX, currentY, direction, r]
}

instructions.forEach((i, j) => {
  if (['R', 'L'].includes(i)) {
    direction = nextDir[direction][i]
  } else {
    let steps = i
    let done = false
    let nextDir = direction
    while (steps > 0 && !done) {
      const [nextX, nextY, newDir, rots] = getNextCoord(currentX, currentY, nextDir)
      let next = map[nextY][nextX]
      if (next == '#') {
        done = true
      } else {
        steps--
        nextDir = newDir
        direction = newDir
        currentX = nextX
        currentY = nextY
      }
    }
  }
})

console.log(1000 * (currentY+1) + 4*(currentX+1) + direction)