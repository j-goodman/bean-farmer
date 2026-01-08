import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { Wood } from './wood.js';

import { utils } from './utils.js';

class SoilSmoother extends Plant {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("stump")
        this.name = "soil smoother"
        this.pushability = 10
        this.breakability = 5
        this.burnability = 5
        this.immobile = true
        game.setTimer(() => {
            utils.smoothSoil(this.position, 4 + utils.dice(6))
            if (utils.dice(3) === 3) {
                game.setTimer(() => {
                    utils.smoothSoil(this.position, 2 + utils.dice(4))
                }, 60)
            }
        }, 80)
        game.setTimer(() => {
            this.die()
        }, 150)
    }

    onCut () {
        this.die()
    }
}

game.constructors[SoilSmoother.name] = SoilSmoother
export { SoilSmoother }