import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL+EOL)

const map = input[0].split(EOL).map(l => l.split(''))
const instructions = input[1].split('R').join('-R-').split('L').join('-L-').split('-').map(i => ['R', 'L'].includes(i) ? i : +i)

let maxY = map.length
let maxX = map[0].length
let currentY = 0
let currentX = map[0].findIndex(x => x == '.')
let direction = 0

const nextDir = {
  '0': {'L': 3, 'R': 1},
  '1': {'L': 0, 'R': 2},
  '2': {'L': 1, 'R': 3},
  '3': {'L': 2, 'R': 0}
}

const draw = () => {
  map.forEach((l, y) => {
    let out = ''
    l.forEach((c, x) => {
      out += (x == currentX && y == currentY) ? '@' : c
    })
    console.log(out)
  })
}

instructions.forEach((i, j) => {
  if (['R', 'L'].includes(i)) {
    direction = nextDir[direction][i]
  } else {
    let steps = i
    let done = false
    let lastValidX = currentX
    let lastValidY = currentY
    while (steps > 0 && !done) {
      let nextX = currentX
      let nextY = currentY
      switch (direction) {
        case 0:
          nextX = (nextX+1)%maxX
          break
        case 1:
          nextY = (nextY+1)%maxY
          break
        case 2:
          nextX = (maxX+nextX-1)%maxX
          break
        case 3:
          nextY = (maxY+nextY-1)%maxY
          break
      }
      let next = map[nextY][nextX]
      if (next == '#') {
        done = true
        currentX = lastValidX
        currentY = lastValidY
      } else {
        if (next == '.') {
          lastValidX = nextX
          lastValidY = nextY
          steps--
        }
        currentX = nextX
        currentY = nextY
      }
    }
  }
})

console.log(1000 * (currentY+1) + 4*(currentX+1) + direction)