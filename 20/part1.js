import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(x => +x)

const l = input.length

const nodes = input.map((v, i) => ({
  v,
  i,
  prev: undefined,
  next: undefined
}))

nodes.forEach((n, i) => {
  nodes[i].prev = nodes[(i+l-1)%l]
  nodes[i].next = nodes[(i+l+1)%l]
})

for (let i = 0; i < l; i++) {
  const nN = nodes.find(n => n.i === i)

  nN.prev.next = nN.next
  nN.next.prev = nN.prev

  let move = nN.v % (l-1)
  if (move < 0) move += l-1

  while (move-- > 0) {
    nN.next = nN.next.next
  }
  nN.prev = nN.next.prev

  nN.prev.next = nN
  nN.next.prev = nN
}

const zero = nodes.find(n => n.v === 0)

let sum = 0
let c = zero

for (let i = 1;i<3001;i++) {
  c = c.next
  if (i % 1000 === 0) {
    sum += c.v
  }
}

console.log(sum)