import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => {
    const p = l.split(': ')

    return {
      n: p[0],
      j: (p[1] == parseInt(p[1], 10) ? parseInt(p[1], 10) : p[1].split(' '))
    }
  })

const q = input
const v = {}

while (q.length > 0) {
  const c = q.pop()

  if (typeof c.j == 'object') {
    if (v[c.j[0]] !== undefined && v[c.j[2]] !== undefined) {
      v[c.n] = eval(`${v[c.j[0]]} ${c.j[1]} ${v[c.j[2]]}`)
    } else {
      q.unshift(c)
    }
  } else {
    v[c.n] = c.j
  }
}

console.log(v['root'])