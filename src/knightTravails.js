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

// Generates shortest pathway from start to end of a knight piece.
export default function knightMoves(start, end) {
    // Returns position object.
    const findElem = (elem) => {
        let [a, b] = elem

        let [foundElem] = allMoves.filter((position) => {
            if (position.coordinate[0] === a && position.coordinate[1] === b) return position
        })

        return foundElem
    }

    // Initiate the queue.
    let queue = [findElem(start)]

    let [startRow, startCol] = start
    let [endRow, endCol] = end

    // If start or end positions are "off" the chessboard, return error.
    if (startRow < 0 || startRow > 7 || endRow < 0 || endCol > 7) throw new Error('Out of bounds.')

    // Return starting point if start === end.
    if (startRow === endRow && startCol === endCol) return [start]

    // BFS on all adjacent nodes.
    const trackSeq = () => {
        while (queue.length !== 0) {
            let visitedNode = queue.shift()

            // If end position is in visitedNode adjacency list, return the node in checkForAdjNodes array.
            let checkAdjNodes = visitedNode.adjancencies.filter((elem) => {
                if (elem[0] === endRow && elem[1] === endCol) return elem
            })

            // Else, add each adjacent nodes from visitedNode adjacency list to the queue and loop.
            if (checkAdjNodes.length === 0) {
                visitedNode.adjancencies.forEach((adjNode) => {
                    queue.push(findElem(adjNode))
                })
            } else {
                // If end position is found, program enters here.
                let sequence = knightMoves(start, visitedNode.coordinate)

                sequence.push(checkAdjNodes.flat())
                return sequence
            }
        }
    }

    return trackSeq()
}

// Store all possible moves at each location on chessboard inside allMoves array.
let allMoves = []

// Generates all possible moves from any location on the chessboard.
const possibleMoves = (start) => {
    let [a, b] = start
    let newNode = new node(start)

    // A total of 8 different moves can be done.
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

        // Return locations where it does not go "off" the board.
        if (c >= 0 && d >= 0 && c < 8 && d < 8) return elem
    })

    allMoves.push(newNode)
}

// Generate all possible moves from every location of the chessboard.
// The chessboard will be such that the 0th row is at the bottom (last row), hence we start from 7 and decrease from there.
for (let i = 7; i >= 0; i--) {
    for (let j = 0; j <= 7; j++) {
        possibleMoves([i, j])
    }
}
