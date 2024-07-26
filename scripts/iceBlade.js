import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Cut } from './cut.js';

import { utils } from './utils.js';
import { IceBlast } from './iceBlast.js';
import { Lightburst } from './lightburst.js';


class IceBlade extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("ice-blade")
        this.name = "ice blade"
        this.equippedOffsets = {
            up: {
                x: 0,
                y: -70,
                angle: 40
            },
            right: {
                x: 60,
                y: 6,
                angle: -30
            },
            down: {
                x: 60,
                y: 20,
                angle: -80
            },
            left: {
                x: -60,
                y: 6,
                angle: -30
            },
            swing: {
                x: 80,
                y: 100,
                angle: -150
            }
        }
    }

    windupSwing () {
        this.windup = true
        game.setTimer(() => {
            this.windup = false
        }, 5)
    }

    deflect () {
        this.swinging = true
        game.setTimer(() => {
            this.swinging = false
        }, 6)
    }

    use (user) {
        this.swinging = true
        game.setTimer(() => {
            this.swinging = false
        }, 6)
        let x = user.position.x
        let y = user.position.y
        this.position.x = x
        this.position.y = y
        let facing = utils.directionToCoordinates(user.direction)
        let cut = new Cut (x + facing.x, y + facing.y, "air")

        if (user.name === "player" && game.checkGrid(x + facing.x, y + facing.y)) {
            if (!this.uses) {
                this.uses = 1
            } else {
                this.uses += 1
            }

            if (this.uses > 7) {
                this.die()
                new Lightburst (x + facing.x, y + facing.y)
            }
        }

        if (user.name === "player") {
            new IceBlast (x + facing.x * 2, y + facing.y * 2)
        }

        cut.setDirection(user.direction)
        let target = game.checkGrid(x + facing.x, y + facing.y)
        if (!target) {
            target = game.checkGrid(x + facing.x, y + facing.y, true).groundOccupant
        }
        if (target && target.onCut) {
            target.onCut(user)
        }
    }
}

game.constructors[IceBlade.name] = IceBlade
export { IceBlade }