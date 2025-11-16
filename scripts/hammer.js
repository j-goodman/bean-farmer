import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Cut } from './cut.js';

import { utils } from './utils.js';


class Hammer extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("hammer")
        this.name = "hammer"
        this.lastSwing = 0
        this.equippedOffsets = {
            up: {
                x: -60,
                y: 0,
                angle: 0
            },
            right: {
                x: 19,
                y: 25,
                angle: -30
            },
            down: {
                x: -15,
                y: 30,
                angle: -60
            },
            left: {
                x: -60,
                y: 20,
                angle: -10
            },
            swing: {
                x: -30,
                y: 60,
                angle: -150
            }
        }
    }

    use (user) {
        if (game.time - this.lastSwing < 44) {
            return false
        }
        this.swinging = true
        this.lastSwing = game.time
        game.setTimer(() => {
            this.swinging = false
        }, 30)
        let x = user.position.x
        let y = user.position.y
        this.position.x = x
        this.position.y = y
        let facing = utils.directionToCoordinates(user.direction)
        let target = game.checkGrid(x + facing.x, y + facing.y)
        if (!target) {
            target = game.checkGrid(x + facing.x, y + facing.y, true).groundOccupant
        }
        if (target && target.breakability < 6) {
            target.break(user)
        } else if (target && target.onHit) {
            target.onHit()
        }
    }

    windupSwing () {
        this.windup = true
        game.setTimer(() => {
            this.windup = false
        }, 5)
    }
}

game.constructors[Hammer.name] = Hammer
export { Hammer }