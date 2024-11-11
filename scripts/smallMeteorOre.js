import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { MeteorCrystal } from './meteorCrystal.js';

import { utils } from './utils.js';
import { game } from './game.js';

class SmallMeteorOre extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "meteor ore"
        this.imageName = "small-meteor-ore"
        this.sprite = new Sprite ("small-meteor-ore")
        this.pushability = 3
        this.breakability = 2
        this.immobile = true
        this.cleanSoil(utils.dice(9), "soilToxicity", 1)
    }

    onBreak () {
        let Drop = MeteorCrystal
        this.cleanSoil(8, "soilToxicity", -1)
        this.die()
        this.checkDrop(new Drop (this.position.x, this.position.y))
    }
}

game.constructors[SmallMeteorOre.name] = SmallMeteorOre
export { SmallMeteorOre }