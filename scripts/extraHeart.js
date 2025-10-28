import { Item } from './item.js';
import { Sprite } from './sprite.js';

class ExtraHeart extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "extra heart"
        this.food = true
        this.sprite = new Sprite ("heart")
    }

    use (user) {
        if (user.maxHealth) {
            user.maxHealth += 1
            user.health = user.maxHealth
            game.givePoints(300)
            game.displayHealth = 180
            user.addNewHeart()
            this.die()
        }
    }
}

game.constructors[ExtraHeart.name] = ExtraHeart
export { ExtraHeart }