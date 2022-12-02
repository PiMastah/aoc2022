import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(x => x.split(" "))

const outcome = {
  "A": {
    "X": 4,
    "Y": 8,
    "Z": 3,
  },
  "B": {
    "X": 1,
    "Y": 5,
    "Z": 9,
  },
  "C": {
    "X": 7,
    "Y": 2,
    "Z": 6,
  },
}

console.log(input.map(([a, b]) => outcome[a][b]).reduce((s, c) => s + c, 0))