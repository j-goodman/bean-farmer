import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Cut } from './cut.js';

import { utils } from './utils.js';


class Hatchet extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("hatchet")
        this.name = "hatchet"
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
        cut.setDirection(user.direction)
        let target = game.checkGrid(x + facing.x, y + facing.y)
        if (!target) {
            target = game.checkGrid(x + facing.x, y + facing.y, true).groundOccupant
        }
        if (target && target.onCut) {
            target.onCut(this)
        }
    }
}

game.constructors[Hatchet.name] = Hatchet
export { Hatchet }