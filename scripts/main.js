import { Boulder } from './boulder.js';
import { Entity } from './entity.js';
import { Ore } from './ore.js';
import { Player } from './player.js';
import { WoolyPig } from './woolyPig.js';

import { game } from './game.js';

game.player = new Player ("blob-down", 13, 8)

new Entity ("rock", 4, 6)
new Entity ("rock", 5, 6)
new Entity ("rock", 6, 6)
new Entity ("rock", 8, 6)
new Entity ("rock", 9, 6)
new Entity ("rock", 9, 5)
new Entity ("rock", 9, 4)
new Entity ("rock", 9, 2)
new Entity ("rock", 9, 1)

for (let i = 32; i > -46; i--) {
    if (i !== 3) {
        new Entity ("rock", 9, i)
    }
    if (!Math.floor(Math.random() * 15)) {
        new Entity ("rock", 11, i)
    }
    if (!Math.floor(Math.random() * 12)) {
        new Ore ("ore", 9, i)
    }
    if (!Math.floor(Math.random() * 9)) {
        new Entity ("rock", 8, i)
    }
}

new Boulder ("boulder", 3, 5)
new Boulder ("boulder", 4, 4)
new Boulder ("boulder", 5, 2)
new Boulder ("boulder", 6, 4)
new Boulder ("boulder", 7, 3)

new Ore ("ore", 0, 6)

let firstPig = new WoolyPig ("wooly-pig-left", 7, 4)
let secondPig = new WoolyPig ("wooly-pig-left", 8, 5)
new WoolyPig ("wooly-pig-left", 9, 3)
firstPig.birthday = -75
secondPig.birthday = -40

const tileSize = 120

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
addImage("select-box")
addImage("rock")
addImage("boulder")
addImage("ore")
addImage("wooly-pig-up")
addImage("wooly-pig-left-up-1")
addImage("wooly-pig-left-up-2")
addImage("wooly-pig-left-up-3")
addImage("wooly-pig-left-up-4")
addImage("wooly-pig-right")
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

const gameLoop = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    const width = game.viewport.width
    const height = game.viewport.height

    let updateHash = {}
    
    for (let x = game.viewport.origin.x - width; x < game.viewport.origin.x + width + width; x++) {
        for (let y = game.viewport.origin.y - height; y < game.viewport.origin.y + height + height; y++) {
            let entity = game.checkGrid(x, y)
            if (entity) {
                const imageName = game.checkGrid(x, y).sprite.image
                updateHash[entity.id] = entity
                try {
                    game.ctx.drawImage(game.images[imageName], (entity.spritePosition.x - game.viewport.origin.x) * tileSize, (entity.spritePosition.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
                } catch {
                    console.error(`Failed to find image: ${imageName}`)
                }
            }
        }
    }

    game.checkTimer()
    game.time += 1

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