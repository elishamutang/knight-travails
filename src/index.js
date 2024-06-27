import styles from './styles.css'
import knightMoves from './knightTravails.js'

let result = knightMoves([3, 3], [4, 3])

console.log(`You made it in ${result.length - 1} moves! Here's your path:`)
result.forEach((location) => {
    console.log(location)
})
