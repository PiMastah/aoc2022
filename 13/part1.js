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

console.log(input.map((p, i) => compare(p[0], p[1]) ? i+1 : 0).reduce((s,c) => s + c, 0))