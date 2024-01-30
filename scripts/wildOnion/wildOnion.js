import { Item } from '../item.js';
import { Sprite } from '../sprite.js';

class WildOnion extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "wild onion"
        this.sprite = new Sprite ("wild-onion/bulb")
    }
}

export { WildOnion }