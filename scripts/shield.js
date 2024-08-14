import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Shield extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeShieldSprite()
        this.clockDirections = true
        this.facing = "6"
        this.name = "shield"
        this.health = 100
        this.equippedOffsets = {
            scale: 0,
            up: {
                x: 0,
                y: -60,
                angle: 0
            },
            right: {
                x: 20,
                y: 0,
                angle: 0
            },
            down: {
                x: 0,
                y: 20,
                angle: 0
            },
            left: {
                x: -20,
                y: 0,
                angle: 0
            },
            swing: {
                x: 40,
                y: 0,
                angle: -45
            }
        }
    }

    deflect () {
        this.swinging = true
        game.setTimer(() => {
            this.swinging = false
        }, 8)
    }

    takeHit () {
        this.health -= 1
        if (this.health <= 0 && game.player.equipped === this) {
            this.die()
        }
        this.deflect()
    }
}

const makeShieldSprite = () => {
    const shieldSprite = new Sprite ("shield/6")
    shieldSprite.addClockVersions("shield")
    return shieldSprite
}

game.constructors[Shield.name] = Shield
export { Shield }