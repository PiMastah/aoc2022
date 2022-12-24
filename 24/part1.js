import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)

let storms = input.reduce((g, l, y) => {
  return l.split('').reduce((g, c, x) => {
    if (c !== '#' && c !== '.') g[`${x}//${y}`] = [c]
    return g
  }, g)
}, {})

const move = () => {
  const newStorms = {}
  Object.entries(storms).forEach(([k, vals]) => {
    const [x, y] = k.split('//').map(x => +x)

    vals.forEach(v => {
      let newX = x
      let newY = y

      switch (v) {
      case '>':
        newX = newX+1
        if (newX == input[0].length-1) newX = 1
        break
      case '<':
        newX = newX-1
        if (newX == 0) newX = input[0].length-2
        break
      case 'v':
        newY = newY+1
        if (newY == input.length-1) newY = 1
        break
      case '^':
        newY = newY-1
        if (newY == 0) newY = input.length-2
        break
      }


      if (newStorms[`${newX}//${newY}`] == undefined) newStorms[`${newX}//${newY}`] = []
      newStorms[`${newX}//${newY}`].push(v)
    })

  })
  return newStorms
}

const goalX = input[0].length-2
const goalY = input.length-2

let i = 0

const lenX = input[0].length-2
const lenY = input.length-2

const nextPositions = ([x,y]) => [[x,y], [x+1, y], [x-1, y], [x, y+1], [x, y-1]]
  .filter(([x, y]) => x < input[0].length-1 && x > 0 && y < input.length-1 && y > 0)

const allStates = {}

while (i == 0 || i % lenX || i % lenY) {
  allStates[i] = Object.keys(storms).reduce((state, pos) => {
    state[pos] = storms[pos].map(x => x)
    return state
  }, {})
  storms = move()
  i++
}

const max = i

let q = [[1, 0, 0]]

const seen = {}
let t = 0

loop:
while (true) {
  const newQ = [[1,0,t+1]]

  for (let idx = 0; idx < q.length; idx++) {
    const [x, y, currT] = q[idx]
    if (x == goalX && y == goalY) {
      t++
      break loop
    }
    if (seen[`${x}//${y}//${currT%max}`] == 1) continue
    seen[`${x}//${y}//${currT%max}`] = 1

    const ns = nextPositions([x,y]).filter(([nx, ny]) => {
      return allStates[(currT+1)%max][`${nx}//${ny}`] === undefined
    })

    newQ.push(...ns.map(p => [p[0], p[1], currT+1]))
  }

  t++
  q = newQ
}

console.log(t)