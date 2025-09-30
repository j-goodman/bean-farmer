import { Item } from './item.js';
import { Sprite } from './sprite.js';

class MagicCup extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "you win"
        this.sprite = new Sprite ("magic-cup")
        this.pickedup = false
    }

    getPickedUp (subject) {
        subject.items.push(this)
        if (!this.pickedup) {
            game.givePoints(2000, this)
            this.pickedup = true
        }
        this.die()
    }
}

game.constructors[MagicCup.name] = MagicCup
export { MagicCup }