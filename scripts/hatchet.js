import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Cut } from './cut.js';

import { utils } from './utils.js';


class Hatchet extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("hatchet")
    }

    use (user) {
        console.log("a swing o the hatchet")
        let x = user.position.x
        let y = user.position.y
        let facing = utils.directionToCoordinates(user.direction)
        new Cut (x + facing.x, y + facing.y, "air")
        let target = game.checkGrid(x + facing.x, y + facing.y)
        if (!target) {
            target = game.checkGrid(x + facing.x, y + facing.y, true).groundOccupant
        }
        if (target && target.onCut) {
            target.onCut(this)
        }
    }
}

export { Hatchet }