import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Tree } from './tree.js';

import { utils } from './utils.js';

class Birchpod extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "birchpod"
        this.burnability = 3
        this.sprite = new Sprite ("birchpod")
    }

    onMove () {
        this.onDrop()
    }

    onDrop () {
        this.spriteOffset = {
            x: 0, y: 0
        }
        this.idle()
        game.setTimer(() => {
            let adjacentTrees = false
            for (let x = -2; x <= 1; x++) {
                for (let y = -3; y <= 3; y++) {
                    const item = game.checkGrid(
                        this.position.x + x,
                        this.position.y + y
                    )
                    if (item && (item.name === "tree" || item.name === "tree stump")) {
                        adjacentTrees = true
                    }
                }
            }
            let obstacle = game.checkGrid(this.position.x, this.position.y, true).groundOccupant
            if (obstacle && obstacle.name === "grass") {
                obstacle.die()
                obstacle = false
            }
            if (!this.pickedUp && !obstacle && !adjacentTrees) {
                const square = game.checkGrid(this.position.x, this.position.y, true)
                if (square.soilHealth > .14 && square.soilToxicity < .33) {
                    const newTree = new Tree (this.position.x, this.position.y, "birch")
                    game.addToGrid(newTree)
                    this.die()
                }
            }
        }, 65 + utils.dice(100))
    }
}

game.constructors[Birchpod.name] = Birchpod
export { Birchpod }