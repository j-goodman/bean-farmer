import { game } from './game.js';
import { Color } from './color.js'

const worldMap = {}

worldMap.isOpen = false

worldMap.open = (xOffset = 0, yOffset = 0) => {
    if (!game.player.exists) {
        return null
    }
    game.pause()
    worldMap.cursorIndex = -1
    worldMap.drawMap(xOffset, yOffset)
    setTimeout(() => {
        worldMap.isOpen = true
    }, 15)
}

worldMap.drawMap = (xOffset = 0, yOffset = 0) => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
    game.ctx.fillStyle = `#999060`
    game.ctx.fillRect(0, 0, game.tileSize * game.viewport.width, game.tileSize * game.viewport.height)
    let playerLocation = null
    const pennyQueue = []
    const keyQueue = []
    let xOrigin = game.viewport.width * -5.5
    let yOrigin = game.viewport.height * -5
    for (let x = xOrigin + xOffset; x < (xOrigin + 216 + xOffset); x++) {
        for (let y = yOrigin + yOffset; y < (yOrigin + 188 + yOffset); y++) {
            const baseColor = new Color(230, 179, 122)
            const healthySoil = new Color(105, 118, 60)
            const toxicSoil = new Color(20, 10, 50)
            const snowySoil = new Color(230, 245, 255)
            const tileColor = new Color (baseColor.red, baseColor.green, baseColor.blue)
            const square = game.checkGrid(x, y, true)
            if (square) {
                tileColor.mixIn(square.soilHealth, healthySoil)
                tileColor.mixIn(square.soilToxicity, toxicSoil)
                tileColor.mixIn(square.frozenness, snowySoil)
            }
            game.ctx.fillStyle = tileColor.rgb()
            game.ctx.fillRect((-xOrigin - xOffset + x) * 11, (-yOrigin - yOffset + y) * 11, 11, 11)
            const item = game.checkGrid(x, y)
            const floor = game.checkGrid(x, y, true).groundOccupant
            if (floor && floor.sprite && floor.sprite.image) {
                game.ctx.drawImage(game.images[floor.sprite.image], (-xOrigin - xOffset + x) * 11, (-yOrigin - yOffset + y) * 11, 11, 11)
            }
            if (item && item.sprite && item.sprite.image) {
                if (item.name === "player") {
                    playerLocation = {x: x, y: y}
                } else if (item.name === "penny") {
                    pennyQueue.push({x: x, y: y})
                } else if (
                    item.name === "key" || (
                        item.name === "item stack" && item.imageName === "key"
                    )
                ) {
                    keyQueue.push({x: x, y: y})
                } else {
                    if (game.images[item.sprite.image]) {
                        game.ctx.drawImage(game.images[item.sprite.image], (-xOrigin - xOffset + x) * 11, (-yOrigin - yOffset + y) * 11, 11, 11)
                    }
                }
            }
        }
    }
    if (playerLocation) {
        game.ctx.drawImage(game.images["skeleton/skull/6"], (-xOrigin - xOffset + playerLocation.x) * 11 - 20, (-yOrigin - yOffset + playerLocation.y) * 11 - 20, 85, 85)
    }
    pennyQueue.forEach(pos => {
        game.ctx.drawImage(game.images["penny"], (-xOrigin - xOffset + pos.x) * 11 - 20, (-yOrigin - yOffset + pos.y) * 11 - 20, 50, 50)
    })
    keyQueue.forEach(pos => {
        game.ctx.drawImage(game.images["key"], (-xOrigin - xOffset + pos.x) * 11 - 20, (-yOrigin - yOffset + pos.y) * 11 - 20, 50, 50)
    })
}

worldMap.close = () => {
    game.play()
    worldMap.isOpen = false
}

export { worldMap }