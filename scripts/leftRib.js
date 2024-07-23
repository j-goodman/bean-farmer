import { BoneShards } from './boneShards.js';
import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class LeftRib extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "rib"
        this.sprite = new Sprite ("left-rib")
        this.pipeConnection = true
        this.pushability = 10
        this.breakability = 5
        this.immobile = true
    }

    onBreak () {
        this.die()
        this.checkDrop(new BoneShards (this.position.x, this.position.y))
        this.checkDrop(new BoneShards (this.position.x, this.position.y))
        this.checkDrop(new BoneShards (this.position.x, this.position.y))
    }
}

game.constructors[LeftRib.name] = LeftRib
export { LeftRib }