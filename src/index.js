import styles from './styles.css'
import knightMoves from './knightTravails.js'
import generateDOM from './interface.js'

let result = knightMoves([0, 0], [2, 2])

console.log(`You made it in ${result.length - 1} moves! Here's your path:`)
result.forEach((location) => {
    console.log(location)
})

generateDOM()
