import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class Ring extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "pearl ring"
        this.color = "pearl"
        this.pearlSprite = new Sprite ("pearl-ring")
        this.onyxSprite = new Sprite ("onyx-ring")
        this.sprite = this.pearlSprite
        game.setTimer(() => {
            this.findPartner()
        }, 30)
    }
    
    setVariant (color) {
        if (color === "onyx") {
            this.variant = "onyx"
            this.color = "onyx"
            this.name = "onyx ring"
            this.sprite  = new Sprite ("onyx-ring")
            this.use = null
        }
    }

    findPartner () {
        for (let x = -88; x < 128; x++) {
            for (let y = -60; y < 128; y++) {
                const item = game.checkGrid(x, y)
                if (item && item.name !== this.name && (item.name === "pearl ring" || item.name === "onyx ring")) {
                    this.partner = item
                }
            }
        }
    }

    use (target) {
        utils.drawSmoke(target.position, 10)
        if (this.partner && this.partner.exists) {
            const oldColor = this.color
            const newColor = this.color === "pearl" ? "onyx" : "pearl"
            utils.drawSmoke({x: target.position.x, y: target.position.y}, 120)
            utils.drawSmoke(target.position, 120)
            game.setTimer(() => {
                this.name = `${newColor} ring`
                this.sprite = this[`${newColor}Sprite`]
                this.partner.name = `${oldColor} ring`
                this.partner.sprite = this.partner[`${oldColor}Sprite`]
                this.color = newColor
                this.partner.color = oldColor
                const targetX = target.position.x
                const targetY = target.position.y
                target.teleport(this.partner.position)
                this.partner.position = {x: targetX, y: targetY}
                game.checkGrid(targetX, targetY, true).occupant = this.partner
                this.partner.spritePosition = {x: targetX, y: targetY}
            }, 5)
        }
    }
}

game.constructors[Ring.name] = Ring
export { Ring }