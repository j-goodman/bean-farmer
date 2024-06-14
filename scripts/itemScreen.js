import { game } from './game.js';

const itemScreen = {}

itemScreen.isOpen = false
itemScreen.cursorIndex = 0
itemScreen.hover = "crystal longsword"

itemScreen.open = () => {
    game.pause()
    itemScreen.drawMenu()
    itemScreen.isOpen = true
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

    game.ctx.drawImage(
        game.images["item-screen/item-cursor"],
        225 + offset.x * (itemScreen.cursorIndex % 6),
        310 + offset.y * (Math.floor(itemScreen.cursorIndex / 6)),
        game.tileSize * 2,
        game.tileSize * 2
    )

    let i = 0
    const stacks = game.player.stacks
    for (const name in stacks) {
        const item = stacks[name].item
        game.ctx.drawImage(
            game.images[item.sprite.image],
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
    } else if (key === "f") {
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
        } else {
            game.player.equipped = null
        }
    }
    
    if (game.player.items[itemScreen.cursorIndex]) { // jango
        itemScreen.hover = game.player.items[itemScreen.cursorIndex].name
    } else {
        itemScreen.hover = ""
    }

    itemScreen.drawMenu()
}

itemScreen.close = () => {
    game.play()
    itemScreen.isOpen = false
}

export { itemScreen }