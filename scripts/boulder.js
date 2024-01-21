import { Entity } from './entity.js';

class Boulder extends Entity {
    constructor(imageName, x, y) {
        super(imageName, x, y)
        this.pushability = 2
    }
}

export { Boulder }