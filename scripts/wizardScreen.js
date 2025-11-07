import { Bomb } from './bomb.js';
import { Emerald } from './emerald.js';
import { ExtraHeart } from './extraHeart.js';
import { game } from './game.js';
import { IceBlade } from './iceBlade.js';
import { IslandMap } from './islandMap.js';
import { ItemStack } from './itemStack.js';
import { Key } from './key.js';
import { LilySeed } from './lilySeed.js';
import { Penny } from './penny.js';
import { RedOnion } from './redOnion/redOnion.js';
import { Ruby } from './ruby.js';
import { Sapphire } from './sapphire.js';
import { SmokyQuartz } from './smokyQuartz.js';
import { SnailEgg } from './snailEgg.js';
import { utils } from './utils.js';
import { WildCornItem } from './wildCornItem.js';

const wizardScreen = {}

wizardScreen.isOpen = false
wizardScreen.cursorIndex = 0
wizardScreen.hover = ""

wizardScreen.open = () => {
    if (!game.player.exists) {
        return null
    }
    game.pause()
    wizardScreen.cursorIndex = wizardScreen.items.length
    wizardScreen.drawMenu()
    setTimeout(() => {
        wizardScreen.isOpen = true
    }, 15)
    wizardScreen.keyPress()
}

wizardScreen.drawMenu = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
    game.ctx.drawImage(game.images["wizard-screen"], 0, 0, game.canvas.width, game.canvas.height)
    
    game.ctx.fillStyle = "#95b7e4"
    game.ctx.font = "80px Pangolin"
    game.ctx.textAlign = "center"
    game.ctx.fillText(wizardScreen.hover, 1080, 230)

    game.ctx.drawImage(game.images["point-cards/gem"], 160, 1280)
    let labelX = 365
    if (game.points < 100) {
        labelX -= 60
    } else if (game.points < 1000) {
        labelX -= 30
    } else if (game.points > 10000) {
        labelX += 60
    }
    game.ctx.fillText(game.points, labelX, 1348)
    
    let lastIndex = 0
    wizardScreen.items.forEach((item, index) => {
        game.ctx.drawImage(game.images[item.icon], 170, 220 + 150 * index)
        game.ctx.drawImage(game.images["point-cards/gem"], 320, 235 + 150 * index)
        game.ctx.textAlign = "left"
        game.ctx.fillText(item.price, 420, 300 + 150 * index)
        game.ctx.textAlign = "center"
        if (item.stack) {
            game.ctx.fillStyle = "#56cefd";
            game.ctx.font = "56px Pangolin"
            game.ctx.fillText(
                item.stack,
                170 + 110,
                220 + 150 * index + 120
            )
            game.ctx.font = "80px Pangolin"
        }
        lastIndex = index
    })
    let selected = wizardScreen.items[wizardScreen.cursorIndex]
    let article = ""
    if (selected && !selected.stack) {
        article = ["a", "e", "i", "o", "u"].includes(selected.name[0]) ?
            "an " : "a "
    }
    if (selected) {
        game.ctx.textAlign = "left"
        game.ctx.fillText(`Press f to buy ${article}${selected.name} for ${selected.price}`, 400, 120)
        game.ctx.textAlign = "center"
    }
    game.ctx.fillText("exit", 720, 300 + 150 * (lastIndex + 1))
    game.ctx.drawImage(game.images["pointer"], 800, 210 + 150 * wizardScreen.cursorIndex)
}

wizardScreen.items = [
    {item: RedOnion, name: "six red onions", icon: "red-onion/bulb", price: 300, id: game.assignId(), stack: 6},
    {item: IceBlade, name: "three ice blades", icon: "ice-blade", price: 200, id: game.assignId(), stack: 3},
    {item: Key, name: "key", icon: "key", price: 600, id: game.assignId()},
    {item: RedOnion, name: "twenty red onions", icon: "red-onion/bulb", price: 800, id: game.assignId(), stack: 20},
    {item: SmokyQuartz, name: "twelve quartz crystals", icon: "smoky-quartz", price: 900, id: game.assignId(), stack: 12},
    {item: IslandMap, name: "island map", icon: "island-map", price: 1600, id: game.assignId()},
]

