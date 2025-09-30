import { game } from './game.js';
import { Color } from './color.js'

const worldMap = {}

worldMap.isOpen = false

worldMap.open = (xOffset=0) => {
    if (!game.player.exists) {
        return null
    }
    game.pause()
    worldMap.cursorIndex = -1
    worldMap.drawMap(xOffset)
    setTimeout(() => {
        worldMap.isOpen = true
    }, 15)
}

worldMap.drawMap = (xOffset = 0) => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
    game.ctx.fillStyle = `#999060`
    game.ctx.fillRect(0, 0, game.tileSize * game.viewport.width, game.tileSize * game.viewport.height)
    let playerLocation = null
    for (let x = -88 + xOffset; x < 128 + xOffset; x++) {
        for (let y = -60; y < 128; y++) {
            const baseColor = new Color(210, 190, 90)
            const healthySoil = new Color(65, 110, 50)
            const toxicSoil = new Color(60, 45, 90)
            const snowySoil = new Color(230, 245, 255)
            const tileColor = new Color (baseColor.red, baseColor.green, baseColor.blue)
            const square = game.checkGrid(x, y, true)
            if (square) {
                tileColor.mixIn(square.soilHealth / 1.25, healthySoil)
                tileColor.mixIn(square.soilToxicity / 1.25, toxicSoil)
                tileColor.mixIn(square.frozenness / 1.25, snowySoil)
            }
            game.ctx.fillStyle = tileColor.rgb()
            game.ctx.fillRect((88 - xOffset + x) * 11, (60 + y) * 11, 11, 11)
            const item = game.checkGrid(x, y)
            const floor = game.checkGrid(x, y, true).groundOccupant
            if (floor && floor.sprite && floor.sprite.image) {
                game.ctx.drawImage(game.images[floor.sprite.image], (88 - xOffset + x) * 11, (60 + y) * 11, 11, 11)
            }
            if (item && item.sprite && item.sprite.image) {
                if (item.name === "player") {
                    playerLocation = {x: x, y: y}
                } else {
                    game.ctx.drawImage(game.images[item.sprite.image], (88 - xOffset+ x) * 11, (60 + y) * 11, 11, 11)
                }
            }
        }
    }
    if (playerLocation) {
        game.ctx.drawImage(game.images["blob-down"], (88 - xOffset + playerLocation.x) * 11 - 20, (60 + playerLocation.y) * 11 - 20, 40, 40)
    }
}

worldMap.close = () => {
    game.play()
    worldMap.isOpen = false
}

export { worldMap }