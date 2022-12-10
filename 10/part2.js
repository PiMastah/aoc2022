import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' ').map((v,i) => i== 1 ? +v : v))

let v = 1
let cycle = 0
let wasIdle = false
let currentLine = input.shift()
let line = ''

while (currentLine) {
  if ([cycle%40-1, cycle%40, cycle%40+1].includes(v)) {
    line += '#'
  } else {
    line += '.'
  }

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

  if ((cycle) % 40 == 0) {
    console.log(line)
    line = ''
  }
}
