import { Entity } from './entity.js';

class Ore extends Entity {
    constructor(imageName, x, y) {
        super(imageName, x, y)
        this.pushability = 3
        this.breakability = 2
    }
}

export { Ore }