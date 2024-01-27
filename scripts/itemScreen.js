import { game } from './game.js';

const itemScreen = {}

itemScreen.isOpen = false

itemScreen.open = () => {
    game.pause()
    itemScreen.drawMenu()
    itemScreen.isOpen = true
}

itemScreen.drawMenu = () => {
    game.ctx.drawImage(game.images["item-screen/item-screen"], 0, 0, game.canvas.width, game.canvas.height)
}

itemScreen.close = () => {
    game.play()
    itemScreen.isOpen = false
}

export { itemScreen }