import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL+EOL).map(m => m.split(EOL))

const monkeys = input.map(parts => {
  const op = old => {
    return eval(parts[2].split('=')[1])
  }
  return {
    'id': +parts[0].split(' ')[1].slice(0,-1),
    'items': parts[1].split(':')[1].trim().split(', ').map(x => +x),
    op,
    'c': +parts[3].split(' ').at(-1),
    't': +parts[4].split(' ').at(-1),
    'f': +parts[5].split(' ').at(-1),
    'thrown': 0
  }
})

const spp = monkeys.reduce((p, m) => p * m.c, 1)

let rounds = 10000

while (rounds-- > 0) {
  monkeys.forEach(m => {
    m.items.slice(0).forEach(i => {
      const wl = m.op(i) % spp
      m.items.shift()
      if (wl % m.c == 0) {
        monkeys[m.t].items.push(wl)
      } else {
        monkeys[m.f].items.push(wl)
      }
      m.thrown += 1
    })
  })
}

console.log(monkeys.sort((a,b) => b.thrown - a.thrown).slice(0, 2).reduce((p,c) => p*c.thrown, 1))