import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Dollar extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "dollar"
        this.sprite = new Sprite ("dollar")
    }

    getPickedUp (subject) {
        subject.items.push(this)
        if (!this.pickedUpBefore) {
            game.givePoints(20, this)
            this.pickedUpBefore = true
        }
        this.die()
    }
}

game.constructors[Dollar.name] = Dollar
export { Dollar }