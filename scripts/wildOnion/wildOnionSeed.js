import { Item } from '../item.js';
import { Sprite } from '../sprite.js';
import { WildOnionSprout } from './wildOnionSprout.js';

import { utils } from '../utils.js';
import { RedOnionSprout } from '../redOnion/redOnionSprout.js';

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
            const obstacle = game.checkGrid(this.position.x, this.position.y, true).groundOccupant
            if (obstacle && obstacle.name === "grass") {
                obstacle.die()
            }
            if (!this.pickedUp && !obstacle) {
                this.die()
                const square = game.checkGrid(this.position.x, this.position.y, true)
                if (square.soilHealth > .75 && square.soilToxicity < .25 && utils.dice(5) === 5) {
                    game.addToGrid(new RedOnionSprout (this.position.x, this.position.y))
                } else {
                    game.addToGrid(new WildOnionSprout (this.position.x, this.position.y))
                }
            }
        }, 50 + utils.dice(90))
    }
}

game.constructors[WildOnionSeed.name] = WildOnionSeed
export { WildOnionSeed }