import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map((_,i,a) => {
    const n = Math.ceil(a.length / 3)
    if (i < n) return a.slice(i * 3, i * 3 + 3).map(x => x.split(''))
  }).filter(x => x !== undefined)

console.log(
  input
    .map(group => group[0].find(x1 => group[1].some(x2 => x1 == x2) && group[2].some(x3 => x1 == x3)).charCodeAt(0))
    .map(x => x > 90 ? x - 96 : x - 64 + 26)
    .reduce((s,c) => s + c, 0)
)