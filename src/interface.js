import knight from './asset/knight.png'
import knightMoves from './knightTravails.js'

// Generate the chessboard
const generateChessboard = () => {
    const chessboard = Array(8)
        .fill(0)
        .map((row) => {
            row = Array(8).fill(0)
            return row
        })

    return chessboard
}

// Generate DOM.
export default function generateDOM() {
    // Generate chessboard in the DOM.
    let chessboard = generateChessboard()

    const chessboardCon = document.getElementById('container')

    for (let i = chessboard.length - 1; i >= 0; i--) {
        let row = document.createElement('div')
        row.className = 'row'
        row.id = `row-${i}`
        chessboardCon.append(row)

        for (let j = 0; j <= chessboard.length - 1; j++) {
            let box = document.createElement('div')
            box.className = 'box'
            box.id = `${i},${j}`

            if (j % 2 === 0 && i % 2 === 0) {
                box.style.background = 'black'
            } else {
                box.style.background = 'white'
            }

            if (j % 2 !== 0 && i % 2 !== 0) {
                box.style.background = 'black'
            }

            row.append(box)
        }
    }

    // Create a div inside locationHover to show location hovered.
    const locationHover = document.getElementById('locationHover')
    const location = document.createElement('div')
    location.id = 'location'

    locationHover.append(location)

    // HOVER EFFECT (showing locations at each location of chessboard)
    // When user hovers over chessboard, it shows the location in [0,0] form at each box.
    const allBoxes = Array.from(document.getElementsByClassName('box'))

    allBoxes.forEach((box) => {
        box.addEventListener('mouseover', (e) => {
            const coord = e.currentTarget.id.split(',').map((elem) => parseInt(elem))

            locationHover.querySelector('p').textContent = 'You are hovering on:'

            // Display at menu left of the chessboard.
            location.textContent = `[${coord[0]},${coord[1]}]`
        })
    })

    chessboardCon.addEventListener('mouseleave', (e) => {
        locationHover.querySelector('p').textContent = 'You were hovering on:'
    })

    // Allow users to choose a start and end point, then display the path from start to end.
    const allLocations = Array.from(document.getElementsByClassName('box'))
        .map((loc) => {
            return loc.id
        })
        .sort()

    const startSelect = document.getElementById('startPos') // Populate all locations for each dropdown menu for Start and End.
    const endSelect = document.getElementById('endPos')

    allLocations.forEach((loc) => {
        let optionElem = document.createElement('option')
        optionElem.value = loc
        optionElem.textContent = loc

        startSelect.append(optionElem)

        // Need to copy optionElem here and append to End Select tag.
        let optionElemCopy = optionElem.cloneNode(true)

        endSelect.append(optionElemCopy)
    })

    // Initialize [0,0] as starting point. Put knight image at that location.
    let knightStartPoint = document.getElementById(`${startSelect.value}`)
    knightStartPoint.className += ' starting'

    const knightImg = document.createElement('img')
    knightImg.id = 'knight'
    knightImg.src = knight

    knightStartPoint.append(knightImg)

    // Listen to change events for select tags.
    startSelect.addEventListener('change', (e) => {
        // When changing the starting point, remove styling from previous starting point.
        let findOldPoint = Array.from(document.getElementsByClassName('starting'))

        let oldPoint = findOldPoint.shift()
        oldPoint.className = 'box'

        let newStartPoint = document.getElementById(`${startSelect.value}`)
        newStartPoint.className += ' starting'
        newStartPoint.append(knightImg)

        // Remove visited nodes
        removeAllVisitedNodes(startSelect.value)
    })

    endSelect.addEventListener('change', (e) => {})

    // Get input from select tags and generate shortest path when users click 'Show me the way' button.
    const submitBtn = document.getElementById('submitBtn')

    submitBtn.addEventListener('click', () => {
        const startPoint = startSelect.value.split(',').map((num) => parseInt(num))
        const endPoint = endSelect.value.split(',').map((num) => parseInt(num))

        // Move knight starting point if start point has changed from other than [0,0]
        knightStartPoint = document.getElementById(`${startSelect.value}`)
        knightStartPoint.append(knightImg)

        // Remove styling from previously visited nodes.
        removeAllVisitedNodes(startSelect.value)

        // Display result and show the knight moving from each location in the path.
        displayResult(startPoint, endPoint)
    })
}

// Shows shortest path from start to end on the interface.
function displayResult(start, end) {
    const resultDiv = document.getElementById('result')

    let knightPath = knightMoves(start, end)

    // Result heading
    let resultText = document.createElement('h2')

    // Overwrite existing h2 tag if there is one.
    if (Array.from(resultDiv.children).length === 0) {
        resultDiv.append(resultText)
    } else {
        resultText = Array.from(resultDiv.children).filter((elem) => {
            if (elem.tagName === 'H2') return elem
        })[0]
    }

    resultText.innerHTML =
        knightPath.length > 2
            ? `You made it in <span>${knightPath.length - 1}</span> moves! Here's your path:`
            : `You made it in <span>${knightPath.length - 1}</span> move! Here's your path:`

    // Result path, remove older nodes and re-append the latest results.
    Array.from(resultDiv.querySelectorAll('p')).forEach((node) => {
        resultDiv.removeChild(node)
    })

    // Move the knight as the path is generated.
    moveTheKnight(knightPath)
}

function moveTheKnight(knightPath) {
    if (knightPath.length === 0) return

    let knightLoc = knightPath.shift()
    let knightLocElem = document.getElementById(`${knightLoc[0]},${knightLoc[1]}`)

    setTimeout(() => {
        // Generate path and display to user.
        let resultPath = document.createElement('p')
        resultPath.textContent = knightLoc

        document.getElementById('result').append(resultPath)

        // Apply styling to the tiles that has been visited.
        let knightImg = document.getElementById('knight')

        knightLocElem.className += ' visit'
        knightLocElem.append(knightImg)

        moveTheKnight(knightPath)
    }, 1000)
}

function removeAllVisitedNodes(startPoint) {
    const getAllVisitedNodes = Array.from(document.getElementsByClassName('visit'))

    getAllVisitedNodes.forEach((node) => {
        if (node.id !== startPoint) {
            node.className = 'box'
        }
    })
}
