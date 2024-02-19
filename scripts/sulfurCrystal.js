import { Item } from './item.js';
import { Sprite } from './sprite.js';

class SulfurCrystal extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "sulfur crystal"
        this.sprite = new Sprite ("sulfur-crystal")
    }
}

export { SulfurCrystal }