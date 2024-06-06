import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { Wood } from './wood.js';

import { utils } from './utils.js'

class Bookshelf extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeBookshelfSprite()
        this.name = "bookshelf"
        this.pushability = 10
        this.breakability = 5
        this.burnability = 12
        this.immobile = true
        this.text = "A shelf of books."
    }
    
    interaction () {
        this.open()
    }

    open () {
        game.ctx.drawImage(game.images["sign-text-background"], 0, 0, game.canvas.width, game.canvas.height)
        game.pause()
        game.controls.closeModal = () => {
            this.close()
            game.controls.closeModal = false
        }
        game.ctx.fillStyle = "#73461b"
        game.ctx.font = "80px Atkinson Hyperlegible"
        const textLines = utils.addLineBreaks(this.text)
        game.ctx.textAlign = "left"
        textLines.forEach((line, i) => {
            game.ctx.fillText(line, 360, 400 + 100 * i)
        })
    }

    close () {
        game.play()
    }
}

const makeBookshelfSprite = () => {
    const bookshelfSprite = new Sprite ("bookshelf")
    bookshelfSprite.addVersion("down", "bookshelf")

    return bookshelfSprite
}


export { Bookshelf }