import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Wood extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("wood")
        this.burnability = 20
        this.name = "wood"
    }
}

export { Wood }