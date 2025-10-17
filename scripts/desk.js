import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Desk extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("desk")
        this.name = "desk"
        this.pushability = 10
        this.breakability = 6
        this.immobile = true
    }
}

game.constructors[Desk.name] = Desk
export { Desk }