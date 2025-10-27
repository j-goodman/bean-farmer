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
            game.player.beatHeart()
            if (!user.checkFacingSquare()) {
                user.dropItem()
            }
        } else {
            if (user.foodCooldown && user.foodCooldown > 0) {
                return false
            }
            user.health += 3
            user.foodCooldown = 30
            user.addNewHeart()
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

game.constructors[WildCornItem.name] = WildCornItem
export { WildCornItem }