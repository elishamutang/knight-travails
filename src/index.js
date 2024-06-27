import styles from './styles.css'
import knightMoves from './knightTravails.js'

let result = knightMoves([7, 0], [7, 7])

console.log(`You made it in ${result.length - 1} moves! Here's your path:`)
result.forEach((location) => {
    console.log(location)
})
