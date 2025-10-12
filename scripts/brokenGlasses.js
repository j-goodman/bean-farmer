import { Item } from './item.js';
import { Sprite } from './sprite.js';

class BrokenGlasses extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "broken glasses"
        this.sprite = new Sprite ("glasses")
    }
}

game.constructors[BrokenGlasses.name] = BrokenGlasses
export { BrokenGlasses }