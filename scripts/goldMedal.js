import { Item } from './item.js';
import { Sprite } from './sprite.js';

class GoldMedal extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "gold medal"
        this.sprite = new Sprite ("gold-medal")
    }
}

game.constructors[GoldMedal.name] = GoldMedal
export { GoldMedal }