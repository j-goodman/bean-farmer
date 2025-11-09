import { game } from './game.js';

const chiron = {}

chiron.itemPickupLong = (x, y) => {
    game.ctx.drawImage(
        game.images["chirons/item-pick-up"],
        ((x * game.tileSize) - 90) - game.viewport.origin.x * game.tileSize,
        ((y * game.tileSize) - 100) - game.viewport.origin.y * game.tileSize
    )
}

chiron.itemPickup = (x, y) => {
    game.ctx.drawImage(
        game.images["chirons/f-key"],
        ((x * game.tileSize) + 12) - game.viewport.origin.x * game.tileSize,
        ((y * game.tileSize) - 70) - game.viewport.origin.y * game.tileSize
    )
}

chiron.openItemScreen = () => {
    const display = () => {
        if (game.tutorial.items.menu) {
            game.setTimer(() => {
                game.ctx.drawImage(game.images["chirons/item-screen-open"], (game.canvas.width / 2) - 780, 80)
                game.setTimer(display, 2000)
            }, 0)
        }
    }
    for (let i = 0; i < 400; i++) {
        game.setTimer(display, i)
    }
}

chiron.itemPickup

export { chiron }