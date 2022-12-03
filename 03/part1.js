import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(x => [x.substring(0, x.length/2).split(''), x.substring(x.length/2).split('')])

console.log(
  input
    .map(([x1, x2]) => x1.find(l1 => x2.some(l2 => l1 == l2)).charCodeAt(0))
    .map(x => x > 90 ? x - 96 : x - 64 + 26)
    .reduce((s,c) => s + c, 0)
)