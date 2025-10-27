import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class GemStand extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("gem-stand")
        this.name = "gem stand"
        this.pushability = 2
        this.breakability = 6
        this.immobile = true
    }
}

game.constructors[GemStand.name] = GemStand
export { GemStand }