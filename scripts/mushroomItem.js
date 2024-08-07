import { Item } from './item.js';
import { Sprite } from './sprite.js';

import { MushroomShield } from './mushroomShield.js';

class MushroomItem extends Item {
    constructor(x, y, elevation, dna) {
        super(x, y, elevation, dna)
        this.name = "bubble mushroom"
        this.sprite = new Sprite ("mushroom-item")
    }

    use (user) {
        if (user.shielded && user.shielded > 0) {
            game.displayHealth = 120
            if (!user.checkFacingSquare()) {
                user.dropItem()
            }
        } else {
            if (user.onHit) {
                user.onHit()
                game.setTimer(() => {
                    user.onHit()
                }, 20)
            }
            user.equipped = null
            user.removeFromInventory(this)
            new MushroomShield (user.position.x, user.position.y, "air")
            if (user.name === "player") {
                game.displayHealth = 150
            }
            this.die()
        }
    }
}

game.constructors[MushroomItem.name] = MushroomItem
export { MushroomItem }