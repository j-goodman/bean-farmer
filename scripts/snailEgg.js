import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { SnowSnail } from './snowSnail.js';

import { utils } from './utils.js';

class SnailEgg extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "snail egg"
        this.sprite = new Sprite ("snail-egg")
    }

    update (age) {
        if (age > 1500) {
            this.die()
            new SnowSnail (this.position.x, this.position.y)
        }
    }
}

game.constructors[SnailEgg.name] = SnailEgg
export { SnailEgg }