import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split(' '))

const Node = (parent, name, size=0) => ({parent, name, children: [], size})

const root = Node(null, '/')

input.reduce((currentNode, line) => {
  switch (true) {
    case line[0] == "$" && line[1] == 'cd':
      if (line[2] == '/') {
        return root
      } else if (line[2] == '..') {
        return currentNode.parent
      } else {
        let newNode = currentNode.children.find(x => x.name == line[2])
        if (!newNode) {
          newNode = Node(currentNode, line[2])
          currentNode.children.append(newNode)
        }
        return newNode
      }
    case line[0] == "$" && line[1] == 'ls':
      return currentNode
    case line[0] == 'dir':
      currentNode.children.push(Node(currentNode, line[1]))
      return currentNode
    default:
      currentNode.children.push(Node(currentNode, line[1], +line[0]))
      return currentNode
  }
}, root)

const dirSizes = {}

const calcSize = (node, path) => {
  if (node.children.length > 0) {
    const size = node.children.map(n => calcSize(n, path+'/'+n.name)).reduce((s,c)=> s+c, 0)
    dirSizes[path] = size
    return size
  }
  if (node.size > 0) {
    return node.size
  }
  return 0
}

calcSize(root, '')

const toDelete = -40000000 + dirSizes['']

console.log(Object.values(dirSizes).reduce((best, c) => c >= toDelete && c < best ? c : best, Infinity))