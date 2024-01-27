import { game } from './game.js';

const chiron = {}

chiron.itemPickupLong = (x, y) => {
    game.ctx.drawImage(game.images["chirons/item-pick-up"], (x * game.tileSize) - 90, (y * game.tileSize) - 200)
}

chiron.itemPickup = (x, y) => {
    game.ctx.drawImage(game.images["chirons/f-key"], (x * game.tileSize) + 12, (y * game.tileSize) - 70)
}

chiron.openItemScreen = () => {
    for (let i = 0; i < 400; i++) {
        game.setTimer(() => {
            // game.ctx.drawImage(game.images["chirons/item-screen-open"], (game.canvas.width / 2) - 80, (game.canvas.height / 2) - 120)
        }, i)
    }
}

chiron.itemPickup

export { chiron }