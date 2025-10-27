import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class LowChair extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("low-chair")
        this.name = "chair"
        this.pushability = 2
        this.breakability = 6
        game.setTimer(() => {
            this.checkDirection()
        }, 60)
    }

    checkDirection () {
        const item = game.checkGrid(this.position.x - 1, this.position.y)
        if (item && item.name === "table") {
            this.sprite = new Sprite ("low-chair-left")
        }
    }
}

game.constructors[LowChair.name] = LowChair
export { LowChair }