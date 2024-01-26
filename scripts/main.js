import { game } from './game.js';
import { temporaryWorldSetup } from './temporaryWorldSetup.js'

temporaryWorldSetup()

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

addImage("blob-down")
addImage("blob-down-left-1")
addImage("blob-down-left-2")
addImage("blob-left")
addImage("blob-left-up-1")
addImage("blob-left-up-2")
addImage("blob-up")
addImage("blob-right-up-2")
addImage("blob-right-up-1")
addImage("blob-right")
addImage("blob-down-right-2")
addImage("blob-down-right-1")
addImage("blob-hurt-1")
addImage("blob-hurt-2")
addImage("select-box")
addImage("rock")
addImage("boulder")
addImage("ore")
addImage("wooly-pig-up")
addImage("wooly-pig-left-up-0")
addImage("wooly-pig-left-up-1")
addImage("wooly-pig-left-up-2")
addImage("wooly-pig-left-up-3")
addImage("wooly-pig-left-up-4")
addImage("wooly-pig-right")
addImage("wooly-pig-right-up-0")
addImage("wooly-pig-right-up-1")
addImage("wooly-pig-right-up-2")
addImage("wooly-pig-right-up-3")
addImage("wooly-pig-right-up-4")
addImage("wooly-pig-down-right-1")
addImage("wooly-pig-down-right-2")
addImage("wooly-pig-down-right-3")
addImage("wooly-pig-down")
addImage("wooly-pig-left")
addImage("wooly-pig-down-left-1")
addImage("wooly-pig-down-left-2")
addImage("wooly-pig-down-left-3")
addImage("heart")
addImage("blob-red-flash")
addImage("corn-pink")

for (let i = 1; i <= 10; i++) {
    addImage(`wooly-pig-attack-right/${i}`)
}

for (let i = 1; i <= 10; i++) {
    addImage(`wooly-pig-attack-left/${i}`)
}

for (let i = 1; i <= 10; i++) {
    addImage(`wooly-pig-attack-up/${i}`)
}

for (let i = 1; i <= 11; i++) {
    addImage(`wooly-pig-attack-down/${i}`)
}

for (let i = 1; i <= 12; i++) {
    addImage(`rock-break/${i}`)
}

for (let i = 0; i <= 10; i++) {
    addImage(`heart-burst/${i}`)
}

for (let i = 1; i <= 14; i++) {
    addImage(`blob-bubbles/${i}`)
}

const gameLoop = () => {
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
    checkBounds()
}

const tutorialText = () => {
    if (game.time > 40 && game.time < 200) {
        game.ctx.font = "60px Courier";
        game.ctx.fillStyle = "#fff";
        game.ctx.fillText("Use the W, A, S, and D keys to move.", 350, canvas.height / 2.2);
    }
}

const checkBounds = () => {
    if (game.player.position.x >= game.viewport.newOrigin.x + game.viewport.width) {
        game.viewport.newOrigin.x += game.viewport.width
    }
    if (game.player.position.x < game.viewport.newOrigin.x) {
        game.viewport.newOrigin.x -= game.viewport.width
    }
    if (game.player.position.y >= game.viewport.newOrigin.y + game.viewport.height) {
        game.viewport.newOrigin.y += game.viewport.height
    }
    if (game.player.position.y < game.viewport.newOrigin.y) {
        game.viewport.newOrigin.y -= game.viewport.height
    }

    if (game.viewport.origin.x < game.viewport.newOrigin.x) {
        game.viewport.origin.x += 1
    }
    if (game.viewport.origin.x > game.viewport.newOrigin.x) {
        game.viewport.origin.x -= 1
    }
    if (game.viewport.origin.y < game.viewport.newOrigin.y) {
        game.viewport.origin.y += 1
    }
    if (game.viewport.origin.y > game.viewport.newOrigin.y) {
        game.viewport.origin.y -= 1
    }
}

const checkImageLoad = () => {
    if (loadedImages === totalImages) {
        setInterval(gameLoop, 30)
    }
}