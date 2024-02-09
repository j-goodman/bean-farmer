import { Entity } from './entity.js';

import { utils } from './utils.js'

class Plant extends Entity {
    constructor(x, y) {
        super(x, y)
        this.plant = true
    }

    cleanSoil () {
        const square = game.checkGrid(this.position.x, this.position.y, true)
        square.soilToxicity *= 0.9
        this.redistributeSoilToxicity()
        this.redistributeSoilHealth()
    }
}

export { Plant }