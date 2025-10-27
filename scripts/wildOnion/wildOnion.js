import { Item } from '../item.js';
import { Sprite } from '../sprite.js';

class WildOnion extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "wild onion"
        this.food = true
        this.burnability = 4
        this.sprite = new Sprite ("wild-onion/bulb")
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
            user.health += 1
            user.foodCooldown = 30
            user.addNewHeart()
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