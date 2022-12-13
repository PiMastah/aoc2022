import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL+EOL).map(p => p.split(EOL).map(x => eval(x)))

const compare = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') return a<b ? true : a>b ? false : undefined
  if (typeof a === typeof b) {
    let i = 0
    while (i < a.length && i < b.length) {
      const r = compare(a[i], b[i])
      if (undefined !== r) return r
      i++
    }

    if (a.length < b.length) return true
    if (a.length > b.length) return false

    return undefined
  } else {
    return compare(typeof a === 'number' ? [a] : a, typeof b === 'number' ? [b] : b)
  }
}

const p1 = [[2]]
const p2 = [[6]]

const packets = [...input.flatMap(x => x),p1, p2]

packets.sort((a, b) => compare(a,b) ? -1 : 1)

console.log((packets.indexOf(p1)+1) * (packets.indexOf(p2)+1))