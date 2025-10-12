import { Item } from './item.js';
import { Sprite } from './sprite.js';

class MagicCup extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "you win"
        this.sprite = new Sprite ("magic-cup")
        this.pickedUpBefore = false
    }

    getPickedUp (subject) {
        subject.items.push(this)
        if (!this.pickedUpBefore) {
            game.givePoints(2000, this)
            this.pickedUpBefore = true
        }
        this.die()
    }
}

game.constructors[MagicCup.name] = MagicCup
export { MagicCup }