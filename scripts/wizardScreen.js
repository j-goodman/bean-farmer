import { Emerald } from './emerald.js';
import { game } from './game.js';
import { Key } from './key.js';
import { Ruby } from './ruby.js';
import { Sapphire } from './sapphire.js';
import { SmokyQuartz } from './smokyQuartz.js';
import { SnailEgg } from './snailEgg.js';
import { utils } from './utils.js';

const wizardScreen = {}

wizardScreen.isOpen = false
wizardScreen.cursorIndex = 0
wizardScreen.hover = ""

wizardScreen.open = () => {
    if (!game.player.exists) {
        return null
    }
    game.pause()
    wizardScreen.cursorIndex = -1
    wizardScreen.drawMenu()
    wizardScreen.isOpen = true
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
        lastIndex = index
    })
    let selected = wizardScreen.items[wizardScreen.cursorIndex]
    if (selected) {
        game.ctx.textAlign = "left"
        game.ctx.fillText(`Press f to buy a ${selected.name} for ${selected.price}`, 400, 120)
        game.ctx.textAlign = "center"
    }
    game.ctx.fillText("exit", 720, 300 + 150 * (lastIndex + 1))
    game.ctx.drawImage(game.images["pointer"], 800, 210 + 150 * wizardScreen.cursorIndex)
}

wizardScreen.items = [
    {item: SmokyQuartz, name: "smoky quartz", icon: "smoky-quartz", price: 40, id: 1},
    {item: Key, name: "key", icon: "key", price: 600, id: 2},
    {item: Emerald, name: "emerald", icon: "emerald", price: 2700, id: 3},
    {item: SnailEgg, name: "snail egg", icon: "snail-egg", price: 70, id: 4},
    {item: Ruby, name: "ruby", icon: "ruby", price: 2700, id: 5},
    {item: Key, name: "key", icon: "key", price: 1800, id: 6},
    {item: Sapphire, name: "sapphire", icon: "sapphire", price: 2700, id: 7},
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

    if (wizardScreen.cursorIndex < -1) {
        wizardScreen.cursorIndex = wizardScreen.items.length
    }
    if (wizardScreen.cursorIndex > wizardScreen.items.length) {
        wizardScreen.cursorIndex = -1
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
                game.ctx.fillText("The rug is obstructed.", 830, 1348)
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
    new item.item (wizardScreen.wizard.tradePosition.x, wizardScreen.wizard.tradePosition.y)
    wizardScreen.wizard.jump()
    utils.drawSparks(wizardScreen.wizard.tradePosition, 25)
    wizardScreen.items = wizardScreen.items.filter (check => {
        return check.id !== item.id
    })
    wizardScreen.close()
}

wizardScreen.close = () => {
    game.play()
    wizardScreen.isOpen = false
}

export { wizardScreen }