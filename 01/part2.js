import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(x => +x)

const sums = input.reduce(([arr, currentSum], current) => {
  if (current == 0) {
    arr.push(currentSum)
    return [arr, 0]
  }
  const s = currentSum + current

  return [arr, s]
}, [[], 0])[0]

console.log(sums.sort((a, b) => b - a).slice(0, 3).reduce((s,c) => s + c, 0))