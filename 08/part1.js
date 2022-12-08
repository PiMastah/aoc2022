import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split('').map(v => +v))

const r = input.map((line, y) => line.map((v, x) => {
  const vertical = input.flatMap(z => z.filter((_, i) => i == x))

  return [
    line.slice(0, x),
    line.slice(x+1),
    vertical.slice(0, y),
    vertical.slice(y+1)
  ].some(s => Math.max.apply(Math, s) < v)
}))

console.log(r.reduce((c, l) => c + l.filter(x => x).length, 0))