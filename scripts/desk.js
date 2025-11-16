import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Desk extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("desk")
        this.name = "desk"
        this.pushability = 10
        this.breakability = 7
        this.immobile = true
    }

    interaction () {
        this.open()
    }

    open () {
        if (!game.player.exists) {
            return null
        }
        game.pause()
        game.ctx.drawImage(game.images["necromancer-desk"], 0, 0, game.canvas.width, game.canvas.height)
        if (game.golemer) {
            let index = game.golemer.requestIndex
            if (index === 0) { index = 9 }
            if (index < 0) { index = 0 }
            if (index > 9) { index = 9 }
            game.ctx.drawImage(game.images[`checklist-checks/${index}`], 0, 0, game.canvas.width, game.canvas.height)
        }
        setTimeout(() => {
            game.display = this
        }, 15)
    }

    close () {
        game.display = null
        game.play()
    }
}

game.constructors[Desk.name] = Desk
export { Desk }