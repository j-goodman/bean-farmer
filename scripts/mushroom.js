import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { MushroomItem } from './mushroomItem.js';

import { game } from './game.js';
import { utils } from './utils.js';

class Mushroom extends Plant {
    constructor(x, y) {
        super(x, y)
        this.name = "mushroom"
        this.sprite = makeMushroomSprite()
        this.pushability = 10
        this.breakability = 10
        this.burnability = 7
        this.pluckable = true
        
        this.createSelf()
        this.cleanSoil(15)
    }

    onCut (subject) {
        this.getPlucked()
    }

    getPlucked (subject) {
        this.die()
        this.checkDrop(new MushroomItem (this.position.x, this.position.y))
    }
}

const makeMushroomSprite = () => {
    const mushroomSprite = new Sprite ("mushroom")
    return mushroomSprite
}

game.constructors[Mushroom.name] = Mushroom
export { Mushroom }