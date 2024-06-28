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

    // When user hovers over chessboard, it shows the location in [0,0] form at each box.
    chessboardCon.addEventListener('mouseover', (e) => {
        if (e.target.className === 'box') {
            const coord = e.target.id.split(',').map((elem) => {
                return parseInt(elem)
            })

            // Display at menu left of the chessboard.
            location.textContent = `[${coord[0]}, ${coord[1]}]`
        }
    })

    // Allow users to choose a start and end point, then display the path from start to end.
}
