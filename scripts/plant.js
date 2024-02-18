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

    burn () {
        this.burnability -= 1
        game.checkGrid(this.position.x, this.position.y, true).soilHealth += 0.05
        this.redistributeSoilHealth()
        if (this.burnability <= 0) {
            this.die()
        }
    }
}

export { Plant }