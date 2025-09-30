import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class RedFlag extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("red-flag")
        this.name = "red flag"
        this.pushability = 10
        this.breakability = 6
        this.immobile = true
    }
}

game.constructors[RedFlag.name] = RedFlag
export { RedFlag }