import { Player } from './player.js'

import { game } from './game.js';
import { utils } from './utils.js';
import { temporaryWorldSetup } from './temporaryWorldSetup.js'
import { worldBuilder } from './worldBuilder.js'
import { imageLoader } from './imageLoader.js'

// temporaryWorldSetup()
worldBuilder.build()

const tileSize = game.tileSize

// Set canvas size
game.canvas.width = game.viewport.width * tileSize
game.canvas.height = game.viewport.height * tileSize

let totalImages = 0
let loadedImages = 0

const addImage = (name) => {
    const img = new Image()
    img.src = `./assets/${name}.png`
    totalImages += 1
    game.images[name] = img
    img.onload = () => {
        loadedImages += 1
        checkImageLoad()
    }
}

imageLoader(addImage)

game.loop = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    const width = game.viewport.width
    const height = game.viewport.height

    let updateHash = {}
    
    for (let x = game.viewport.origin.x; x < game.viewport.origin.x + width; x++) {
        for (let y = game.viewport.origin.y; y < game.viewport.origin.y + height; y++) {
            let square = game.checkGrid(x, y, true)
            if (!square) {
                continue;
            }
            game.ctx.fillStyle = `rgba(90,140,50,${square.soilHealth})` // grass
            game.ctx.fillRect((x - game.viewport.origin.x) * tileSize, (y - game.viewport.origin.y) * tileSize, tileSize, tileSize);
            game.ctx.fillStyle = `rgba(60,45,90,${square.soilToxicity * square.soilToxicity})` // poison
            game.ctx.fillRect((x - game.viewport.origin.x) * tileSize, (y - game.viewport.origin.y) * tileSize, tileSize, tileSize);
        }
    }

    let groundDrawQueue = []
    let airDrawQueue = []
    let drawQueue = []
    
    for (let x = game.viewport.origin.x - width * 3; x < game.viewport.origin.x + width * 6; x++) {
        for (let y = game.viewport.origin.y - height * 3; y < game.viewport.origin.y + height * 6; y++) {
            let square = game.checkGrid(x, y, true)
            let entity = square.occupant
            let groundEntity = square.groundOccupant
            let airEntity = square.airOccupant
            if (entity) {
                updateHash[entity.id] = entity
                drawQueue.push({
                    entity: entity,
                    x: x,
                    y: y
                })
            }
            if (groundEntity) {
                updateHash[groundEntity.id] = groundEntity
                groundDrawQueue.push({
                    entity: groundEntity,
                    x: x,
                    y: y
                })
            }
            if (airEntity) {
                updateHash[airEntity.id] = airEntity
                airDrawQueue.push({
                    entity: airEntity,
                    x: x,
                    y: y
                })
            }
        }
    }

    groundDrawQueue.forEach(entry => {
        drawEntity(entry.entity, entry.x, entry.y)
    })
    
    drawQueue.forEach(entry => {
        drawEntity(entry.entity, entry.x, entry.y)
    })

    airDrawQueue.forEach(entry => {
        drawEntity(entry.entity, entry.x, entry.y)
    })

    if (game.displayHealth > 0) {
        game.drawHealth()
    }

    game.checkTimer()
    game.time += 1
    game.displayHealth = game.displayHealth > 0 ?
    game.displayHealth - 1 : game.displayHealth

    for (const id in updateHash) {
        let entity = updateHash[id]
        entity.update(game.time - entity.birthday)
    }

    tutorialText()
    game.checkBounds()
}

const tutorialText = () => {
    let text = "Use the W, A, S, and D keys to move."
    if (game.time > 40 && game.time < 200) {
        game.ctx.font = "60px Courier";
        game.ctx.textAlign = "center"
        game.ctx.fillStyle = "#fff";
        game.ctx.fillText(text, canvas.width / 2, canvas.height / 2.2);
    }
}

const checkImageLoad = () => {
    if (loadedImages === totalImages) {
        game.play()
    }
}

const drawEntity = (entity, x, y) => {
    const sprite = entity.sprite
    const imageName = sprite.image
    try {
        if (entity.name === "fire" && entity.fuel <= 1) {
            game.ctx.globalAlpha = .5 + Math.random() / 3
        }
        game.ctx.drawImage(game.images[imageName], (entity.spritePosition.x + entity.spriteOffset.x - game.viewport.origin.x) * tileSize, (entity.spritePosition.y + entity.spriteOffset.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
        game.ctx.globalAlpha = 1
        if (entity.overlayExists) {
            game.ctx.drawImage(game.images[entity.overlay[entity.overlayCycle]], (entity.spritePosition.x + entity.spriteOffset.x - game.viewport.origin.x) * tileSize, (entity.spritePosition.y + entity.spriteOffset.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
            entity.overlayCycle += 1
            if (entity.overlayCycle >= entity.overlay.length) {
                entity.overlayExists = false
            }
        }
        if (entity.equipped) {
            utils.drawEquipped(entity)
        }
    } catch {
        console.error(`Failed to find image: ${imageName}`)
    }
    if (Array.isArray(sprite.versions[sprite.version])) {
        sprite.frame += 1 // Should be based on frame rate multiplier
        sprite.image = sprite.versions[sprite.version][sprite.frame]
        if (sprite.frame >= sprite.versions[sprite.version].length) {
            sprite.frame = 0
            if (sprite.onAnimationFinish) {
                sprite.inTransition = false
                sprite.onAnimationFinish()
                sprite.onAnimationFinish = null
            }
        }
    }
}