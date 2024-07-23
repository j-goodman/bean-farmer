import { Item } from './item.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class Wood extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("wood")
        this.burnability = 20
        this.name = "wood"
    }

    burn () {
        this.cleanSoil(utils.dice(10), "soilHealth", 1)
        if (this.onHit) { this.onHit() }
        this.burnability -= 1
        if (this.burnability <= 0) {
            this.die()
        }
    }
}

game.constructors[Wood.name] = Wood
export { Wood }