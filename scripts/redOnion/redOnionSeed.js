import { Item } from '../item.js';
import { Sprite } from '../sprite.js';
import { RedOnionSprout } from './redOnionSprout.js';

import { utils } from '../utils.js';

class RedOnionSeed extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "red onion seed"
        this.sprite = new Sprite ("red-onion/seed")
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        this.idle()
        game.setTimer(() => {
            let obstacle = game.checkGrid(this.position.x, this.position.y, true).groundOccupant
            if (obstacle && obstacle.name === "grass") {
                obstacle.die()
                obstacle = false
            }
            if (!this.pickedUp && !obstacle) {
                this.die()
                game.addToGrid(new RedOnionSprout (this.position.x, this.position.y))
            }
        }, 20 + utils.dice(90))
    }

    update (age) {
        this.frameUpdate()
        if (age % (30 * 13) === 0) {
            const item = game.checkGrid(this.position.x, this.position.y, true).groundOccupant
            if (item) {
                this.die()
            } else {
                this.onDrop()
            }
        }
    }
}

game.constructors[RedOnionSeed.name] = RedOnionSeed
export { RedOnionSeed }