import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Tree } from './tree.js';

import { utils } from './utils.js';

class Pinecone extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "pinecone"
        this.burnability = 5
        this.sprite = new Sprite ("pinecone")
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
                    game.addToGrid(new Tree (this.position.x, this.position.y))
                    this.die()
                }
            }
        }, 55 + utils.dice(100))
    }
}

game.constructors[Pinecone.name] = Pinecone
export { Pinecone }