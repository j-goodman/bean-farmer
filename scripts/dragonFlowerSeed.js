import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { DragonFlowerSprout } from './dragonFlowerSprout.js';

import { utils } from './utils.js';

class DragonFlowerSeed extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "dragonflower seed"
        this.sprite = new Sprite ("dragon-flower/seed")

        if (game.time === 0) {
            this.seedAge -= utils.dice(300)
        }
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        game.setTimer(() => {
            if (!this.pickedUp && !game.checkGrid(this.position.x, this.position.y, true).groundOccupant) {
                game.addToGrid(new DragonFlowerSprout (this.position.x, this.position.y))
                this.die()
            }
        }, 300)
        this.idle()
    }
}

game.constructors[DragonFlowerSeed.name] = DragonFlowerSeed
export { DragonFlowerSeed }