import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')
  .split('')

console.log(input.findIndex((chr, i, s) => i > 2 && new Set([s[i], s[i-1], s[i-2], s[i-3]]).size == 4) + 1)