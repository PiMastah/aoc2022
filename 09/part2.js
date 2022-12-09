import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' ').map((x, i) => i==1 ? +x : x))

const visited = new Set()

const positions = Array(10).fill().map(x => [0,0])

visited.add(positions[9].join('-'))

input.forEach(([dir, steps]) => {
  while (steps > 0) {
    switch (dir) {
      case 'R':
        positions[0][0] += 1
        break
      case 'L':
        positions[0][0] -=1
        break
      case 'U':
        positions[0][1] -=1
        break
      case 'D':
        positions[0][1] +=1
        break
    }
    steps--

    positions.forEach((currentPos, knotIndex) => {
      if (knotIndex == 0) return

      const prevPos = positions[knotIndex - 1]

      let swapY = false
      let swapX = false

      const xDist = Math.pow(prevPos[0] - currentPos[0], 2)
      const yDist = Math.pow(prevPos[1] - currentPos[1], 2)

      if (xDist > 1 || xDist == 1 && yDist > 1) {
        swapX = true
      }
      if (yDist > 1 || yDist == 1 && xDist > 1) {
        swapY = true
      }

      if (swapX) {
        currentPos[0] += prevPos[0] > currentPos[0] ? 1 : -1
      }
      if (swapY) {
        currentPos[1] += prevPos[1] > currentPos[1] ? 1 : -1
      }

      if (knotIndex == 9) visited.add(currentPos.join('-'))
    })
  }
})

console.log(visited.size)