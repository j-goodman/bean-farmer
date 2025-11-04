import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Statue extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("king-statue")
        this.name = "statue"
        this.pipeConnection = true
        this.pushability = 10
        this.breakability = 7
        this.immobile = true
    }

    onBreak () {
        this.playAnimationOnce("break", () => {
            this.die()
        })
    }

    setVariant (name) {
        if (name === "golemer") {
            this.variant = "golemer"
            this.sprite  = new Sprite ("golemer-statue")
        }
    }
}

game.constructors[Statue.name] = Statue
export { Statue }