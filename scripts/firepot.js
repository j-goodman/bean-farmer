import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Firepot extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "firepot-unlit"
        this.sprite = new Sprite (this.imageName)
        this.pushability = 2
    }
}

export { Firepot }