import { Item } from '../item.js';
import { Sprite } from '../sprite.js';

class RedOnion extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "red onion"
        this.food = true
        this.burnability = 4
        this.sprite = new Sprite ("red-onion/bulb")
    }

    use (user) {
        if (user.health >= user.maxHealth) {
            game.displayHealth = 120
            if (!user.checkFacingSquare()) {
                user.dropItem()
            }
        } else {
            user.health += 3
            if (user.health > user.maxHealth) {
                user.health = user.maxHealth
            }
            user.equipped = null
            user.removeFromInventory(this)
            if (user.name === "player") {
                game.displayHealth = 150
            }
            this.die()
        }
    }
}

game.constructors[RedOnion.name] = RedOnion
export { RedOnion }