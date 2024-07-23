import { BoneShards } from './boneShards.js';
import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class RightRib extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "rib"
        this.sprite = new Sprite ("right-rib")
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

game.constructors[RightRib.name] = RightRib
export { RightRib }