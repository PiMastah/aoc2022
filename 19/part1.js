import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(bp => bp.split(' ')).map(parts => [
    +parts[1].slice(0, -1),
    +parts[6],
    +parts[12],
    [+parts[18],+parts[21]],
    [+parts[27],+parts[30]]
  ])

const r = {
  'ore':0,'clay':1,'obs':2,'geode':3
}

const simulateBP = (bp, [timeleft, resources, robots]) => {
  if (timeleft == 0) return resources[3]
  const nextStates = []
  const nextOreBotTurns = Math.max(0, Math.ceil((bp[1]-resources[0]) / robots[0]))
  const nextClayBotTurns = Math.max(0, Math.ceil((bp[2]-resources[0]) / robots[0]))
  const nextObsBotTurns = Math.max(0, Math.ceil((bp[3][0]-resources[0]) / robots[0]), Math.ceil((bp[3][1]-resources[1]) / robots[1]))
  const nextGeodeBotTurns = Math.max(0, Math.ceil((bp[4][0]-resources[0]) / robots[0]), Math.ceil((bp[4][1]-resources[2]) / robots[2]))

  if (timeleft - nextOreBotTurns > 1) {
    const caseResources = resources.map((r, i) => r + robots[i] * (1+nextOreBotTurns))
    caseResources[0] -= bp[1]
    const caseRobots = robots.map(r => r)
    caseRobots[0] += 1
    nextStates.push([timeleft-nextOreBotTurns-1, caseResources, caseRobots])
  }
  if (timeleft - nextClayBotTurns > 1) {
    const caseResources = resources.map((r, i) => r + robots[i] * (1+nextClayBotTurns))
    caseResources[0] -= bp[2]
    const caseRobots = robots.map(r => r)
    caseRobots[1] += 1
    nextStates.push([timeleft-nextClayBotTurns-1, caseResources, caseRobots])
  }
  if (timeleft - nextObsBotTurns > 1) {
    const caseResources = resources.map((r, i) => r + robots[i] * (1+nextObsBotTurns))
    caseResources[0] -= bp[3][0]
    caseResources[1] -= bp[3][1]
    const caseRobots = robots.map(r => r)
    caseRobots[2] += 1
    nextStates.push([timeleft-nextObsBotTurns-1, caseResources, caseRobots])
  }
  if (timeleft - nextGeodeBotTurns > 1) {
    const caseResources = resources.map((r, i) => r + robots[i] * (1+nextGeodeBotTurns))
    caseResources[0] -= bp[4][0]
    caseResources[2] -= bp[4][1]
    const caseRobots = robots.map(r => r)
    caseRobots[3] += 1
    nextStates.push([timeleft-nextGeodeBotTurns-1, caseResources, caseRobots])
  }


  if ([nextOreBotTurns, nextClayBotTurns, nextObsBotTurns, nextGeodeBotTurns].every(x => x > timeleft || timeleft == 1 && x < 2)) {
    return resources[3] + (timeleft * robots[3])
  }

  return nextStates
}

let globalMax = 0
const res = []
for (let idx = 0; idx < input.length; idx ++) {
  const bp = input[idx]
  const initialState = [24, [0,0,0,0], [1,0,0,0]]

  const q = [initialState]

  let localMax = -Infinity

  while (q.length > 0) {
    const next = q.pop()
    const nextStates = simulateBP(bp, next)

    if (nextStates.length === undefined) {
      if (nextStates > localMax) {
        localMax = nextStates
      }
    } else {
      q.push(...nextStates.filter(([timeleft, resources, robots]) => {
        let potential = robots[3] * timeleft + resources[3]
        for (let i = timeleft-1;i>0;i--) {
          potential += i
        }
        return potential >= localMax
      }))
    }
  }

  globalMax = Math.max(globalMax, localMax)
  res.push(localMax)
}

console.log(res.reduce((s,c,i) => s + c*(i+1), 0))