import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(x => x.split(',').map(y => y.split('-').map(i => +i)))

console.log(
  input.filter(e => 
    e[0][0] <= e[1][0] && e[0][1] >= e[1][1]
    || e[0][0] >= e[1][0] && e[0][1] <= e[1][1]
  ).length
)