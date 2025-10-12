import { Item } from './item.js';
import { Sprite } from './sprite.js';

class CrystalKey extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "crystal key"
        this.sprite = new Sprite ("crystal-key")
        this.pickedUpBefore = false
        // console.log("Crystal key.")
    }

    getPickedUp (subject) {
        subject.items.push(this)
        if (!this.pickedUpBefore) {
            game.givePoints(200, this)
            this.pickedUpBefore = true
        }
        this.die()
    }
}

game.constructors[CrystalKey.name] = CrystalKey
export { CrystalKey }