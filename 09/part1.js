import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' ').map((x, i) => i==1 ? +x : x))

const visited = new Set()

const headPos = [0,0]
const tailPos = [0,0]

visited.add(tailPos.join('-'))

input.forEach(([dir, steps]) => {
  while (steps > 0) {
    switch (dir) {
      case 'R':
        headPos[0] += 1
        break
      case 'L':
        headPos[0] -=1
        break
      case 'U':
        headPos[1] -=1
        break
      case 'D':
        headPos[1] +=1
        break
    }
    steps--

    let swapX = false
    let swapY = false

    const xDist = Math.pow(headPos[0] - tailPos[0], 2)
    const yDist = Math.pow(headPos[1] - tailPos[1], 2)

    if (xDist > 1 || xDist == 1 && yDist > 1) {
      swapX = true
    }
    if (yDist > 1 || yDist == 1 && xDist > 1) {
      swapY = true
    }

    if (swapX) {
      tailPos[0] += headPos[0] > tailPos[0] ? 1 : -1
    }
    if (swapY) {
      tailPos[1] += headPos[1] > tailPos[1] ? 1 : -1
    }

    visited.add(tailPos.join('-'))
  }
})


console.log(visited.size)