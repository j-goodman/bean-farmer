import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { WildCornItem } from './wildCornItem.js';
import { WildCornSeed } from './wildCornSeed.js';

import { game } from './game.js';
import { utils } from './utils.js';

class WildCorn extends Plant {
    constructor(x, y) {
        super(x, y)
        this.name = "wild corn"
        this.sprite = makeWildCornSprite()
        this.pushability = 10
        this.breakability = 10
        this.burnability = 11
        this.elevation = "ground"
        this.pluckable = false
        
        this.createSelf()
        this.cleanSoil()
    }

    onCut (subject) {
        this.getPlucked()
    }

    getPlucked (subject) {
        this.die()
        let coords = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1}
        ]
        let seeds = utils.dice(4) - 1
        utils.shuffle(coords).forEach(coord => {
            const { x, y } = coord;
            if (seeds > 0 && !game.checkGrid(this.position.x + x, this.position.y + y)) {
                seeds -= 1
                game.addToGrid(new WildCornSeed (this.position.x + x, this.position.y + y))
            }
        })
        game.addToGrid(new WildCornItem (this.position.x, this.position.y))
    }
}

const makeWildCornSprite = () => {
    const wildCornSprite = new Sprite ("wild-corn")
    return wildCornSprite
}


export { WildCorn }