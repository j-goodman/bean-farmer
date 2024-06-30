import { Item } from './item.js';
import { Sprite } from './sprite.js';

class MushroomItem extends Item {
    constructor(x, y, elevation, dna) {
        super(x, y, elevation, dna)
        this.name = "mushroom"
        this.sprite = new Sprite ("mushroom-item")
    }
}

game.constructors[MushroomItem.name] = MushroomItem
export { MushroomItem }