import { Item } from './item.js';
import { Sprite } from './sprite.js';

class PricklyPear extends Item {
    constructor(x, y, elevation, dna) {
        super(x, y, elevation, dna)
        this.name = "prickly pear"
        this.burnability = 3
        this.food = true
        this.sprite = new Sprite ("prickly-pear")
    }

    use (user) {
        if (user.health >= user.maxHealth + 1) {
            if (!user.checkFacingSquare()) {
                user.dropItem()
            }
        } else {
            if (user.onHit) {
                user.onHit()
            }
            this.die()
            user.equipped = null
            user.removeFromInventory(this)
            game.setTimer(() => {
                user.health = user.maxHealth + 1
                if (user.name === "player") {
                    game.displayHealth = 150
                }
            }, 45)
        }
    }
}

game.constructors[PricklyPear.name] = PricklyPear
export { PricklyPear }