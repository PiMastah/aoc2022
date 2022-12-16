import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' ').filter((_, i) => i > 8 || [1, 4].includes(i)))

const valves = input.reduce((v, c) => {
  v[c[0]] = {
    rate: +c[1].split('=')[1].slice(0, -1),
    connections: c.slice(2).map(x => x.substring(0, 2)),
    open: false,
    openedAt: Infinity
  }
  return v
}, {})

const copyValves = valves => {
  return Object.entries(valves).reduce((v, [c, values]) => {
      v[c] = {...values}
      return v
  }, {})
}

const dists = {}
let bestFlow = 0

Object.keys(valves).forEach(start => {
  dists[start] = {}
  let distQ = [start]

  let currentDist = 0

  while (distQ.length > 0) {
    const next = []
    distQ.forEach(n => {
      if (dists[start][n] === undefined) {
        dists[start][n] = currentDist
        next.push(...valves[n].connections)
      }
    })
    distQ = next
    currentDist++
  }
})

Object.keys(valves).forEach(k => {
  if (valves[k].rate == 0) delete valves[k]
})

const explore = ([currentPos, unopenedValves, timeleft, totalFlow, flowRate]) => {
  const nextStates = []

  if (timeleft <= 0) {
    bestFlow = Math.max(bestFlow, totalFlow)
    return []
  }

  unopenedValves.forEach(other => {
    const dist = dists[currentPos][other] + 1
    const arrival = timeleft-dist
    if (arrival > 0) {
      nextStates.push([other, unopenedValves.filter(x => x!== other), timeleft-dist, totalFlow + flowRate * dist, flowRate + valves[other].rate])
    } else {
      nextStates.push([other, unopenedValves, 0, totalFlow + flowRate * timeleft, flowRate])
    }
  })

  if (unopenedValves.length === 0) {
    nextStates.push([currentPos, [], 0, totalFlow + flowRate * timeleft, flowRate])
  }

  return nextStates
}

const l = Object.keys(valves).length
const e = Math.pow(2, l)

let max = 0

for (let i = 0; i < e; i++) {
  const mask = (i >>> 0).toString(2).padStart(l-1, '0').split('')

  const selectedValves1 = Object.keys(valves).filter((_, i) => mask[i] == '1')
  const selectedValves0 = Object.keys(valves).filter((_, i) => mask[i] == '0')

  const q1 = [['AA', selectedValves1, 26, 0, 0]]
  const q2 = [['AA', selectedValves0, 26, 0, 0]]

  let iterationflow = 0

  bestFlow = 0
  while (q1.length > 0) {
    const r  = explore(q1.pop())
    q1.push(...r)
  }
  iterationflow += bestFlow

  bestFlow = 0
  while (q2.length > 0) {
    const r  = explore(q2.pop())
    q2.push(...r)
  }
  iterationflow += bestFlow

  if (max < iterationflow) {
    max = iterationflow
  }
}

console.log(max)