import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(x => x.split(" "))

const outcome = {
  "A": {
    "X": 3,
    "Y": 4,
    "Z": 8,
  },
  "B": {
    "X": 1,
    "Y": 5,
    "Z": 9,
  },
  "C": {
    "X": 2,
    "Y": 6,
    "Z": 7,
  },
}

console.log(input.map(([a, b]) => outcome[a][b]).reduce((s, c) => s + c, 0))