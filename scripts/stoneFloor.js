import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class StoneFloor extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "stone floor"
        this.imageName = "floor-tile/floor-tile-1"
        if ((33 + x + y) % 3 === 0) {
            this.imageName = "floor-tile/floor-tile-2"
        }
        this.sprite = new Sprite (this.imageName)
    }
}

game.constructors[StoneFloor.name] = StoneFloor
export { StoneFloor }