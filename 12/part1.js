import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(''))

const startY = input.findIndex(l => l.includes('S'))
const startX = input[startY].findIndex(x => x == 'S')

const endY = input.findIndex(l => l.includes('E'))
const endX = input[startY].findIndex(x => x == 'E')

const top=0,parent=t=>(t+1>>>1)-1,left=t=>(t<<1)+1,right=t=>t+1<<1;class PriorityQueue{constructor(t=(t,e)=>t>e){this._heap=[],this._comparator=t}size(){return this._heap.length}isEmpty(){return 0==this.size()}peek(){return this._heap[top]}push(...t){return t.forEach(t=>{this._heap.push(t),this._siftUp()}),this.size()}pop(){let t=this.peek(),e=this.size()-1;return e>top&&this._swap(top,e),this._heap.pop(),this._siftDown(),t}replace(t){let e=this.peek();return this._heap[top]=t,this._siftDown(),e}_greater(t,e){return this._comparator(this._heap[t],this._heap[e])}_swap(t,e){[this._heap[t],this._heap[e]]=[this._heap[e],this._heap[t]]}_siftUp(){for(let t=this.size()-1;t>top&&this._greater(t,parent(t));)this._swap(t,parent(t)),t=parent(t)}_siftDown(){for(let t,e=top;left(e)<this.size()&&this._greater(left(e),e)||right(e)<this.size()&&this._greater(right(e),e);)t=right(e)<this.size()&&this._greater(right(e),left(e))?right(e):left(e),this._swap(e,t),e=t}}

const toExplore = new PriorityQueue((a, b) => a[2] < b[2])

const neighbours = (x, y) => {
  const n = []

  if (x > 0) n.push([x-1, y])
  if (y > 0) n.push([x, y-1])
  if (x < input[0].length-1) n.push([x+1, y])
  if (y < input.length-1) n.push([x, y+1])

  return n
}

const specials = {'S': 'a', 'E': 'z'}
let bestDist = Infinity
const visited = {}

toExplore.push([startX, startY, 0, ''])

while (!toExplore.isEmpty()) {
  const [x, y, steps, h] = toExplore.pop()

  if (steps >= bestDist) {
    continue
  }

  if (visited[`${x}-${y}`] !== undefined && (visited[`${x}-${y}`][0] <= steps)) continue

  visited[`${x}-${y}`] = [steps, h]

  const currentHeight = specials[input[y][x]] ?? input[y][x]

  if (input[y][x] == 'E') {
    bestDist = Math.min(steps, bestDist)
    continue
  }

  const newNeighbours = neighbours(x,y)
    .filter(([nx, ny]) => (input[ny][nx].charCodeAt(0) == 69 ? 122 : input[ny][nx].charCodeAt(0)) - currentHeight.charCodeAt(0) < 2)

  if (newNeighbours.length == 0) {
    continue
  }

  newNeighbours
    .forEach(n => toExplore.push([n[0], n[1], steps + 1, h + `||${x}-${y}`]))
}

console.log(bestDist)