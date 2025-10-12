import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Gravestone extends Entity {
    constructor(x, y) {
        super(64, -7)
        this.position = {
            x: 64, y: -7
        }
        this.sprite = new Sprite ("gravestone")
        this.name = "gravestone"
        this.pushability = 10
        this.breakability = 8
        this.immobile = true
    }
}

game.constructors[Gravestone.name] = Gravestone
export { Gravestone }