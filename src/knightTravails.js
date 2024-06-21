import mergeSort from 'mergesort-by-eli'
import tree from 'binary-search-tree-by-eli'

// Set up node
function node(data) {
    return {
        coordinate: data,
        adjancencies: [],
    }
}

// Set up chess gameboard.
const chessboard = Array(8)
    .fill(0)
    .map((elem) => {
        elem = Array(8)

        return elem.fill(0)
    })

console.log('Chessboard')
console.log(chessboard)

function knightMoves() {
    // Build adjacency list. We can represent the relationship between each vertex and its adjacent nodes (neighbours) by using a BST.
    // The basic move of a knight is two steps forward and one step to the side or one step to the side and 2 steps forwards.

    let allMoves = []

    const possibleMoves = (start) => {
        let [a, b] = start
        let newNode = new node(start)

        newNode.adjancencies.push([a + 1, b + 2])
        newNode.adjancencies.push([a + 2, b + 1])
        newNode.adjancencies.push([a - 1, b - 2])
        newNode.adjancencies.push([a - 2, b - 1])
        newNode.adjancencies.push([a - 1, b + 2])
        newNode.adjancencies.push([a - 2, b + 1])
        newNode.adjancencies.push([a + 1, b - 2])
        newNode.adjancencies.push([a + 2, b - 1])

        newNode.adjancencies = newNode.adjancencies.filter((elem) => {
            let [c, d] = elem

            if (c >= 0 && d >= 0 && c < 7 && d < 7) return elem
        })

        allMoves.push(newNode)
    }

    // Gather all possible moves from every location of the chessboard.
    for (let i = 0; i < chessboard.length; i++) {
        for (let j = 0; j < chessboard[i].length; j++) {
            possibleMoves([i, j])
        }
    }

    console.log(allMoves)
}

knightMoves()
