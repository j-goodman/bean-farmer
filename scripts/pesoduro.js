import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Pesoduro extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "pesoduro"
        this.sprite = new Sprite ("pesoduro")
    }

    getPickedUp (subject) {
        subject.items.push(this)
        if (!this.pickedUpBefore) {
            game.givePoints(50, this)
            this.pickedUpBefore = true
        }
        this.die()
    }
}

game.constructors[Pesoduro.name] = Pesoduro
export { Pesoduro }