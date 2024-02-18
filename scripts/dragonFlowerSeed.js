import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { WildOnionSprout } from './wildOnion/wildOnionSprout.js';

import { utils } from './utils.js';

class DragonFlowerSeed extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "dragonflower seed"
        this.sprite = new Sprite ("dragon-flower/seed")
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        this.idle()
    }
}

export { DragonFlowerSeed }