wizardScreen.itemQueue = [
    {item: LilySeed, name: "pig flower seed", icon: "lily-seed", price: 180, id: game.assignId()},
    {item: Bomb, name: "ten bombs", icon: "bomb", price: 700, id: game.assignId(), stack: 10},
    {item: SnailEgg, name: "six snail eggs", icon: "snail-egg", price: 300, id: game.assignId(), stack: 6},
    {item: Penny, name: "penny", icon: "penny", price: 1, id: game.assignId()},
    {item: WildCornItem, name: "twelve ears of corn", icon: "wild-corn-item", price: 700, id: game.assignId(), stack: 12},
    {item: Bomb, name: "sixty bombs", icon: "bomb", price: 2750, id: game.assignId(), stack: 60},
    {item: Emerald, name: "emerald", icon: "emerald", price: 2600, id: game.assignId()},
    {item: ExtraHeart, name: "extra heart", icon: "heart", price: 3200, id: game.assignId()},
    {item: IceBlade, name: "eleven ice blades", icon: "ice-blade", price: 400, id: game.assignId(), stack: 11},
    // {item: Key, name: "key", icon: "key", price: 2000, id: game.assignId()},
    {item: LilySeed, name: "pig flower seed", icon: "lily-seed", price: 180, id: game.assignId()},
    {item: Ruby, name: "ruby", icon: "ruby", price: 2700, id: game.assignId()},
    {item: SnailEgg, name: "sixteen snail eggs", icon: "snail-egg", price: 650, id: game.assignId(), stack: 16},
    {item: Sapphire, name: "sapphire", icon: "sapphire", price: 2800, id: game.assignId()},
    {item: WildCornItem, name: "twenty ears of corn", icon: "wild-corn-item", price: 1600, id: game.assignId(), stack: 20},
    {item: ExtraHeart, name: "extra heart", icon: "heart", price: 4800, id: game.assignId()},
]

wizardScreen.keyPress = (key) => {
    if (!game.player.exists) {
        return null
    }

    let redraw = true

    if (["w", "a", "s", "d", "W", "A", "S", "D"].includes(key)) {
        game.tutorial.items.menuNavigation = 
        game.tutorial.items.menuNavigation > 0 ?
        game.tutorial.items.menuNavigation - 1 :
        game.tutorial.items.menuNavigation
    }

    if (key === "D" || key === "d") {
        wizardScreen.cursorIndex += 1
    } else if (key === "A" || key === "a") {
        wizardScreen.cursorIndex -= 1
    } else if (key === "S" || key === "s") {
        wizardScreen.cursorIndex += 1
    } else if (key === "W" || key === "w") {
        wizardScreen.cursorIndex -= 1
    }

    if (wizardScreen.cursorIndex < 0) {
        wizardScreen.cursorIndex = wizardScreen.items.length
    }
    if (wizardScreen.cursorIndex > wizardScreen.items.length) {
        wizardScreen.cursorIndex = 0
    }

    if (key === "F" || key === "f") {
        let selected = wizardScreen.items[wizardScreen.cursorIndex]
        let unobstructed = wizardScreen.unobstructed()
        if (selected) {
            if (game.points >= selected.price && unobstructed) {
                wizardScreen.buy(wizardScreen.cursorIndex)
            } else if (game.points < selected.price) {
                game.ctx.fillStyle = "#c44"
                let labelX = 365
                if (game.points < 100) {
                    labelX -= 60
                } else if (game.points < 1000) {
                    labelX -= 30
                } else if (game.points > 10000) {
                    labelX += 60
                }
                game.ctx.fillText(game.points, labelX, 1348)
                redraw = false
            } else {
                game.ctx.fillStyle = "#c44"
                game.ctx.fillText("The trading rug is obstructed.", 960, 1348)
                redraw = false
            }
        }
        if (wizardScreen.cursorIndex === wizardScreen.items.length) {
            wizardScreen.close()
        }
    }
    
    if (redraw) {
        wizardScreen.drawMenu()
    }
}

wizardScreen.unobstructed = () => {
    let obstruction = game.checkGrid(wizardScreen.wizard.tradePosition.x, wizardScreen.wizard.tradePosition.y)
    return !obstruction
}

wizardScreen.buy = (index) => {
    let item = wizardScreen.items[index]
    game.givePoints(-item.price)
    if (item.stack) {
        new ItemStack (
            wizardScreen.wizard.tradePosition.x,
            wizardScreen.wizard.tradePosition.y,
            item.item,
            item.icon,
            item.stack
        )
    } else [
        new item.item (wizardScreen.wizard.tradePosition.x, wizardScreen.wizard.tradePosition.y)
    ]
    wizardScreen.wizard.jump()
    utils.drawSparks(wizardScreen.wizard.tradePosition, 40)
    wizardScreen.items = wizardScreen.items.filter (check => {
        return check.id !== item.id
    })
    if (wizardScreen.itemQueue.length > 0) {
        wizardScreen.items.push(wizardScreen.itemQueue.shift())
    }
    wizardScreen.close()
}

wizardScreen.close = () => {
    game.play()
    wizardScreen.isOpen = false
}

export { wizardScreen }