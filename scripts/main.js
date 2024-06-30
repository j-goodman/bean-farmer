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

const fullscreenButton = document.getElementById("fullscreen-button")
const saveButton = document.getElementById("save-button")
const loadButton = document.getElementById("load-button")

fullscreenButton.onclick = () => {
    if(game.canvas.webkitRequestFullScreen) {
        game.canvas.webkitRequestFullScreen();
    } else {
        game.canvas.mozRequestFullScreen();
    }            
}

saveButton.onclick = () => {
    const saveGame = JSON.stringify(game)
    const blob = new Blob([saveGame], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'bean-farmer-save.json'

    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
    URL.revokeObjectURL(url)
};

loadButton.onclick = () => {
    window.game.pause()

    setTimeout(() => {
        window.game.play()
    }, 1000)

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.style.display = 'none'

    input.onchange = (event) => {
        const file = event.target.files[0]
        if (!file) return

        const reader = new FileReader()

        reader.onload = (e) => {
            try {
                const contents = e.target.result
                const loadGame = JSON.parse(contents)
                console.log(loadGame)
            } catch (error) {
                console.error('Error reading the file:', error)
                alert('Error loading file.')
            }
        }

        reader.readAsText(file)
    }

    document.body.appendChild(input)
    input.click()
    input.remove()
};


if (fullscreenButton) {
    fullscreenButton.style.top = (canvas.getBoundingClientRect().y + 25) + "px"
    fullscreenButton.style.right = (
        window.innerWidth -
        canvas.getBoundingClientRect().x -
        canvas.getBoundingClientRect().width +
        25
    ) + "px"
}

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
    // updateHash[game.player.id] = game.player
    
    game.ctx.fillStyle = `rgb(190,170,105)`
    game.ctx.fillRect(0, 0, tileSize * game.viewport.width, tileSize * game.viewport.height);

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
                if (updateHash[entity.id]) {
                    console.log("Doubled entities.")
                    console.log("1")
                    console.log(entity.name)
                    console.log(entity.id)
                    console.log(entity.position)
                    console.log("2")
                    console.log(updateHash[entity.id].name)
                    console.log(updateHash[entity.id].id)
                    console.log(updateHash[entity.id].position)
                }
                updateHash[entity.id] = entity
                drawQueue.push({
                    entity: entity,
                    x: x,
                    y: y
                })
                if (entity.reset) {
                    game.resetHash[entity.id] = entity
                }
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
        if (entity.update) {
            entity.update(game.time - entity.birthday)
        }
    }

    tutorialText()
    game.checkBounds()
}

const tutorialText = () => {
    let text = "Use the W, A, S, and D keys to move."
    if (game.time > 40 && game.time < 200) {
        game.ctx.font = "80px Pangolin";
        game.ctx.textAlign = "center"
        game.ctx.fillStyle = "#56cefd";
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
    if (entity.name === "fire" && entity.fuel <= 1) {
        game.ctx.globalAlpha = .5 + Math.random() / 3
    }
    if (entity.immobile) {
        entity.spritePosition = {
            x: entity.position.x, y: entity.position.y
        }
    }
    try {
        if (!imageName) {
            imageName = sprite.defaultImage
            console.log("!!!")
            console.log("sprite:")
            console.log(sprite)
        }
        game.ctx.drawImage(game.images[imageName], (entity.spritePosition.x + entity.spriteOffset.x - game.viewport.origin.x) * tileSize, (entity.spritePosition.y + entity.spriteOffset.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
        if (sprite.overlay) {
            let expansionFactor = 2
            let fillOffset = 1
            if (entity.lockable) {
                expansionFactor = 1
                fillOffset = 0
            }
            game.setTimer(() => {
                game.ctx.drawImage(
                    game.images[sprite.overlay],
                    (entity.spritePosition.x - fillOffset + entity.spriteOffset.x - game.viewport.origin.x) * tileSize,
                    (entity.spritePosition.y - fillOffset + entity.spriteOffset.y - game.viewport.origin.y) * tileSize, tileSize * expansionFactor,
                    tileSize * expansionFactor
                )
            }, 0)
        }
    } catch {
        console.error(`Image error:`, imageName)
        console.log(entity)
        console.log(entity.sprite)
        console.log("entity.sprite.version:", entity.sprite.version)
        console.log(game.images[imageName])
    }
    game.ctx.globalAlpha = 1
    if (entity.overlayExists) {
        if (!entity.overlayHeight) {
            entity.overlayHeight = 1
        }
        if (!entity.overlayOffset) {
            entity.overlayOffset = {x: 0, y: 0}
        }
        game.ctx.drawImage(
            game.images[entity.overlay[entity.overlayCycle]],
            (entity.spritePosition.x + entity.spriteOffset.x - game.viewport.origin.x) * tileSize + entity.overlayOffset.x,
            (entity.spritePosition.y + entity.spriteOffset.y - game.viewport.origin.y) * tileSize + entity.overlayOffset.y,
            tileSize,
            tileSize * entity.overlayHeight
        )
        entity.overlayCycle += 1
        if (entity.overlayCycle >= entity.overlay.length) {
            if (entity.overlayLoop) {
                entity.overlayCycle = 0
            } else {
                entity.overlayExists = false
            }
        }
    }
    if (entity.overlayMethod && typeof entity.overlayMethod === "function") {
        entity.overlayMethod()
    }
    if (entity.equipped) {
        utils.drawEquipped(entity)
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