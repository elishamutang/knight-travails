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
            box.id = `box-${j}`

            if (j % 2 === 0 && i % 2 === 0) {
                box.style.background = 'black'
            }

            if (j % 2 !== 0 && i % 2 !== 0) {
                box.style.background = 'black'
            }

            row.append(box)
        }
    }
}
