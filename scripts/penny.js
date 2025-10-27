import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Penny extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "penny"
        this.sprite = new Sprite ("penny")
        game.pennyCount += 1
    }

    onDeath () {
        game.pennyCount -= 1
    }

    use () {
        return null
    }

    getPickedUp (subject) {
        subject.items.push(this)
        if (!this.pickedUpBefore) {
            game.givePoints(10, this)
            this.pickedUpBefore = true
        }
        this.die()
    }
}

game.constructors[Penny.name] = Penny
export { Penny }