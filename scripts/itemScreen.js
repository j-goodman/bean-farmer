import { game } from './game.js';

const itemScreen = {}

itemScreen.isOpen = false
itemScreen.cursorIndex = 0
itemScreen.hover = ""

itemScreen.open = () => {
    if (!game.player.exists) {
        return null
    }
    game.pause()
    itemScreen.respawnCount = 0
    itemScreen.drawMenu()
    itemScreen.isOpen = true
    itemScreen.keyPress()
}

itemScreen.drawMenu = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
    game.ctx.drawImage(game.images["item-screen/item-screen"], 0, 0, game.canvas.width, game.canvas.height)
    itemScreen.drawItems()
    
    if (game.tutorial.items.equip > 0) {
        game.ctx.drawImage(game.images["chirons/item-equip"], 900, 130)
    } else {
        game.ctx.fillStyle = "#95b7e4"
        game.ctx.font = "80px Pangolin"
        game.ctx.textAlign = "center"
        game.ctx.fillText(itemScreen.hover, 1080, 230)
    }
}

itemScreen.drawItems = () => {
    let offset = {x: 245, y: 232}
    game.player.stacks = {}

    game.player.items.forEach((item) => {
        if (game.player.stacks[item.name]) {
            game.player.stacks[item.name].count += 1
        } else {
            game.player.stacks[item.name] = {
                item: item,
                count: 1
            }
        }
    })

    let xPos = 225 + offset.x * (itemScreen.cursorIndex % 6)
    let yPos = 310 + offset.y * (Math.floor(itemScreen.cursorIndex / 6))

    if (itemScreen.cursorIndex === 24) {
        xPos = 210 + offset.x * (6)
        yPos = 310 + offset.y * (Math.floor(23 / 6))
    }

    game.ctx.drawImage(
        game.images["item-screen/item-cursor"],
        xPos, yPos,
        game.tileSize * 2,
        game.tileSize * 2
    )

    let i = 0
    const stacks = game.player.stacks
    for (const name in stacks) {
        const item = stacks[name].item
        let iconImage = item.sprite.image
        if (item.clockDirections) {
            iconImage = item.sprite.versions[6]
        }
        game.ctx.drawImage(
            game.images[iconImage],
            245 + offset.x * (i % 6),
            335 + offset.y * (Math.floor(i / 6)),
            game.tileSize * 1.5,
            game.tileSize * 1.5
        )
        if (stacks[name].count > 1) {
            game.ctx.fillStyle = "rgba(47,41,22,.85)";
            game.ctx.beginPath();
            let fontSize = 50
            game.ctx.arc(
                420 + offset.x * (i % 6),
                512 + offset.y * (Math.floor(i / 6)),
                fontSize, 0, 2 * Math.PI
            );
            game.ctx.fill();
            game.ctx.fillStyle = "#56cefd";
            game.ctx.fillText(
                stacks[name].count,
                420 + offset.x * (i % 6),
                540 + offset.y * (Math.floor(i / 6)),
                game.tileSize * 1.5,
                game.tileSize * 1.5
            )
        }
        i += 1
    }

    if (game.tutorial.items.menuNavigation) {        
        game.ctx.drawImage(
            game.images["chirons/item-cursor-guide"],
            136 + offset.x * (itemScreen.cursorIndex % 6),
            212 + offset.y * (Math.floor(itemScreen.cursorIndex / 6)),
        )
    }
    let equipped = game.player.equipped
    if (equipped) {
        game.ctx.drawImage(
            game.images[equipped.sprite.image],
            1445,
            75,
            game.tileSize * 2,
            game.tileSize * 2
        )
    }
}

itemScreen.keyPress = (key) => {
    if (!game.player.exists) {
        return null
    }
    
    if (["w", "a", "s", "d", "W", "A", "S", "D"].includes(key)) {
        game.tutorial.items.menuNavigation = 
        game.tutorial.items.menuNavigation > 0 ?
        game.tutorial.items.menuNavigation - 1 :
        game.tutorial.items.menuNavigation
    }

    if (key === "D" || key === "d") {
        itemScreen.cursorIndex += 1
    } else if (key === "A" || key === "a") {
        itemScreen.cursorIndex -= 1
    } else if (key === "S" || key === "s") {
        itemScreen.cursorIndex += 6
    } else if (key === "W" || key === "w") {
        itemScreen.cursorIndex -= 6
    }

    if (itemScreen.cursorIndex > 24) {
        itemScreen.cursorIndex = 24
    } else if (itemScreen.cursorIndex < 0) {
        itemScreen.cursorIndex = 0
    } else if (key === "F" || key === "f") {
        // let selected = game.player.items[itemScreen.cursorIndex]
        // let selected = game.player.stacks[itemScreen.cursorIndex].item
        let stackNames = Object.keys(game.player.stacks)
        let selected = null
        if (game.player.stacks[stackNames[itemScreen.cursorIndex]]) {
            selected = game.player.stacks[stackNames[itemScreen.cursorIndex]].item
        }
        if (selected) {
            game.tutorial.items.equip = game.tutorial.items.equip > 0 ?
            game.tutorial.items.equip - 1 : game.tutorial.items.equip 
            game.player.equipped = selected
            if (selected.food) {
                game.displayHealth = 120
            }
        } else {
            game.player.equipped = null
        }

        if (itemScreen.cursorIndex === 24) {
            if (itemScreen.respawnCount < 1) {
                itemScreen.respawnCount += 1
            } else {
                itemScreen.cursorIndex = 0
                game.play()
                game.setTimer(() => {
                    game.player.health = 1
                    game.player.onHit()
                }, 1)
            }
        }
    }
    
    let hoverName = Object.keys(game.player.stacks)[itemScreen.cursorIndex]
    if (hoverName) {
        itemScreen.hover = hoverName
    } else {
        itemScreen.hover = ""
    }

    if (itemScreen.cursorIndex === 24) {
        if (itemScreen.respawnCount === 0) {
            itemScreen.hover = "respawn?"
        } else {
            itemScreen.hover = "press f to respawn"
        }
    }

    itemScreen.drawMenu()
}

itemScreen.close = () => {
    game.play()
    itemScreen.isOpen = false
}

export { itemScreen }