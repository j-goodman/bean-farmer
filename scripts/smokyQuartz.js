import { Item } from './item.js';
import { Sprite } from './sprite.js';

class SmokyQuartz extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "smoky quartz"
        this.sprite = new Sprite ("smoky-quartz")
    }
}

game.constructors[SmokyQuartz.name] = SmokyQuartz
export { SmokyQuartz }