import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';
import { DeathsHeadSprout } from './deathsHeadSprout.js';

class DeathsHeadSeed extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "deaths head seed"
        this.sprite = new Sprite ("deathshead/seed")

        if (game.time === 0) {
            this.seedAge -= utils.dice(300)
        }
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        game.setTimer(() => {
            if (!this.pickedUp && !game.checkGrid(this.position.x, this.position.y, true).groundOccupant) {
                game.addToGrid(new DeathsHeadSprout (this.position.x, this.position.y))
                this.die()
            }
        }, 300)
        this.idle()
    }
    
    update (age) {
        this.frameUpdate()
        if (age > 900 && utils.dice(90) === 90) {
            if (!this.pickedUp && !game.checkGrid(this.position.x, this.position.y, true).groundOccupant) {
                game.addToGrid(new DeathsHeadSprout (this.position.x, this.position.y))
                this.die()
            } else {
                this.die()
            }
        }
    }
}

game.constructors[DeathsHeadSeed.name] = DeathsHeadSeed
export { DeathsHeadSeed }