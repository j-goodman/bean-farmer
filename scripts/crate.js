import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { WildOnion } from './wildOnion/wildOnion.js';

class Crate extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "crate"
        this.sprite = new Sprite (this.imageName)
        this.pushability = 2
        this.burnability = 4
        this.breakability = 5
    }

    onCut () {
        this.die()
    }

    onDeath () {
        const drop = new WildOnion (this.position.x, this.position.y)
        this.checkDrop(drop)
    }
}

export { Crate }