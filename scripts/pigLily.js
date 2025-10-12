import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { PigLilyItem } from './pigLilyItem.js';
import { LilySeed } from './lilySeed.js';

import { game } from './game.js';

class PigLily extends Plant {
    constructor(x, y) {
        super(x, y)
        this.name = "pig flower"
        this.sprite = makePigLilySprite()
        this.pushability = 10
        this.breakability = 10
        this.burnability = 11
        this.pluckable = true
        this.elevation = "ground"
        
        this.createSelf()
        this.cleanSoil(11)
    }

    onCut (subject) {
        this.bePlucked()
    }

    bePlucked (subject) {
        this.die()
        new PigLilyItem (this.position.x, this.position.y, null, this.dna)
        this.checkDrop(
            new LilySeed (this.position.x, this.position.y, null, this.dna)
        )
    }
}

const makePigLilySprite = () => {
    const pigLilySprite = new Sprite ("pig-lily")
    return pigLilySprite
}

game.constructors[PigLily.name] = PigLily
export { PigLily }