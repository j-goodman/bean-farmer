import { Item } from './item.js';
import { Sprite } from './sprite.js';

class CrystalKey extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "crystal key"
        this.sprite = new Sprite ("crystal-key")
        // console.log("Crystal key.")
    }
}

game.constructors[CrystalKey.name] = CrystalKey
export { CrystalKey }