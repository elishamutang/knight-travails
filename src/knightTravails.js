// Set up chess gameboard.
const chessboard = Array(8)
    .fill(0)
    .map((elem) => {
        elem = Array(8)

        for (let i = 0; i < elem.length; i++) {
            elem[i] = i
        }

        return elem
    })

console.log('Chessboard')
console.log(chessboard)

function knightMoves() {
    // Build adjacency list. We can represent the relationship between each vertex and its adjacent nodes (neighbours) by using a BST.
    // The basic move of a knight is two steps forward and one step to the side or one step to the side and 2 steps forwards.

    let adjacencyMatrix = Array(8)
        .fill(0)
        .map((elem) => {
            elem = Array(8).fill(0)

            return elem
        })

    // Need to fill the matrix with 1s if it is a possible move.
    adjacencyMatrix[1][2] = 1
    adjacencyMatrix[2][1] = 1
    adjacencyMatrix[2][4] = 1
    adjacencyMatrix[0][4] = 1
    adjacencyMatrix[4][0] = 1
    adjacencyMatrix[4][2] = 1

    console.log('Adj matrix')
    console.log(adjacencyMatrix)
}

knightMoves()
