import { Item } from '../item.js';
import { Sprite } from '../sprite.js';
import { Grass } from './grass.js';

import { utils } from '../utils.js';

class GrassSeed extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "grass seed"
        this.sprite = new Sprite ("grass/seed")
        this.burnability = 1
    }

    onDrop () {
        game.setTimer(() => {
            if (!this.pickedUp && !game.checkGrid(this.position.x, this.position.y, true).groundOccupant) {
                this.die()
                game.addToGrid(new Grass (this.position.x, this.position.y, "ground"))
            } else {
                this.die()
            }
        }, 150 + utils.dice(50))
    }

    burn () {
        this.burnability -= 1
        if (this.burnability <= 0) {
            this.die()
        }
    }
}

export { GrassSeed }