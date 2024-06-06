import { Entity } from './entity.js';

import { utils } from './utils.js'

class Plant extends Entity {
    constructor (x, y, elevation, dna) {
        super(x, y, elevation, dna)
        this.plant = true
    }
}

export { Plant }