import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).reduce((g, l, y) => {
    l.split('').reduce((acc, v, x) => {
      if (v == '#') {
        acc[`${x}//${y}`] = 1
      }
      return acc
    }, g)
    return g
  }, {})

const wantsToMove = (x,y) => [[x-1, y-1], [x-1, y], [x-1, y+1], [x, y-1], [x, y+1], [x+1, y-1], [x+1, y], [x+1, y+1]]
  .some(([nx, ny]) => input[`${nx}//${ny}`] !== undefined)

const dirs = [[0,-1], [0,1], [-1,0], [1,0]]

const draw = () => {
  const coords = Object.keys(input).map(c => c.split('//').map(n => +n))

  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  coords.forEach(c => {
    if (c[0] < minX) minX = c[0]
    if (c[0] > maxX) maxX = c[0]
    if (c[1] < minY) minY = c[1]
    if (c[1] > maxY) maxY = c[1]
  })

  for (let j= minY; j<= maxY;j++) {
    let line = ''
    for (let i= minX; i<= maxX;i++) {
      line += input[`${i}//${j}`] !== undefined ? '#' : '.'
    }
    console.log(line)
  }
  console.log(EOL+EOL+EOL)
}

let i = 0
let moved = true

while(moved) {
  moved = false
  i++
  const candidatePositions = Object.keys(input).reduce((desiredPos, k) => {
    const [x, y] = k.split('//').map(n => +n)

    if (!wantsToMove(x, y)) return desiredPos

    const desiredDirection = dirs.find(dir => {
      let toCheck = [[x+dir[0], y+dir[1]]]
      if (dir[0] == 0) {
        toCheck.push([x+1,y+dir[1]], [x-1,y+dir[1]])
      } else {
        toCheck.push([x+dir[0],y+1], [x+dir[0],y-1])
      }

      return toCheck.every(([nx, ny]) => input[`${nx}//${ny}`] == undefined)
    })

    if (desiredDirection) {
      if (desiredPos[`${x+desiredDirection[0]}//${y+desiredDirection[1]}`] === undefined) desiredPos[`${x+desiredDirection[0]}//${y+desiredDirection[1]}`] = []
      desiredPos[`${x+desiredDirection[0]}//${y+desiredDirection[1]}`].push([k, desiredDirection])
    }

    return desiredPos
  }, {})

  const positions = Object.keys(candidatePositions)

  if (positions.length == 0) break

  positions.forEach(target => {
    candidatePositions[target].forEach(([from, dir]) => {
      if (candidatePositions[target].length == 1) {
        moved = true
        const [from, _] = candidatePositions[target][0]

        input[target] = input[from]
        delete input[from]
      }
    })
  })

  dirs.push(dirs.shift())
}

console.log(i)