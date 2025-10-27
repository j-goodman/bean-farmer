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
            this.cleanSoil(utils.dice(18) + 15, "soilToxicity", 1)
            this.cleanSoil(utils.dice(18) + 15, "soilToxicity", 1)
            this.cleanSoil(utils.dice(18) + utils.dice(18), "soilToxicity", 1)
            this.cleanSoil(utils.dice(6) + 16, "soilToxicity", 1)
            this.cleanSoil(utils.dice(10) + 10, "soilToxicity", 1)
            this.cleanSoil(utils.dice(16), "soilToxicity", 1)
            this.cleanSoil(utils.dice(16), "soilToxicity", 1)
            this.cleanSoil(utils.dice(12), "soilToxicity", 1)
            this.cleanSoil(utils.dice(10), "soilToxicity", 1)
            this.cleanSoil(utils.dice(8), "soilToxicity", 1)
            this.cleanSoil(utils.dice(6), "soilToxicity", 1)
        }, 15)
    }
    
    onBreak () {
        let Drop = MeteorCrystal
        this.cleanSoil(8, "soilToxicity", -1)
        this.cleanSoil(10, "soilToxicity", -1)
        if (utils.isInViewport(this.position)) {
            game.givePoints(20, this)
        }
        this.die()
        this.checkDrop(new Drop (this.position.x, this.position.y))
        this.checkDrop(new Drop (this.position.x, this.position.y))
        this.checkDrop(new Drop (this.position.x, this.position.y))
    }
}

game.constructors[MeteorOre.name] = MeteorOre
export { MeteorOre }