import { Item } from '../item.js';
import { Sprite } from '../sprite.js';

class WildOnion extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "wild onion"
        this.sprite = new Sprite ("wild-onion/bulb")
    }

    use (user) {
        console.log("munch munch munch")
        if (user.health >= user.maxHealth) {
            user.health = user.maxHealth
        } else {
            user.health += 1
            user.equipped = null
            user.removeFromInventory(this)
            if (user.name === "player") {
                game.displayHealth = 150
            }
        }
        this.die()
    }
}

export { WildOnion }