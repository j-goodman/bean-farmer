import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Sapphire extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("sapphire")
        this.name = "sapphire"
    }
}

game.constructors[Sapphire.name] = Sapphire
export { Sapphire }