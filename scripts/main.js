import { Player } from './player.js'

import { game } from './game.js';
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
            game.ctx.fillStyle = `rgba(100,140,70,${square.soilHealth})` // grass
            game.ctx.fillRect((x - game.viewport.origin.x) * tileSize, (y - game.viewport.origin.y) * tileSize, tileSize, tileSize);
            game.ctx.fillStyle = `rgba(60,45,90,${square.soilToxicity * square.soilToxicity})` // poison
            game.ctx.fillRect((x - game.viewport.origin.x) * tileSize, (y - game.viewport.origin.y) * tileSize, tileSize, tileSize);
        }
    }

    if (game.displayHealth > 0) {
        game.drawHealth()
    }
    
    for (let x = game.viewport.origin.x - width; x < game.viewport.origin.x + width + width; x++) {
        for (let y = game.viewport.origin.y - height; y < game.viewport.origin.y + height + height; y++) {
            let entity = game.checkGrid(x, y)
            if (entity) {
                const sprite = game.checkGrid(x, y).sprite
                const imageName = sprite.image
                updateHash[entity.id] = entity
                try {
                    game.ctx.drawImage(game.images[imageName], (entity.spritePosition.x + entity.spriteOffset.x - game.viewport.origin.x) * tileSize, (entity.spritePosition.y + entity.spriteOffset.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
                    if (entity.overlayExists) {
                        game.ctx.drawImage(game.images[entity.overlay[entity.overlayCycle]], (entity.spritePosition.x + entity.spriteOffset.x - game.viewport.origin.x) * tileSize, (entity.spritePosition.y + entity.spriteOffset.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
                        entity.overlayCycle += 1
                        if (entity.overlayCycle >= entity.overlay.length) {
                            entity.overlayExists = false
                        }
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
                        }
                    }
                }
            }
        }
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
        game.ctx.fillStyle = "#fff";
        game.ctx.fillText(text, 350, canvas.height / 2.2);
    }
}

const checkImageLoad = () => {
    if (loadedImages === totalImages) {
        game.play()
    }
}