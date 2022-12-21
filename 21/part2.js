import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => {
    const p = l.split(': ')

    return {
      n: p[0],
      j: p[1]
    }
  }).reduce((d, m) => {
    d[m.n] = m.j
    return d
  }, {})

const root = input['root']

const comp = [root.split(' ')[0], root.split(' ')[2]].map(initial => {
  let s = initial
  const matches = [initial]
  let stopped = false

  while (!stopped) {
    const next = matches.pop()
    const monkeyString = input[next]

    if (next == 'humn') {
      matches.unshift(next)
      continue
    }

    if (parseInt(monkeyString, 10) != monkeyString) {
      matches.push(monkeyString.split(' ')[0], monkeyString.split(' ')[2])
    }

    s = s.replaceAll(next, `(${monkeyString})`)

    if (matches.length == 1 && matches[0] == 'humn' || matches.length == 0) stopped = true
  }

  return s
})

const scalarIdx = comp.findIndex(v => v.indexOf('humn') === -1)

const t = eval(comp[scalarIdx])
const v = eval(`humn => ${comp[-scalarIdx+1]} - ${t}`)

let guessLow = -Math.pow(2, 64)
let guessHigh = Math.pow(2, 64)

while (true) {
  const vGuessLow = v(guessLow)
  const vGuessHigh = v(guessHigh)

  if (vGuessLow == 0) {
    console.log(guessLow)
    break
  }

  if (vGuessHigh == 0) {
    console.log(guessHigh)
    break
  }

  const avg = Math.floor((guessLow + guessHigh)/2)
  const vAvg = v(avg)

  if (vAvg === 0) {
    console.log(avg)
    break
  }

  if (vAvg < 0) {
    guessHigh = avg+1
  } else {
    guessLow = avg
  }
}