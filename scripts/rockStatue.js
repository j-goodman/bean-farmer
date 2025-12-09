import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class RockStatue extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("bull-statue")
        this.variant = "bull"
        this.name = "statue"
        this.pushability = 4
        this.breakability = 5
        this.immobile = true
    }

    setVariant (name) {
        if (name === "serpent") {
            this.variant = "serpent"
            this.sprite  = new Sprite ("serpent-statue")
        }
    }
}

game.constructors[RockStatue.name] = RockStatue
export { RockStatue }