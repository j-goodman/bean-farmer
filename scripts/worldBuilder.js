import { pigCave } from './worldCards/pig-cave.js'
import { pigVault } from './worldCards/pig-vault.js'
import { jewelMaze } from './worldCards/jewel-maze.js'
import { boulderMaze } from './worldCards/boulder-maze.js'
import { greenCave } from './worldCards/green-cave.js'
import { ashMeadow } from './worldCards/ash-meadow.js'
import { temple } from './worldCards/temple.js'
import { devCard } from './worldCards/dev-card.js'
import { cutGrove } from './worldCards/cut-grove.js'
import { flowerCave } from './worldCards/flower-cave.js'
import { oreClusters } from './worldCards/ore-clusters.js'
import { fireCave } from './worldCards/fire-cave.js'
import { desert } from './worldCards/desert.js'
import { horseshoeField } from './worldCards/horseshoe-field.js'
import { stoneCorridor } from './worldCards/stone-corridor.js'
import { rubyCanyon } from './worldCards/ruby-canyon.js'
import { bommakerHouse } from './worldCards/bommaker-house.js'
import { sulfurMine } from './worldCards/sulfur-mine.js'
import { golemerHouse } from './worldCards/golemer-house.js'
import { golemerTunnel } from './worldCards/golemer-tunnel.js'
import { grassyField } from './worldCards/grassy-field.js'
import { iceCave } from './worldCards/ice-cave.js'
import { gemMine } from './worldCards/gem-mine.js'
import { stashHouse } from './worldCards/stash-house.js'
import { statueHall } from './worldCards/statue-hall.js'
import { redMaze } from './worldCards/red-maze.js'

import { northCoast } from './worldCards/north-coast.js'
import { eastCoast } from './worldCards/east-coast.js'
import { southCoast } from './worldCards/south-coast.js'
import { westCoast } from './worldCards/west-coast.js'
import { northwestCoast } from './worldCards/northwest-coast.js'
import { northeastCoast } from './worldCards/northeast-coast.js'
import { southeastCoast } from './worldCards/southeast-coast.js'
import { southwestCoast } from './worldCards/southwest-coast.js'

import { utils } from './utils.js'
import { lakeCave } from './worldCards/lake-cave.js'
import { devilsCave } from './worldCards/devils-cave.js'
import { lampwood } from './worldCards/lampwood.js'
import { bridge } from './worldCards/bridge.js'
import { lockHold } from './worldCards/lock-hold.js'
import { crater } from './worldCards/crater.js'
import { snakeSkeleton } from './worldCards/snake-skeleton.js'
import { cupGrotto } from './worldCards/cup-grotto.js'
import { golemwood } from './worldCards/golemwood.js'
import { eyeShrine } from './worldCards/eye-shrine.js'
import { spikeFort } from './worldCards/spike-fort.js'
import { kingsTomb } from './worldCards/kings-tomb.js'
import { golemersTomb } from './worldCards/golemers-tomb.js'
import { empty } from './worldCards/empty.js'
import { sawhouse } from './worldCards/sawhouse.js'

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
    
    const mainIslandSize = 5
    const halfSize = Math.floor(mainIslandSize / 2)
    worldBuilder.buildRandom(mainIslandSize)
    worldBuilder.buildRandom(3, {x: halfSize * 2, y: 0}, worldBuilder.secondIslandDeck)
    game.setTimer(() => {
        worldBuilder.addToCardGrid(bridge, halfSize, 0)
    }, 15)
}

worldBuilder.deck = [
    bommakerHouse,
    crater,
    eyeShrine,
    kingsTomb,
    statueHall,
    stashHouse,
    rubyCanyon,
    golemwood,
    lampwood,
    iceCave,
    greenCave,
    ashMeadow,
    lakeCave,
    // // empty,
    sawhouse
    // // sulfurMine,
]

worldBuilder.secondIslandDeck = [
    desert,
    spikeFort,
    snakeSkeleton,
    golemersTomb
]

worldBuilder.buildRandom = (size, offset={x:0, y:0}, altDeck) => {
    const cardGrid = game.world.cardGrid
    
    let deck = utils.shuffle(worldBuilder.deck)
    if (altDeck) {    
        deck = utils.shuffle(altDeck)
    }

    let deckIndex = 0

    worldBuilder.buildCoasts(size, offset)

    let origin = {
        x: 0 - Math.ceil(size / 2) + offset.x,
        y: 0 - Math.ceil(size / 2) + offset.y
    }

    let counter = 0
    for (let x = origin.x + 1; x < origin.x + size; x++) {
        for (let y = origin.y + 1; y < origin.y + size; y++) {
            counter += 1
            if (!cardGrid[x]) {
                cardGrid[x] = {}
            }
            if (!cardGrid[x][y] && deckIndex < deck.length) {
                worldBuilder.addToCardGrid(deck[deckIndex], x, y)
                deckIndex += 1
            }
        }
    }
    console.log("Cards needed: ", counter)
    console.log("Cards available: ", deck.length + 2)
}

worldBuilder.buildCoasts = (size, offset={x: 0, y: 0}) => {
    let origin = {
        x: 0 - Math.ceil(size / 2) + offset.x,
        y: 0 - Math.ceil(size / 2) + offset.y
    }

    let y = origin.y
    for (let x = origin.x + 1; x < origin.x + size; x++) {
        worldBuilder.addToCardGrid(northCoast, x, y)
    }

    y = origin.y + size
    for (let x = origin.x + 1; x < origin.x + size; x++) {
        worldBuilder.addToCardGrid(southCoast, x, y)
    }

    let x = origin.x
    for (let y = origin.y + 1; y < origin.y + size; y++) {
        worldBuilder.addToCardGrid(westCoast, x, y)
    }

    x = origin.x + size
    for (let y = origin.y + 1; y < origin.y + size; y++) {
        worldBuilder.addToCardGrid(eastCoast, x, y)
    }
    
    worldBuilder.addToCardGrid(northwestCoast, origin.x, origin.y)
    worldBuilder.addToCardGrid(northeastCoast, origin.x + size, origin.y)
    worldBuilder.addToCardGrid(southeastCoast, origin.x + size, origin.y + size)
    worldBuilder.addToCardGrid(southwestCoast, origin.x, origin.y + size)
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
                if (item.onReset) {
                    item.onReset()
                }
                item.teleport(item.spawnPosition.x, item.spawnPosition.y)
            }
        }
    }, game.viewport.width)
}

export { worldBuilder }