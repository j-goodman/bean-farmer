import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Hatchet extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("hatchet")
    }
}

export { Hatchet }