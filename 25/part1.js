import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)


const digits = ['2','1','0','-', '=']
const conv = {
  '2': 2,
  '1': 1,
  '0': 0,
  '-': -1,
  '=': -2
}

const snafuToDec = s => s.split('').reverse().reduce((s, c, i) => s + Math.pow(5, i) * conv[c], 0)
const decToSnafu = s => {
  let out = []
  let num = s
  while (num > 0) {
    const r = num % 5
    switch (r) {
      case 4:
        out.push('-')
        num += 1
        break
      case 3:
        out.push('=')
        num += 2
        break
      default:
        out.push(r.toString())
        break
    }
    num = Math.floor(num / 5)
  }
  return out.reverse().join('')
}

let output = input.map(snafuToDec).reduce((s,c) => s+c, 0)

console.log(decToSnafu(output))