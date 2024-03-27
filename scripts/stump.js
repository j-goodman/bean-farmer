import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { Wood } from './wood.js';

import { utils } from './utils.js';

class Stump extends Plant {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeStumpSprite()
        this.name = "tree stump"
        this.pushability = 10
        this.breakability = 5
        this.burnability = 20
        this.immobile = true
    }

    onCut () {
        this.die()
    }
    
    onDeath () {
        if (this.burnability > 0) {
            const drop = new Wood (this.position.x, this.position.y)
            this.checkDrop(drop)
        }
    }
}

const makeStumpSprite = () => {
    const stumpSprite = new Sprite ("stump")
    stumpSprite.addVersion("down", "stump")

    return stumpSprite
}


export { Stump }