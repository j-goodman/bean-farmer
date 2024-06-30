import { Entity } from './entity.js';

import { utils } from './utils.js'

class Plant extends Entity {
    constructor (x, y, elevation, dna) {
        super(x, y, elevation, dna)
        this.plant = true
    }
}

game.constructors[Plant.name] = Plant
export { Plant }