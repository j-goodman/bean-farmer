import { game } from './game.js';

const itemScreen = {}

itemScreen.isOpen = false
itemScreen.cursorIndex = 0

itemScreen.open = () => {
    game.pause()
    itemScreen.drawMenu()
    itemScreen.isOpen = true
}

itemScreen.drawMenu = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
    game.ctx.drawImage(game.images["item-screen/item-screen"], 0, 0, game.canvas.width, game.canvas.height)
    itemScreen.drawItems()
}

itemScreen.drawItems = () => {
    let offset = {x: 245, y: 232}
    game.player.items.forEach((item, i) => {
        game.ctx.drawImage(
            game.images[item.sprite.image],
            245 + offset.x * (i % 6),
            335 + offset.y * (Math.floor(i / 6)),
            game.tileSize * 1.5,
            game.tileSize * 1.5
        )
    })
    game.ctx.drawImage(
        game.images["item-screen/item-cursor"],
        225 + offset.x * (itemScreen.cursorIndex % 6),
        310 + offset.y * (Math.floor(itemScreen.cursorIndex / 6)),
        game.tileSize * 2,
        game.tileSize * 2
    )
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
    if (["w", "a", "s", "d"].includes(key)) {
        game.tutorial.items.menuNavigation = 
        game.tutorial.items.menuNavigation > 0 ?
        game.tutorial.items.menuNavigation - 1 :
        game.tutorial.items.menuNavigation
    }

    if (key === "d") {
        itemScreen.cursorIndex += 1
    } else if (key === "a") {
        itemScreen.cursorIndex -= 1
    } else if (key === "s") {
        itemScreen.cursorIndex += 6
    } else if (key === "w") {
        itemScreen.cursorIndex -= 6
    }
    if (itemScreen.cursorIndex > 23) {
        itemScreen.cursorIndex = 23
    } else if (itemScreen.cursorIndex < 0) {
        itemScreen.cursorIndex = 0
    }

    else if (key === "f") {
        let selected = game.player.items[itemScreen.cursorIndex]
        if (selected) {
            game.player.equipped = selected
        } else {
            game.player.equipped = null
        }
    }
    
    itemScreen.drawMenu()
}

itemScreen.close = () => {
    game.play()
    itemScreen.isOpen = false
}

export { itemScreen }