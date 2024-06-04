import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Boulder extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "boulder"
        this.spawnPosition = {x: x, y: y}
        this.reset = true
        this.sprite = new Sprite (this.imageName)
        this.pushability = 2
    }
}

export { Boulder }