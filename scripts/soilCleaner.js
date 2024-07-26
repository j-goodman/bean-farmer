import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { Wood } from './wood.js';

import { utils } from './utils.js';

class SoilCleaner extends Plant {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("stump")
        this.name = "soil cleaner"
        this.pushability = 10
        this.breakability = 5
        this.burnability = 5
        this.immobile = true
        game.setTimer(() => {
            for (let i = 60; i >= 0; i -= 9) {
                this.cleanSoil(utils.dice(i), "soilToxicity", -1)
                this.cleanSoil(utils.dice(i), "soilHealth", 1)
            }
        }, 30)
        game.setTimer(() => {
            this.die()
        }, 90)
    }

    onCut () {
        this.die()
    }
}

game.constructors[SoilCleaner.name] = SoilCleaner
export { SoilCleaner }