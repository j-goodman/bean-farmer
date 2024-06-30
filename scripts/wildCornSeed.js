import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { WildCorn } from './wildCorn.js';

import { utils } from './utils.js';

class WildCornSeed extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "wild corn seed"
        this.sprite = new Sprite ("wild-corn-seed")
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        this.idle()
        game.setTimer(() => {
            if (!this.pickedUp && !game.checkGrid(this.position.x, this.position.y, true).groundOccupant) {
                this.die()
                game.addToGrid(new WildCorn (this.position.x, this.position.y, "ground", this.dna))
            }
        }, 400 + utils.dice(200))
    }
}

game.constructors[WildCornSeed.name] = WildCornSeed
export { WildCornSeed }