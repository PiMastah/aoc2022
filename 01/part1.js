import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(x => +x)

const best = input.reduce(([currentSum, best], current) => {
  if (current == 0) {
    return [0, best]
  }
  const s = currentSum + current

  return [s, Math.max(s, best)]
}, [0, -Infinity])[1]

console.log(best)