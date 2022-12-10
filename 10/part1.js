import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' ').map((v,i) => i== 1 ? +v : v))

let v = 1
let s = 0
let cycle = 1
let wasIdle = false
let currentLine = input.shift()

while (currentLine) {
  cycle++

  if (currentLine[0] == 'noop'){
    currentLine = input.shift()
    wasIdle = false
  } else if (wasIdle) {
    v += currentLine[1]
    currentLine = input.shift()
    wasIdle = false
  } else {
    wasIdle = true
  }

  if ((cycle-20)%40==0) {
    s += cycle * v
  }
}

console.log(s)