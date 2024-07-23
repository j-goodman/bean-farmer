import { Item } from './item.js';
import { Sprite } from './sprite.js';

class MeteorCrystal extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "meteor crystal"
        this.sprite = new Sprite ("meteor-crystal")
    }
}

game.constructors[MeteorCrystal.name] = MeteorCrystal
export { MeteorCrystal }