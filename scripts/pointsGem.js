import { Item } from './item.js';
import { Sprite } from './sprite.js';

class PointsGem extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "gem"
        this.sprite = new Sprite ("small-gem")
    }

    interaction() {
        game.givePoints(1200, this)
        this.die()
    }
}

game.constructors[PointsGem.name] = PointsGem
export { PointsGem }