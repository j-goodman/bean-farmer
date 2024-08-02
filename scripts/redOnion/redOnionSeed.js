import { Item } from '../item.js';
import { Sprite } from '../sprite.js';
import { RedOnionSprout } from './redOnionSprout.js';

import { utils } from '../utils.js';

class RedOnionSeed extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "red onion seed"
        this.sprite = new Sprite ("red-onion/seed")
        this.burnability = 1
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        this.idle()
        game.setTimer(() => {
            if (!this.pickedUp && !game.checkGrid(this.position.x, this.position.y, true).groundOccupant) {
                this.die()
                game.addToGrid(new RedOnionSprout (this.position.x, this.position.y))
                // to become red onion: soilHealth > .75, soilToxicity < .25
            }
        }, 50 + utils.dice(90))
    }
}

game.constructors[RedOnionSeed.name] = RedOnionSeed
export { RedOnionSeed }