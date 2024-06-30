import { Item } from './item.js';
import { Sprite } from './sprite.js';

class PigLilyItem extends Item {
    constructor(x, y, elevation, dna) {
        super(x, y, elevation, dna)
        this.name = "pig lily"
        this.sprite = new Sprite ("pig-lily-item")
    }
}

game.constructors[PigLilyItem.name] = PigLilyItem
export { PigLilyItem }