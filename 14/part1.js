import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' -> ').map(c => c.split(',').map(x => +x)))

const blocked = {}

const minY = Math.max.apply([], input.flatMap(x => x).map(x => x[1]).flatMap(x => x))

input.forEach((f, j) => {
  f.forEach(([x, y], i) => {
    if (i == 0) return

    const [xT, yT] = input[j][i-1]

    while ((x !== xT) || (y !== yT)) {
      blocked[`${x}-${y}`] = 1
      x += Math.sign(xT-x)
      y += Math.sign(yT-y)
    }
    blocked[`${xT}-${yT}`] = 1
  })
})

const addSand = () => {
  let cX = 500
  let cY = 0

  let hasMoved = true

  while (cY <= minY && hasMoved) {
    hasMoved = false
    if (!blocked[`${cX}-${cY+1}`]) {
      cY += 1
      hasMoved = true
    } else if (!blocked[`${cX-1}-${cY+1}`]) {
      cX -= 1
      cY += 1
      hasMoved = true
    } else if (!blocked[`${cX+1}-${cY+1}`]) {
      cX += 1
      cY += 1
      hasMoved = true
    }
  }

  if (hasMoved == false) {
    blocked[`${cX}-${cY}`] = 1
  }

  return cY > minY ? false : true
}

let c = 0

for (;addSand();c++) {}

console.log(c)