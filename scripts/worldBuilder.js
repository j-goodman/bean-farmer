import { pigCave } from './worldCards/pig-cave.js'
import { flowerCave } from './worldCards/flower-cave.js'

let worldBuilder = {}
game.world = {}
game.world.cardGrid = {}

worldBuilder.build = () => {
    worldBuilder.cards.forEach((card, i) => {
        card.addToWorld(0, i * 18)
    })
}

worldBuilder.addToCardGrid = (card, x, y) => {
    let cardGrid = game.world.cardGrid
    if (cardGrid[x]) {
        cardGrid[x][y] = card
    } else {
        cardGrid[x] = {}
        worldBuilder.addToCardGrid(card, x, y)
    }
}

worldBuilder.cards = [
    pigCave,
    flowerCave,
]

export { worldBuilder }