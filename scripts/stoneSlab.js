import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class StoneSlab extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "stone floor"
        this.sprite = new Sprite ("floor-slab")
    }
}

game.constructors[StoneSlab.name] = StoneSlab
export { StoneSlab }