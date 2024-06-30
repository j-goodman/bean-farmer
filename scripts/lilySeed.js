import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { PigLily } from './pigLily.js';

import { utils } from './utils.js';

class LilySeed extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "lily seed"
        this.sprite = new Sprite ("lily-seed")
    }

    blowInWind () {
        const groundObstacle = game.checkGrid(
            this.position.x, this.position.y, true
        ).groundOccupant
        console.log("Seed position:")
        console.log(this.position)
        // console.log("Ground obstacle?")
        // console.log(groundObstacle)
        if (groundObstacle) {
            const direction = utils.directionToCoordinates(game.prevailingWind)
            const success = this.move(direction.x, direction.y)
            if (success) {
                game.setTimer(() => {
                    this.sprout()
                    this.blowInWind()
                }, this.moveDelay)
            }
        }
    }

    sprout () {
        if (!this.pickedUp && !game.checkGrid(this.position.x, this.position.y, true).groundOccupant) {
            this.die()
            game.addToGrid(new PigLily (this.position.x, this.position.y))
        }
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        this.idle()
        game.setTimer(() => {
            this.blowInWind()
        }, 2)
        game.setTimer(() => {
            this.sprout()
        }, 50 + utils.dice(90))
    }
}

game.constructors[LilySeed.name] = LilySeed
export { LilySeed }