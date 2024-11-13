import { Item } from '../item.js';
import { Sprite } from '../sprite.js';
import { Grass } from './grass.js';
import { WildCorn } from '../wildCorn.js';

import { utils } from '../utils.js';

class GrassSeed extends Item {
    constructor(x, y, elevation, dna) {
        super(x, y, elevation, dna)
        this.name = "grass seed"
        this.sprite = new Sprite ("grass/seed")
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        this.idle()
        game.setTimer(() => {
            if (!this.pickedUp && !game.checkGrid(this.position.x, this.position.y, true).groundOccupant) {
                this.die()
                let Descendant = Grass
                if (this.dna.corngrass && utils.dice(23) === 23) {
                    Descendant = WildCorn
                }
                let grass = new Descendant (this.position.x, this.position.y, "ground", this.dna)
                if (this.mutation) {
                    grass.mutation = this.mutation
                }
                game.addToGrid(grass)
            } else {
                this.die()
            }
        }, 350 + utils.dice(50))
    }

    burn () {
        this.burnability -= 1
        if (this.burnability <= 0) {
            this.die()
        }
    }
}

game.constructors[GrassSeed.name] = GrassSeed
export { GrassSeed }