import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class GreenFlag extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("green-flag")
        this.name = "green flag"
        this.pushability = 10
        this.immobile = true
    }
}

game.constructors[GreenFlag.name] = GreenFlag
export { GreenFlag }