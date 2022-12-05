import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')
  .split(EOL+EOL)
  .map(x => x.split(EOL))


let [setup, instructions] = input

const stacks = setup.slice(0, -1).reduce((stacks, line) => {
  let i = 0
  while (i*4 + 2 <= line.length) {
    if (!stacks[i]) stacks.push([])
    if (line[i*4 + 1] !== " ") stacks[i].push(line[i*4 + 1])
    i++
  }
  return stacks
}, [])

instructions = instructions.map(x => x.split(' ').filter((_, i) => i%2).map(x => +x))

instructions.forEach(([amt, from, to]) => {
  const move = stacks[from-1].splice(0, amt)
  stacks[to-1] = move.concat(stacks[to-1])
})

console.log(stacks.map(s => s[0]).join(''))