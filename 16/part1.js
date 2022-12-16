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

const q = [['AA', Object.keys(valves).filter(v => valves[v].rate > 0), 30, 0, 0]]

const dists = {}

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

let bestFlow = 0

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

while (q.length > 0) {
  const r  = explore(q.pop())
  q.push(...r)
}

console.log(bestFlow)