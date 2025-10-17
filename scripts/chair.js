import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Chair extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("chair")
        this.name = "chair"
        this.pushability = 10
        this.breakability = 6
        this.immobile = true
    }
}

game.constructors[Chair.name] = Chair
export { Chair }