import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Key extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "key"
        this.sprite = new Sprite ("key")
    }

    getPickedUp (subject) {
        subject.items.push(this)
        if (!this.pickedUpBefore) {
            game.givePoints(5, this)
            this.pickedUpBefore = true
        }
        this.die()
    }
}

game.constructors[Key.name] = Key
export { Key }