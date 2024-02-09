import { pigCave } from './worldCards/pig-cave.js'
import { jewelMaze } from './worldCards/jewel-maze.js'
import { devCard } from './worldCards/dev-card.js'
import { flowerCave } from './worldCards/flower-cave.js'
import { fireCave } from './worldCards/fire-cave.js'
import { desert } from './worldCards/desert.js'

let worldBuilder = {}
game.world = {}
game.world.cardGrid = {}
game.world.cardSize = {
    x: 32,
    y: 24
}

worldBuilder.build = () => {
    // worldBuilder.addToCardGrid(devCard, 0, 0)
    worldBuilder.addToCardGrid(pigCave, 0, 0)
    worldBuilder.addToCardGrid(flowerCave, 0, 1)
    worldBuilder.addToCardGrid(fireCave, 1, 1)
    worldBuilder.addToCardGrid(jewelMaze, 2, 1)
    worldBuilder.addToCardGrid(desert, -1, 1)
    worldBuilder.addToCardGrid(desert, 0, -1)
}

worldBuilder.addToCardGrid = (card, x, y) => {
    let cardGrid = game.world.cardGrid
    card.addToWorld((x * game.world.cardSize.x) - Math.round(game.world.cardSize.x / 4), (y * game.world.cardSize.y) -  - Math.round(game.world.cardSize.y / 4))
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
        x: Math.floor(origin.x / game.world.cardSize.x),
        y: Math.floor(origin.y / game.world.cardSize)
    }
}

export { worldBuilder }