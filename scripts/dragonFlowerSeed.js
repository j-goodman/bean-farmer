import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { DragonFlowerSprout } from './dragonFlowerSprout.js';

import { utils } from './utils.js';

class DragonFlowerSeed extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "dragonflower seed"
        this.sprite = new Sprite ("dragon-flower/seed")
        window.pig = this
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        game.setTimer(() => {
            if (!this.pickedUp && !game.checkGrid(this.position.x, this.position.y, true).groundOccupant) {
                this.die()
                game.addToGrid(new DragonFlowerSprout (this.position.x, this.position.y))
            }
        }, 300)
        this.idle()
    }
}

export { DragonFlowerSeed }