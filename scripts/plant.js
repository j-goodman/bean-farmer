import { Entity } from './entity.js';

import { utils } from './utils.js'

class Plant extends Entity {
    constructor (x, y, elevation, dna) {
        super(x, y, elevation, dna)
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