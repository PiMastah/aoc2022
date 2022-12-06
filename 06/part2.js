import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')
  .split('')

console.log(input.findIndex((chr, i, s) => i > 12 && new Set(s.slice(i-13, i+1)).size == 14) + 1)