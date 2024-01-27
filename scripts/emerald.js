import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Emerald extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("emerald")
    }
}

export { Emerald }