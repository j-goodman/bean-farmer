import { Item } from './item.js';
import { Sprite } from './sprite.js';

class BoneShards extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "bone shards"
        this.sprite = new Sprite ("bone-shards")
    }
}

game.constructors[BoneShards.name] = BoneShards
export { BoneShards }