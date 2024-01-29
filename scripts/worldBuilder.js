import { pigCave } from './worldCards/pig-cave.js'
import { flowerCave } from './worldCards/flower-cave.js'
import { desert } from './worldCards/desert.js'

let worldBuilder = {}
game.world = {}
game.world.cardGrid = {}

worldBuilder.build = () => {
    worldBuilder.addToCardGrid(pigCave, 0, 0)
    worldBuilder.addToCardGrid(flowerCave, 0, 1)
    worldBuilder.addToCardGrid(desert, 1, 0)
}

worldBuilder.addToCardGrid = (card, x, y) => {
    let cardGrid = game.world.cardGrid
    card.addToWorld(x * 24, y * 18)
    if (cardGrid[x]) {
        cardGrid[x][y] = card
    } else {
        cardGrid[x] = {}
        worldBuilder.addToCardGrid(card, x, y)
    }
}

game.updateWorldGrid = () => {
    let origin = game.viewport.origin
    let activeCardCoords = {
        x: Math.floor(origin.x / 24),
        y: Math.floor(origin.y / 18)
    }
}

export { worldBuilder }