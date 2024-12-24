import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Narrowbrick extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("narrowbrick")
        this.name = "brick"
        this.pushability = 10
        this.breakability = 6
        this.immobile = true
    }

    onBreak () {
        this.die()
    }

    setVariant (name) {
        if (name === "dark") {
            this.variant = "dark"
            this.sprite  = new Sprite ("dark-brick/X")
            this.name = "dark brick"
            this.sprite.addURDLVersions("dark-brick")
        }
    }
}

game.constructors[Narrowbrick.name] = Narrowbrick
export { Narrowbrick }