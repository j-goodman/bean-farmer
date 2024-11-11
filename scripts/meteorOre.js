import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { MeteorCrystal } from './meteorCrystal.js';

import { utils } from './utils.js';
import { game } from './game.js';

class MeteorOre extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "meteor ore"
        this.imageName = "medium-meteor-ore"
        this.sprite = new Sprite ("medium-meteor-ore")
        this.pushability = 3
        this.breakability = 2
        this.immobile = true
        game.setTimer(() => {
            this.cleanSoil(utils.dice(22), "soilToxicity", 1)
            this.cleanSoil(utils.dice(16), "soilToxicity", 1)
            this.cleanSoil(utils.dice(12), "soilToxicity", 1)
        }, 15)
    }
    
    onBreak () {
        let Drop = MeteorCrystal
        this.cleanSoil(10, "soilToxicity", -1)
        this.cleanSoil(12, "soilToxicity", -1)
        this.die()
        this.checkDrop(new Drop (this.position.x, this.position.y))
        this.checkDrop(new Drop (this.position.x, this.position.y))
        this.checkDrop(new Drop (this.position.x, this.position.y))
    }
}

game.constructors[MeteorOre.name] = MeteorOre
export { MeteorOre }