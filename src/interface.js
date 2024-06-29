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
    chessboardCon.addEventListener('mouseover', (e) => {
        if (Array.from(e.target.classList).includes('box')) {
            const coord = e.target.id.split(',').map((elem) => {
                return parseInt(elem)
            })

            locationHover.querySelector('p').textContent = 'You are hovering on:'

            // Display at menu left of the chessboard.
            location.textContent = `[${coord[0]}, ${coord[1]}]`
        }
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
    const knightStartPoint = document.getElementById(`${startSelect.value}`)
    knightStartPoint.className += ' starting'

    const knightImg = document.createElement('img')
    knightImg.id = 'knight'
    knightImg.src = knight

    knightStartPoint.append(knightImg)

    // Listen to change events for select tags.
    startSelect.addEventListener('change', (e) => {
        console.log(document.getElementById(`${startSelect.value}`))
    })

    endSelect.addEventListener('change', (e) => {})

    // Get input from select tags and generate shortest path when users click 'Show me the way' button.
    const submitBtn = document.getElementById('submitBtn')

    submitBtn.addEventListener('click', (e) => {
        // console.log(document.getElementById(`${startSelect.value}`))

        const startPoint = startSelect.value.split(',').map((num) => parseInt(num))
        const endPoint = endSelect.value.split(',').map((num) => parseInt(num))

        let knightPath = knightMoves(startPoint, endPoint)
        console.log(`You made it in ${knightPath.length - 1} moves! Here's your path:`)
        knightPath.forEach((location) => {
            console.log(location)
        })
    })
}
