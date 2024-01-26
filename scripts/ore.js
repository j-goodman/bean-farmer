import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Ore extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "ore"
        this.sprite = new Sprite (this.imageName)
        this.pushability = 3
        this.breakability = 2
    }
}

export { Ore }