import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class StoneFloor extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.imageName = "floor-tile/floor-tile-1"
        this.sprite = new Sprite (this.imageName)
    }
}

export { StoneFloor }