import { pigCave } from './worldCards/pig-cave.js'
import { pigVault } from './worldCards/pig-vault.js'
import { jewelMaze } from './worldCards/jewel-maze.js'
import { boulderMaze } from './worldCards/boulder-maze.js'
import { ashMeadow } from './worldCards/ash-meadow.js'
import { devCard } from './worldCards/dev-card.js'
import { cutGrove } from './worldCards/cut-grove.js'
import { flowerCave } from './worldCards/flower-cave.js'
import { oreClusters } from './worldCards/ore-clusters.js'
import { fireCave } from './worldCards/fire-cave.js'
import { desert } from './worldCards/desert.js'
import { horseshoeField } from './worldCards/horseshoe-field.js'
import { golemerHouse } from './worldCards/golemer-house.js'
import { golemerTunnel } from './worldCards/golemer-tunnel.js'
import { grassyField } from './worldCards/grassy-field.js'
import { utils } from './utils.js'

let worldBuilder = {}
game.world = {}
game.world.cardGrid = {}
game.world.cardSize = {
    x: 32,
    y: 24
}

worldBuilder.build = () => {
    // worldBuilder.addToCardGrid(devCard, 0, 0)
    worldBuilder.addToCardGrid(golemerHouse, 0, 0)
    worldBuilder.addToCardGrid(golemerTunnel, -1, 0)
    worldBuilder.addToCardGrid(grassyField, 0, -1)
    worldBuilder.addToCardGrid(jewelMaze, -1, -1)
    worldBuilder.addToCardGrid(cutGrove, -1, -2)
    worldBuilder.addToCardGrid(oreClusters, 1, -1)
    worldBuilder.addToCardGrid(boulderMaze, 0, 1)
    worldBuilder.addToCardGrid(ashMeadow, 2, -1)
    worldBuilder.addToCardGrid(desert, 1, 1)
    worldBuilder.addToCardGrid(grassyField, 0, -2)
    worldBuilder.addToCardGrid(desert, -2, 0)
    worldBuilder.addToCardGrid(desert, 0, -2)

    // worldBuilder.addToCardGrid(pigCave, -1, 0)
    // worldBuilder.addToCardGrid(flowerCave, 0, 1)
    // worldBuilder.addToCardGrid(pigVault, -1, 1)
    // worldBuilder.addToCardGrid(fireCave, 1, 1)
}

worldBuilder.addToCardGrid = (card, x, y) => {
    let cardGrid = game.world.cardGrid
    if (cardGrid[x]) {
        cardGrid[x][y] = card
        card.addToWorld((x * game.world.cardSize.x) - Math.round(game.world.cardSize.x / 4), (y * game.world.cardSize.y) -  - Math.round(game.world.cardSize.y / 4))
    } else {
        cardGrid[x] = {}
        worldBuilder.addToCardGrid(card, x, y)
    }
}

game.updateWorldGrid = () => {
    // let origin = game.viewport.origin
    // let activeCardCoords = {
    //     x: Math.floor(origin.x / game.world.cardSize.x),
    //     y: Math.floor(origin.y / game.world.cardSize.y)
    // }
}

game.updateResets = () => {
    game.setTimer(() => {
        let resetHash = game.resetHash
        for (const key in resetHash) {
            const item = resetHash[key]
            if (!item.spawnPosition) {
                return false
            }
            if (!(
                item.position.x === item.spawnPosition.x &&
                item.position.y === item.spawnPosition.y
            ) && !(
                item.spawnPosition.x > game.viewport.origin.x &&
                item.spawnPosition.x < game.viewport.origin.x + game.viewport.width &&
                item.spawnPosition.y > game.viewport.origin.y &&
                item.spawnPosition.y < game.viewport.origin.y + game.viewport.height
            ) && !(
                item.position.x > game.viewport.origin.x &&
                item.position.x < game.viewport.origin.x + game.viewport.width &&
                item.position.y > game.viewport.origin.y &&
                item.position.y < game.viewport.origin.y + game.viewport.height
            ) && (
                utils.distanceBetweenSquares(item.position, game.player.position) >= 16
            )) {
                item.teleport(item.spawnPosition.x, item.spawnPosition.y)
            }
        }
    }, game.viewport.width)
}

export { worldBuilder }