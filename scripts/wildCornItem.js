import { Item } from './item.js';
import { Sprite } from './sprite.js';

class WildCornItem extends Item {
    constructor(x, y, elevation, dna) {
        super(x, y, elevation, dna)
        this.name = "wild corn"
        this.sprite = new Sprite ("wild-corn-item")
    }

    use (user) {
        if (user.health >= user.maxHealth) {
            if (!user.checkFacingSquare()) {
                user.dropItem()
            }
        } else {
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

export { WildCornItem }