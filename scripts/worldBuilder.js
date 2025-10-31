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
import { wizardHouse } from './worldCards/wizard-house.js'
import { peninsula } from './worldCards/peninsula.js'
import { ocean } from './worldCards/ocean.js'
import { racetrack } from './worldCards/racetrack.js'
import { rubyFort } from './worldCards/ruby-fort.js'
import { Penny } from './penny.js'

let worldBuilder = {}
game.world = {}
game.world.cardGrid = {}
game.world.cardSize = {
    x: 32,
    y: 24
}

worldBuilder.build = () => {
    worldBuilder.addToCardGrid(golemerHouse, 0, 0)
    worldBuilder.addToCardGrid(golemerTunnel, -1, 0)
    
    const mainIslandSize = 5
    const halfSize = Math.floor(mainIslandSize / 2)
    worldBuilder.buildRandom(mainIslandSize)
    worldBuilder.buildRandom(3, {x: halfSize * 2, y: 0}, worldBuilder.secondIslandDeck)
    worldBuilder.addToCardGrid(ocean, 3, 2)
    worldBuilder.addToCardGrid(ocean, 4, 2)
    worldBuilder.addToCardGrid(ocean, 5, 2)
    worldBuilder.addToCardGrid(ocean, 3, -3)
    worldBuilder.addToCardGrid(ocean, 4, -3)
    worldBuilder.addToCardGrid(ocean, 5, -3)
    
    const outerBorderRealms = [desert, ocean, desert, ocean, empty, empty, grassyField]
    worldBuilder.addToCardGrid(desert, -1, -4)
    worldBuilder.outerBorders.forEach(place => {
        worldBuilder.addToCardGrid(outerBorderRealms[Math.floor(Math.random() * outerBorderRealms.length)], place.x, place.y)
    })
    game.setTimer(() => {
        worldBuilder.addToCardGrid(bridge, halfSize, 0)
        worldBuilder.addToCardGrid(peninsula, 2, -1)
    }, 15)
    game.setTimer(() => {
        worldBuilder.addPennies()
    }, 70)
}

worldBuilder.deck = [
    bommakerHouse,
    crater,
    eyeShrine,
    kingsTomb,
    statueHall,
    racetrack,
    rubyFort,
    golemwood,
    desert,
    iceCave,
    greenCave,
    wizardHouse,
    lakeCave,
    sawhouse
]

worldBuilder.outerBorders = [
    {x: -2, y: -4},
    {x: 0, y: -4},
    {x: 1, y: -4},
    {x: 2, y: -4},
    {x: -2, y: 3},
    {x: -1, y: 3},
    {x: 0, y: 3},
    {x: 1, y: 3},
    {x: 2, y: 3},
    {x: 3, y: 3},
    {x: -4, y: -3},
    {x: -4, y: -2},
    {x: -4, y: -1},
    {x: -4, y: 0},
    {x: -4, y: 1},
    {x: -4, y: 1},
    {x: 6, y: -2},
    {x: 6, y: -1},
    {x: 6, y: 1},
    {x: 6, y: 3},
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
    // console.log("Cards needed: ", counter)
    // console.log("Cards available: ", deck.length + 2)
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
        if (!(x === 2 && y === -1)) {
            worldBuilder.addToCardGrid(eastCoast, x, y)
        }
    }
    
    worldBuilder.addToCardGrid(northwestCoast, origin.x, origin.y)
    if (size > 3) {
        worldBuilder.addToCardGrid(northeastCoast, origin.x + size, origin.y)
    } else {
        worldBuilder.addToCardGrid(ocean, origin.x + size, origin.y)
    }
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

worldBuilder.addPennies = () => {
    const possiblePlaces = []
    for (let x = -84; x <= 73; x++) {
        for (let y = -52; y <= 57; y++) {
            const item = game.checkGrid(x, y)
            const groundItem = game.checkGrid(x, y, true).groundOccupant
            if (!item && !groundItem) {
                if (utils.distanceBetweenSquares({x: x, y: y}, game.player.position) > 28) {
                    possiblePlaces.push({x: x, y: y})
                }
            }
        }
    }
    const currentCount = game.pennyCount
    for (let i = 0; i <= (100 - currentCount); i++) {
        const position = possiblePlaces[Math.floor(Math.random() * possiblePlaces.length)]
        new Penny (position.x, position.y)
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
                item.teleport({x: item.spawnPosition.x, y: item.spawnPosition.y})
            }
        }
    }, game.viewport.width)
}

export { worldBuilder }