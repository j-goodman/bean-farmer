import { Item } from '../item.js';
import { Sprite } from '../sprite.js';

class WildOnion extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "wild onion"
        this.food = true
        this.sprite = new Sprite ("wild-onion/bulb")
    }

    use (user) {
        if (user.health >= user.maxHealth) {
            game.displayHealth = 120
            if (!user.checkFacingSquare()) {
                user.dropItem()
            }
        } else {
            console.log("munch munch munch")
            user.health += 1
            user.equipped = null
            user.removeFromInventory(this)
            if (user.name === "player") {
                game.displayHealth = 150
            }
            this.die()
        }
    }
}

game.constructors[WildOnion.name] = WildOnion
export { WildOnion }