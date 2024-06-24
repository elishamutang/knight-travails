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

function knightMoves(start, end) {
    console.log(`Start: ${start}, End: ${end}`)

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

    // Return starting point if start === end.
    if (startRow === endRow && startCol === endCol) return start

    // BFS on all adjacent nodes.
    while (queue.length !== 0) {
        let visitedNode = queue.shift()

        // If end position is in visitedNode adjacency list, return the node in checkForAdjNodes array.
        // Else, add each adjacent node from visitedNode adjacency list to the queue.
        let checkForAdjNodes = visitedNode.adjancencies.filter((elem) => {
            if (elem[0] === endRow && elem[1] === endCol) return elem
        })

        // console.log(visitedNode)

        if (checkForAdjNodes.length === 0) {
            if (visitedNode.coordinate[0] !== endRow || visitedNode.coordinate[1] !== endCol) {
                visitedNode.adjancencies.forEach((adjNode) => {
                    queue.push(findElem(adjNode))
                })
            }
        } else {
            // Program will enter here if end node is found in visitedNode adjacency list.

            let prevNodeOfTargetNode = visitedNode

            console.log(`Prev node before end node: ${prevNodeOfTargetNode.coordinate}`)

            console.log(knightMoves(start, prevNodeOfTargetNode.coordinate))

            return checkForAdjNodes.flat()
        }
    }
}

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
        if (c >= 0 && d >= 0 && c < 7 && d < 7) return elem
    })

    allMoves.push(newNode)
}

// Generate all possible moves from every location of the chessboard.
for (let i = 0; i < chessboard.length; i++) {
    for (let j = 0; j < chessboard[i].length; j++) {
        possibleMoves([i, j])
    }
}

console.log(allMoves)

console.log(knightMoves([0, 0], [4, 4]))
// console.log(knightMoves([3, 3], [0, 0]))
// console.log(knightMoves([0, 0], [4, 4]))
