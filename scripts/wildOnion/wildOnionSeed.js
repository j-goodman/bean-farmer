import { Item } from '../item.js';
import { Sprite } from '../sprite.js';
import { WildOnionSprout } from './wildOnionSprout.js';

import { utils } from '../utils.js';

class WildOnionSeed extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "wild onion seed"
        this.sprite = new Sprite ("wild-onion/seed")
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        this.idle()
        game.setTimer(() => {
            if (!this.pickedUp && !game.checkGrid(this.position.x, this.position.y, true).groundOccupant) {
                this.die()
                game.addToGrid(new WildOnionSprout (this.position.x, this.position.y))
            }
        }, 50 + utils.dice(90))
    }
}

export { WildOnionSeed }