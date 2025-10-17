import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class GolemerBookshelf extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("bookshelf")
        this.name = "bookshelf"
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
        game.ctx.drawImage(game.images["bookshelf-display"], 0, 0, game.canvas.width, game.canvas.height)
        setTimeout(() => {
            game.display = this
        }, 15)
    }

    close () {
        game.display = null
        game.play()
    }
}

game.constructors[GolemerBookshelf.name] = GolemerBookshelf
export { GolemerBookshelf }