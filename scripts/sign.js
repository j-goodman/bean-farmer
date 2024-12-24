import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { Wood } from './wood.js';

import { utils } from './utils.js'

class Sign extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeSignSprite()
        this.name = "sign"
        this.pushability = 10
        this.breakability = 6
        this.immobile = true
        this.textColor = "#73461b"
        this.backgroundImage = "sign-text-background"
        this.text = "This sign has been left blank."
    }
    
    interaction () {
        this.open()
    }

    open () {
        game.ctx.drawImage(game.images[this.backgroundImage], 0, 0, game.canvas.width, game.canvas.height)        
        game.pause()
        game.controls.closeModal = () => {
            this.close()
            game.controls.closeModal = false
        }
        game.ctx.fillStyle = this.textColor
        game.ctx.font = "80px Pangolin"
        const textLines = utils.addLineBreaks(this.text)
        game.ctx.textAlign = "left"
        textLines.forEach((line, i) => {
            game.ctx.fillText(line, 360, 400 + 100 * i)
        })
    }

    setVariant (name) {
        if (name === "stone") {
            this.variant = "stone"
            this.backgroundImage = "stone-sign-text-background"
            this.textColor = "#a9a2b0"
            this.sprite.changeVersion("stone")
            this.sprite = new Sprite ("stone-sign")
            this.burnability = null
        }
    }

    close () {
        game.play()
    }

    onDeath () {
        if (this.burnability > 0) {
            new Wood (this.position.x, this.position.y)
        }
    }
}

const makeSignSprite = () => {
    const signSprite = new Sprite ("sign")
    signSprite.addVersion("down", "sign")

    return signSprite
}

game.constructors[Sign.name] = Sign
export { Sign }