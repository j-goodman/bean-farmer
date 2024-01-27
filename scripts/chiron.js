import { game } from './game.js';

const chiron = {}

chiron.itemPickupLong = (x, y) => {
    game.ctx.drawImage(game.images["chirons/item-pick-up"], (x * game.tileSize) - 90, (y * game.tileSize) - 200)
}

chiron.itemPickup = (x, y) => {
    game.ctx.drawImage(game.images["chirons/f-key"], (x * game.tileSize) + 12, (y * game.tileSize) - 70)
}

chiron.openItemScreen = () => {
    const display = () => {
        if (game.tutorial.items.menu) {
            game.ctx.drawImage(game.images["chirons/item-screen-open"], (game.canvas.width / 2) - 760, 120)
            game.setTimer(display, 2000)
        }
    }
    for (let i = 0; i < 400; i++) {
        game.setTimer(display, i)
    }
}

chiron.itemPickup

export { chiron }