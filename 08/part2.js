import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split('').map(v => +v))

const r = input.flatMap((line, y) => line.flatMap((v, x) => {
  const vertical = input.flatMap(z => z.filter((_, i) => i == x))

  return [
    line.slice(0, x).reverse(),
    line.slice(x+1),
    vertical.slice(0, y).reverse(),
    vertical.slice(y+1)
  ].map(s => {
      const idx = s.findIndex(v2 => v2 >= v)
      return idx == -1 ? s.length : idx + 1
    }).reduce((p, c) => p*c, 1)
}))

console.log(Math.max(...r))