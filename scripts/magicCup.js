import { Item } from './item.js';
import { Sprite } from './sprite.js';

class MagicCup extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "you win"
        this.sprite = new Sprite ("magic-cup")
    }
}

game.constructors[MagicCup.name] = MagicCup
export { MagicCup }