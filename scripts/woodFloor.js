import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class WoodFloor extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "wood floor"
        this.sprite = new Sprite ("wood-floor")
        this.burnability = 4
    }
}

game.constructors[WoodFloor.name] = WoodFloor
export { WoodFloor }